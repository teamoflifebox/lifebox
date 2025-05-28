/**
 * @typedef {Object} Decoration
 * @property {string} id - Unique identifier for the decoration
 * @property {'sticker' | 'text' | 'frame' | 'shape'} type - Type of decoration
 * @property {string} content - Decoration content (e.g., text or image source)
 * @property {number} x - X-coordinate position
 * @property {number} y - Y-coordinate position
 * @property {number} width - Width of the decoration
 * @property {number} height - Height of the decoration
 * @property {number} rotation - Rotation angle in degrees
 * @property {number} zIndex - Stacking order
 */

/**
 * @typedef {Object} Image
 * @property {string} id - Unique identifier for the image
 * @property {string} src - Image source URL
 * @property {number} x - X-coordinate position
 * @property {number} y - Y-coordinate position
 * @property {number} width - Width of the image
 * @property {number} height - Height of the image
 * @property {number} rotation - Rotation angle in degrees
 * @property {string} [caption] - Optional image caption
 */

/**
 * @typedef {Object} Page
 * @property {string} id - Unique identifier for the page
 * @property {string} layout - Page layout (e.g., 'single', 'double')
 * @property {string} backgroundColor - Background color (e.g., '#ffffff')
 * @property {Image[]} images - Array of images on the page
 * @property {Decoration[]} decorations - Array of decorations on the page
 */

/**
 * @typedef {Object} Album
 * @property {string} id - Unique identifier for the album
 * @property {string} name - Album name
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last updated date
 * @property {Page[]} pages - Array of pages in the album
 * @property {string} [music] - Optional music file or URL
 */