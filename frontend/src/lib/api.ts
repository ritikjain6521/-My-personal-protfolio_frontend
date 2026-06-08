// Central API base URL — works in both local dev (via Vite proxy) and production (direct backend URL)
// In production, set VITE_API_BASE_URL in Vercel env vars to your Render backend URL
export const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export const getImageUrl = (url: string | undefined) => {
  if (!url) return '';
  if (url.startsWith('http')) return url; // Already absolute
  if (url.startsWith('/uploads/')) return `${API_BASE}${url}`; // Backend upload
  return url; // Frontend public asset
};
