module.exports = (path, def) => {
    try {
        return require(path);
    } catch {
        return def;
    }
}