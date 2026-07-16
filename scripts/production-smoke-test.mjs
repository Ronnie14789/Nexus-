import { spawn } from 'node:child_process';
import { once } from 'node:events';
import process from 'node:process';

const port = Number(process.env.SMOKE_PORT || 3101);
const baseUrl = `http://127.0.0.1:${port}`;

const routes = [
  '/',
  '/about',
  '/electrical-systems',
  '/automotive-systems',
  '/digital-systems',
  '/executive-intelligence',
  '/robots.txt',
  '/sitemap.xml',
  '/api/health',
];

const requiredSecurityHeaders = [
  'content-security-policy',
  'referrer-policy',
  'strict-transport-security',
  'x-content-type-options',
  'x-frame-options',
];

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const server = spawn(process.execPath, ['scripts/start-production.mjs'], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    PORT: String(port),
    NODE_ENV: 'production',
    DATABASE_REQUIRED: 'false',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverLog = '';

server.stdout.on('data', (chunk) => {
  const output = chunk.toString();
  serverLog += output;
  process.stdout.write(`[server] ${output}`);
});

server.stderr.on('data', (chunk) => {
  const output = chunk.toString();
  serverLog += output;
  process.stderr.write(`[server] ${output}`);
});

const stopServer = async () => {
  if (server.exitCode !== null) return;

  server.kill('SIGTERM');

  await Promise.race([
    once(server, 'exit'),
    delay(3000),
  ]);

  if (server.exitCode === null) {
    server.kill('SIGKILL');
  }
};

const fetchWithTimeout = async (url) =>
  fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(10_000),
  });

const waitForServer = async () => {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(
        `Production server stopped before becoming ready.\n${serverLog}`,
      );
    }

    try {
      const response = await fetchWithTimeout(`${baseUrl}/api/health`);

      if (response.ok) {
        console.log(`Production server ready after attempt ${attempt}.`);
        return;
      }
    } catch {
      // The server may still be starting.
    }

    await delay(500);
  }

  throw new Error(
    `Production server did not become ready within 30 seconds.\n${serverLog}`,
  );
};

const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

try {
  await waitForServer();

  console.log('\nRoute verification');

  for (const route of routes) {
    const response = await fetchWithTimeout(`${baseUrl}${route}`);

    requireCondition(
      response.status === 200,
      `${route} returned HTTP ${response.status}`,
    );

    console.log(`PASS ${route} → HTTP ${response.status}`);
  }

  console.log('\nAPI health verification');

  const healthResponse = await fetchWithTimeout(`${baseUrl}/api/health`);
  const health = await healthResponse.json();

  requireCondition(
    health.success === true,
    'Health endpoint did not return success=true',
  );

  requireCondition(
    health.status === 'healthy',
    `Unexpected health status: ${String(health.status)}`,
  );

  console.log(`PASS API status → ${health.status}`);
  console.log(`PASS Application version → ${health.version}`);

  console.log('\nSecurity-header verification');

  const homeResponse = await fetchWithTimeout(`${baseUrl}/`);

  for (const header of requiredSecurityHeaders) {
    requireCondition(
      homeResponse.headers.has(header),
      `Required security header is missing: ${header}`,
    );

    console.log(`PASS ${header}`);
  }

  console.log('\nIndexing verification');

  const robotsResponse = await fetchWithTimeout(`${baseUrl}/robots.txt`);
  const robots = await robotsResponse.text();

  requireCondition(
    robots.includes('Disallow: /admin/'),
    'robots.txt does not block /admin/',
  );

  requireCondition(
    robots.includes('Sitemap: https://ecaturonald.tech/sitemap.xml'),
    'robots.txt does not declare the production sitemap',
  );

  console.log('PASS robots.txt indexing controls');

  const sitemapResponse = await fetchWithTimeout(`${baseUrl}/sitemap.xml`);
  const sitemap = await sitemapResponse.text();

  const requiredSitemapUrls = [
    'https://ecaturonald.tech/',
    'https://ecaturonald.tech/about',
    'https://ecaturonald.tech/electrical-systems',
    'https://ecaturonald.tech/automotive-systems',
    'https://ecaturonald.tech/digital-systems',
    'https://ecaturonald.tech/executive-intelligence',
  ];

  for (const url of requiredSitemapUrls) {
    requireCondition(
      sitemap.includes(`<loc>${url}</loc>`),
      `Sitemap URL is missing: ${url}`,
    );

    console.log(`PASS sitemap contains ${url}`);
  }

  console.log('\nNEXUS PRODUCTION SMOKE TEST PASSED');
} catch (error) {
  console.error('\nNEXUS PRODUCTION SMOKE TEST FAILED');
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await stopServer();
}
