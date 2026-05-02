// GET /api/video?url=<gamekee CDN url>
// Proxies a gamekee CDN video so the browser sees a same-origin response
// with proper CORS + cache headers (the gamekee CDN refuses cross-origin
// requests and Firefox's OpaqueResponseBlocking trips on direct hotlinks).

import { onRequestOptions } from './_helpers.js';

export { onRequestOptions };

const ALLOWED_HOSTS = new Set([
  'cdnimg-v2.gamekee.com',
  'cdnimg.gamekee.com',
]);

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const target = url.searchParams.get('url');
  if (!target) {
    return new Response('Missing url param', { status: 400 });
  }

  let parsed;
  try { parsed = new URL(target); }
  catch { return new Response('Bad url', { status: 400 }); }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return new Response('Forbidden host', { status: 403 });
  }

  const upstream = await fetch(target, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://www.gamekee.com/',
      'Accept': '*/*',
      // Pass Range through if browser sent one (for video seeking)
      ...(request.headers.get('range') ? { 'Range': request.headers.get('range') } : {}),
    },
  });

  const headers = new Headers();
  const passthrough = ['content-type', 'content-length', 'accept-ranges', 'content-range', 'last-modified', 'etag'];
  for (const k of passthrough) {
    const v = upstream.headers.get(k);
    if (v) headers.set(k, v);
  }
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Cache-Control', 'public, max-age=86400, immutable');

  return new Response(upstream.body, { status: upstream.status, headers });
}
