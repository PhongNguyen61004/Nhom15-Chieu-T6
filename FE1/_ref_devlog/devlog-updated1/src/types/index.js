// ─── TYPES / SHAPES (JSDoc) ──────────────────────────────────────────────────
// Dùng JSDoc để document shape của data — dễ swap sang TypeScript sau

/**
 * @typedef {Object} Author
 * @property {string} name
 * @property {string} initials
 * @property {string} gradient  - tailwind gradient classes
 */

/**
 * @typedef {Object} Tag
 * @property {string} label
 * @property {string} color  - tailwind color classes
 */

/**
 * @typedef {Object} CodePreview
 * @property {string} lang
 * @property {string} snippet
 */

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {Author} author
 * @property {string} timeAgo
 * @property {string} readTime
 * @property {string} title
 * @property {string} excerpt
 * @property {CodePreview|null} code
 * @property {Tag[]} tags
 * @property {number} upvotes
 * @property {number} comments
 * @property {boolean} liked
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {string} author
 * @property {string} initials
 * @property {string} gradient
 * @property {string} time
 * @property {string} text
 * @property {number} upvotes
 */

/**
 * @typedef {Object} Notification
 * @property {number} id
 * @property {boolean} read
 * @property {string} actor
 * @property {string} initials
 * @property {string} gradient
 * @property {string} text
 * @property {string} time
 */

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} initials
 * @property {string} gradient
 * @property {string} handle
 * @property {string} joinedAt
 * @property {string} bio
 * @property {{name:string, level:number}[]} skills
 * @property {{posts:number|string, followers:number|string, following:number|string, upvotes:number|string}} stats
 */
