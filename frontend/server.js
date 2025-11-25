export const server = "http://localhost:4000"
// Base URL without trailing slash to simplify concatenation
export const backend = "http://localhost:4000"

// // Helper to build image URL from filename or nested avatar/url fields
// export const buildImageUrl = (value) => {
// 	if (!value) return ''
// 	// If value already contains 'uploads/' treat it as relative path
// 	if (typeof value === 'string') {
// 		const normalized = value.replace(/\\/g, '/'); // fix any backslashes
// 		return normalized.startsWith('uploads/') ? `${backend}/${normalized}` : `${backend}/uploads/${normalized}`
// 	}
// 	// If avatar object with url property
// 	if (value.url) {
// 		const normalized = String(value.url).replace(/\\/g, '/');
// 		return normalized.startsWith('uploads/') ? `${backend}/${normalized}` : `${backend}/uploads/${normalized}`
// 	}
// 	return ''
// }