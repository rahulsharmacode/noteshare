function convertToSlug(title) {
    return title
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading and trailing whitespace
        .replace(/[^\w\s-]/g, '') // Remove all non-word characters (letters, numbers, underscores, and spaces)
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
}
module.exports = {convertToSlug};