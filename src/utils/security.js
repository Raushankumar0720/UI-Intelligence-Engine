/**
 * Security Utilities — Input sanitization and XSS prevention.
 * Task 8: Security implementation.
 */
import DOMPurify from 'dompurify';

/**
 * Sanitize user input to prevent XSS.
 * Strips all HTML tags and dangerous characters.
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  // First pass: DOMPurify to strip HTML/script
  let clean = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No tags allowed
    ALLOWED_ATTR: [],
  });
  
  // Second pass: trim and limit length
  clean = clean.trim().slice(0, 1000);
  
  return clean;
}

/**
 * Sanitize HTML for safe rendering in preview pane.
 * Allows basic structural tags but strips scripts and event handlers.
 */
export function sanitizeHTML(html) {
  if (typeof html !== 'string') return '';
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'img', 'ul', 'ol', 'li', 'table', 'thead', 'tbody',
      'tr', 'th', 'td', 'button', 'input', 'label', 'form',
      'section', 'article', 'nav', 'header', 'footer', 'main',
      'strong', 'em', 'br', 'hr', 'code', 'pre', 'blockquote',
      'svg', 'path', 'circle', 'rect', 'line',
    ],
    ALLOWED_ATTR: [
      'class', 'id', 'style', 'href', 'src', 'alt', 'title',
      'type', 'placeholder', 'value', 'aria-label', 'role',
      'tabindex', 'data-*', 'viewBox', 'fill', 'stroke',
      'd', 'cx', 'cy', 'r', 'x', 'y', 'width', 'height',
      'stroke-width', 'stroke-linecap', 'stroke-linejoin',
    ],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'link'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus'],
  });
}

/**
 * Validate email format.
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email) && email.length <= 254;
}

/**
 * Validate password strength.
 * Returns { valid, message }
 */
export function validatePassword(password) {
  if (typeof password !== 'string') {
    return { valid: false, message: 'Password is required.' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Password must be less than 128 characters.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number.' };
  }
  return { valid: true, message: 'Password is strong.' };
}

/**
 * Rate limiter for client-side actions.
 * Returns a function that enforces min delay between calls.
 */
export function createRateLimiter(minInterval = 1000) {
  let lastCall = 0;
  
  return function canProceed() {
    const now = Date.now();
    if (now - lastCall < minInterval) {
      return false;
    }
    lastCall = now;
    return true;
  };
}
