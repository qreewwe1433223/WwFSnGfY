// 代码生成时间: 2025-10-09 03:20:20
const THREE = require('three'); // Import THREE.js

/**
 * Validates if the URL is a string and not empty.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function isValidUrlString(url) {
    return typeof url === 'string' && url.trim() !== '';
}

/**
 * Checks if the URL is valid according to the URL pattern.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function isValidUrl(url) {
    try {
        const urlPattern = new URL(url);
        return urlPattern.protocol.startsWith('http');
    } catch (error) {
        return false;
    }
}

/**
 * Checks if the URL is active by attempting to fetch it.
 * @param {string} url - The URL to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is active, false otherwise.
 */
async function isActiveUrl(url) {
    if (!isValidUrlString(url) || !isValidUrl(url)) {
        return false;
    }
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Failed to fetch URL:', error);
        return false;
    }
}

/**
 * Validates a URL and checks if it's active.
 * @param {string} url - The URL to validate and check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is valid and active, false otherwise.
 */
async function validateUrl(url) {
    if (!isValidUrlString(url)) {
        console.error('Invalid URL: URL must be a non-empty string.');
        return false;
    }
    return await isActiveUrl(url);
}

// Example usage:
validateUrl('https://example.com').then(isValid => {
    console.log(`The URL is ${isValid ? 'active' : 'inactive'}.`);
});