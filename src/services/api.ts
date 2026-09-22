import type { MenuItem } from '../types/menu';

const API_URL = import.meta.env.VITE_SHEETDB_API_URL;

function parseBoolean(val: any): boolean {
  if (val === undefined || val === null || val === '') return true;
  if (typeof val === 'boolean') return val;
  const str = String(val).trim().toUpperCase();
  if (str === 'FALSE' || str === '0' || str === 'NO' || str === 'OUT OF STOCK') {
    return false;
  }
  return true;
}

// Converts Google Drive share links to direct, displayable image CDN URLs
function formatDriveUrl(url: string): string {
  if (!url) return '';

  const cleanUrl = url.trim();

  // Extract File ID from various Google Drive link formats
  // Handles: /file/d/FILE_ID/view, id=FILE_ID, /d/FILE_ID
  const driveRegex = /(?:d\/|id=)([a-zA-Z0-9_-]+)/;
  const match = cleanUrl.match(driveRegex);

  if (match && match[1]) {
    // Uses Google Direct Media CDN endpoint (bypass web app preview page)
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }

  // Returns as-is if it's already a direct link (e.g. ImgBB, Unsplash, Cloudinary)
  return cleanUrl;
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  if (!API_URL || !API_URL.trim()) {
    console.info('[SheetDB] No API URL specified in VITE_SHEETDB_API_URL. Using fallback data.');
    return [];
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Failed to fetch menu: ${response.statusText}`);

    const rawData = await response.json();
    if (!Array.isArray(rawData)) return [];

    // SheetDB returns all values as strings, convert data types cleanly
    return rawData.map((item: any, index: number) => ({
      id: String(item.id || `item_${index + 1}`),
      category: String(item.category || 'General').trim(),
      title: String(item.title || 'Untitled Item').trim(),
      description: String(item.description || '').trim(),
      price: parseFloat(item.price) || 0,
      image_url: formatDriveUrl(String(item.image_url || '')), // <--- Format Drive URLs here
      is_available: parseBoolean(item.is_available),
      tags: item.tags
        ? (Array.isArray(item.tags)
            ? item.tags
            : String(item.tags).split(',').map((t: string) => t.trim()).filter(Boolean))
        : [],
    }));
  } catch (error) {
    console.error('Error fetching menu:', error);
    return []; // Fallback to empty array on failure
  }
}