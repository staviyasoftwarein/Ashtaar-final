import { publicUrl } from './supabase';

export type BtsImage = {
  id: string;        // stable slot "1".."8" — used to derive bucket filename
  imagePath: string; // bucket path (e.g. "bts/bts1.jpeg"), legacy "/file", or external URL
};

export type BtsConfig = {
  eyebrow: string;
  title: string;
  images: BtsImage[];
};

export const DEFAULT_BTS: BtsConfig = {
  eyebrow: 'Behind The Scenes',
  title: 'Vision beyond the lens.',
  images: [
    { id: '1', imagePath: '/bts1.jpg' },
    { id: '2', imagePath: '/bts2.jpg' },
    { id: '3', imagePath: '/bts3.jpg' },
    { id: '4', imagePath: '/bts4.jpg' },
    { id: '5', imagePath: '/bts5.jpg' },
    { id: '6', imagePath: '/bts6.jpg' },
    { id: '7', imagePath: '/bts7.jpg' },
    { id: '8', imagePath: '/bts8.jpg' },
  ],
};

export function resolveBtsImageUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('/')) return path;
  return publicUrl('media', path);
}
