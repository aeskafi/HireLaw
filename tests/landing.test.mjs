import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('HireLaw Landing Page Architecture Tests', () => {
  const rootDir = process.cwd();

  test('required source files exist', () => {
    const requiredFiles = [
      'src/app/page.tsx',
      'src/app/layout.tsx',
      'src/app/globals.css',
      'package.json',
      'README.md',
    ];

    for (const file of requiredFiles) {
      assert.ok(fs.existsSync(path.join(rootDir, file)), `File missing: ${file}`);
    }
  });

  test('public team images and design assets exist', () => {
    const images = [
      'public/images/team_1.jpg',
      'public/images/team_2.jpg',
      'public/images/team_3.jpg',
      'public/images/team_4.jpg',
      'public/images/team_5.jpg',
      'public/images/team_6.jpg',
    ];

    for (const img of images) {
      assert.ok(fs.existsSync(path.join(rootDir, img)), `Asset missing: ${img}`);
    }
  });

  test('navigation targets correspond to valid section IDs', () => {
    const pageContent = fs.readFileSync(path.join(rootDir, 'src/app/page.tsx'), 'utf-8');
    const expectedSections = ['home', 'about', 'services', 'attorneys'];

    for (const sectionId of expectedSections) {
      assert.ok(
        pageContent.includes(`id="${sectionId}"`),
        `Section element with id="${sectionId}" must exist in page.tsx`
      );
    }
  });

  test('layout metadata defines complete SEO and OpenGraph attributes', () => {
    const layoutContent = fs.readFileSync(path.join(rootDir, 'src/app/layout.tsx'), 'utf-8');
    assert.ok(layoutContent.includes('title:'), 'SEO title should be defined in layout.tsx');
    assert.ok(layoutContent.includes('description:'), 'SEO description should be defined in layout.tsx');
    assert.ok(layoutContent.includes('openGraph:'), 'OpenGraph metadata should be defined in layout.tsx');
  });
});
