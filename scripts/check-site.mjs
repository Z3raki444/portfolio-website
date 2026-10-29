import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  'index.html',
  'projects/german-transit-analytics.html',
  'projects/weather-data-pipeline.html',
];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const localTargets = (html) => [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1])
  .filter(url => !/^(https?:|mailto:|tel:|data:|javascript:)/i.test(url));

test('every page has a title, main landmark and skip navigation', () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /<title>[^<]+<\/title>/i, page);
    assert.match(html, /<main\b[^>]*id="main"/i, page);
    assert.match(html, /class="skip-link"/i, page);
    assert.match(html, /name="description"/i, page);
  }
});

test('all local links, images, styles and scripts resolve', () => {
  for (const page of pages) {
    const html = read(page);
    for (const target of localTargets(html)) {
      const [targetPath, fragment] = target.split('#');
      const dest = targetPath ? path.resolve(root, path.dirname(page), decodeURIComponent(targetPath)) : path.join(root, page);
      assert.ok(dest.startsWith(root + path.sep) || dest === root, `Unexpected path ${target} in ${page}`);
      assert.ok(fs.existsSync(dest), `Missing ${target} from ${page}`);
      if (fragment && !/\.(?:css|js|svg|webp|png|jpg)$/.test(dest)) {
        const linkedHtml = fs.readFileSync(dest, 'utf8');
        assert.ok(linkedHtml.includes(`id="${fragment}"`), `Missing #${fragment} target in ${target}`);
      }
    }
  }
});

test('portfolio has real project links and internal case studies', () => {
  const html = read('index.html');
  assert.equal((html.match(/class="project-card/g) || []).length, 8);
  assert.ok(html.includes('projects/german-transit-analytics.html'));
  assert.ok(html.includes('projects/weather-data-pipeline.html'));
  assert.ok(html.includes('https://github.com/Z3raki444/german-transit-analytics'));
  assert.ok(html.includes('https://github.com/Z3raki444/weather-data-pipeline'));
  assert.match(read('script.js'), /aria-pressed/);
});

test('public pages respect portfolio privacy preferences', () => {
  for (const page of pages) {
    const html = read(page);
    assert.doesNotMatch(html, /Stralauer Alle|4252660|7\.31\/10|\b(?:CGPA|GPA|final grade|date of birth)\b/i);
    assert.doesNotMatch(html, /download (?:my )?(?:cv|resume)|\.pdf["']/i);
  }
  const home = read('index.html');
  assert.ok(home.includes('tel:+4917685322810'));
  assert.ok(home.includes('tel:+919606716031'));
  assert.ok(home.includes('www.linkedin.com/in/praveenkumar-muthukumar-4baa9a3a9/'));
});
