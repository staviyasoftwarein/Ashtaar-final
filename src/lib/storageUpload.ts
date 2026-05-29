import { supabase } from './supabase';

export type UploadOpts = {
  file: File;
  /** Path inside the 'media' bucket, e.g. "portfolio/slide2-vfx-1735512345.jpg". No leading slash. */
  path: string;
  /** Override Content-Type (defaults to file.type). */
  contentType?: string;
  /** Cache-Control header value to write to the bucket object.
   *  Default: "public, max-age=3600" (1h browser cache without revalidation).
   *  Pass "no-cache" for files that change frequently and must update immediately
   *  (e.g. the hero preloader video). */
  cacheControl?: string;
  /** 0..100 progress callback. */
  onProgress?: (pct: number) => void;
  /** Reject files larger than this many bytes before uploading. Default 200 MB. */
  maxBytes?: number;
};

const DEFAULT_MAX_BYTES = 200 * 1024 * 1024; // 200 MB

/** Encode a bucket path safely: reject traversal/absolute paths, encode each segment. */
function safeBucketPath(rawPath: string): string {
  const path = rawPath.replace(/^\/+/, '');
  const segments = path.split('/');
  for (const seg of segments) {
    if (seg === '' || seg === '.' || seg === '..') {
      throw new Error(`Invalid upload path segment: "${seg}"`);
    }
  }
  return segments.map(encodeURIComponent).join('/');
}

/** Uploads a file to the public 'media' bucket via Supabase Storage REST.
 *  Uses XHR so we get real upload-progress events.
 *  Requires the current session to belong to an admin (RLS enforces this server-side). */
export async function uploadToMediaBucket(opts: UploadOpts): Promise<void> {
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX_BYTES;
  if (opts.file.size > maxBytes) {
    throw new Error(`File too large: ${(opts.file.size / 1048576).toFixed(1)} MB (max ${Math.round(maxBytes / 1048576)} MB)`);
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) throw new Error('Not authenticated');

  const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string).replace(/\/+$/, '');
  const apikey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
  const url = `${supabaseUrl}/storage/v1/object/media/${safeBucketPath(opts.path)}`;
  const contentType = opts.contentType ?? opts.file.type ?? 'application/octet-stream';
  const cacheControl = opts.cacheControl ?? 'public, max-age=3600';

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('apikey', apikey);
    xhr.setRequestHeader('x-upsert', 'true');
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.setRequestHeader('Cache-Control', cacheControl);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && opts.onProgress) {
        opts.onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed (${xhr.status}): ${xhr.responseText}`));
    };
    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(opts.file);
  });
}

/** "name.with.dots.JPG" → "jpg". */
export function fileExtension(name: string): string {
  const m = name.match(/\.([a-z0-9]+)$/i);
  return m ? m[1].toLowerCase() : 'bin';
}

/** Best-effort delete of a file from the 'media' bucket.
 *  Skips non-bucket paths (legacy "/file", external URLs) and never throws. */
export async function tryDeleteFromMediaBucket(path: string | undefined | null): Promise<void> {
  if (!path) return;
  if (/^https?:\/\//i.test(path) || path.startsWith('/')) return;
  try {
    const { error } = await supabase.storage.from('media').remove([path]);
    if (error) console.warn(`tryDeleteFromMediaBucket: failed to delete "${path}":`, error.message);
  } catch (e) {
    console.warn(`tryDeleteFromMediaBucket: error deleting "${path}":`, e);
  }
}
