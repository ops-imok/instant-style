// scripts/fix-cloudflare-build.mjs
// Fix for opennextjs-cloudflare build issues with Next.js 15 App Router
import fs from 'fs';
import path from 'path';

const nextDir = '.next';
const serverDir = path.join(nextDir, 'server');

console.log('🔧 Applying Cloudflare build fixes...');

// Fix 1: Disable worker threads
process.env.NEXT_PRIVATE_WORKER_THREADS = 'false';
console.log('✓ Disabled worker threads');

// Fix 2: Create pages-manifest.json for App Router projects
const manifestPath = path.join(serverDir, 'pages-manifest.json');
if (!fs.existsSync(manifestPath)) {
  const manifest = {
    '/_app': 'pages/_app.js',
    '/_document': 'pages/_document.js',
    '/_error': 'pages/_error.js',
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✓ Created pages-manifest.json');
}

// Fix 3: Delete Turbopack stubs that break esbuild
const pagesDir = path.join(serverDir, 'pages');
if (fs.existsSync(pagesDir)) {
  const stubFiles = ['_app.js', '_document.js', '_error.js'];
  for (const f of stubFiles) {
    const p = path.join(pagesDir, f);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`✓ Deleted stub: ${f}`);
    }
  }
}

console.log('✅ All fixes applied!');