// utils/parseInstructions.js

/**
 * Parses HTML instruction string and returns clean array of instruction items
 * Handles various HTML formats, entities, and edge cases
 * 
 * @param {string} htmlString - Raw HTML string from API
 * @returns {string[]} - Array of clean instruction strings
 */
export const parseInstructions = (htmlString) => {
  // Return empty array if invalid input
  if (!htmlString || typeof htmlString !== "string") {
    return [];
  }

  try {
    // Method 1: Extract from <li> tags
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    const matches = [...htmlString.matchAll(liRegex)];

    if (matches.length > 0) {
      return matches
        .map((match) => cleanText(match[1]))
        .filter((item) => item.length > 0);
    }

    // Method 2: Fallback - split by newlines or line breaks
    return fallbackParse(htmlString);
  } catch (error) {
    console.error("Error parsing instructions:", error);
    return [];
  }
};

/**
 * Cleans text by removing HTML tags, entities, and leading numbers
 * 
 * @param {string} text - Raw text to clean
 * @returns {string} - Cleaned text
 */
const cleanText = (text) => {
  if (!text) return "";

  return text
    .replace(/<[^>]*>/g, "") // Remove all HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/&apos;/g, "'") // Replace &apos; with '
    .replace(/&#x27;/g, "'") // Replace &#x27; with '
    .replace(/&mdash;/g, "—") // Replace &mdash; with —
    .replace(/&ndash;/g, "–") // Replace &ndash; with –
    .replace(/&hellip;/g, "…") // Replace &hellip; with …
    .replace(/^\s*\d+[\.\)\-]\s*/, "") // Remove leading numbers (1. 1) 1-)
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();
};

/**
 * Fallback parsing when no <li> tags found
 * Splits by newlines or <br> tags
 * 
 * @param {string} htmlString - Raw HTML string
 * @returns {string[]} - Array of clean instruction strings
 */
const fallbackParse = (htmlString) => {
  const cleanedString = htmlString
    .replace(/<br\s*\/?>/gi, "\n") // Replace <br> with newlines
    .replace(/<\/p>/gi, "\n") // Replace </p> with newlines
    .replace(/<\/div>/gi, "\n") // Replace </div> with newlines
    .replace(/<[^>]*>/g, "") // Remove remaining HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return cleanedString
    .split(/\n+/)
    .map((line) => line.replace(/^\s*\d+[\.\)\-]\s*/, "").trim())
    .filter((line) => line.length > 0);
};

/**
 * Decodes all HTML entities in a string
 * 
 * @param {string} text - Text with HTML entities
 * @returns {string} - Decoded text
 */
export const decodeHTMLEntities = (text) => {
  if (!text || typeof text !== "string") return "";

  const entities = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&#x27;": "'",
    "&mdash;": "—",
    "&ndash;": "–",
    "&hellip;": "…",
    "&copy;": "©",
    "&reg;": "®",
    "&trade;": "™",
    "&euro;": "€",
    "&pound;": "£",
    "&yen;": "¥",
    "&cent;": "¢",
    "&deg;": "°",
    "&plusmn;": "±",
    "&times;": "×",
    "&divide;": "÷",
    "&frac12;": "½",
    "&frac14;": "¼",
    "&frac34;": "¾",
  };

  let result = text;
  Object.entries(entities).forEach(([entity, char]) => {
    result = result.replace(new RegExp(entity, "g"), char);
  });

  // Handle numeric entities like &#123;
  result = result.replace(/&#(\d+);/g, (match, dec) =>
    String.fromCharCode(dec)
  );

  // Handle hex entities like &#x1A;
  result = result.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  return result;
};

/**
 * Strips all HTML tags from a string
 * 
 * @param {string} html - HTML string
 * @returns {string} - Plain text
 */
export const stripHTMLTags = (html) => {
  if (!html || typeof html !== "string") return "";
  return html.replace(/<[^>]*>/g, "");
};

export default parseInstructions;