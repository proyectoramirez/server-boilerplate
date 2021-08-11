export default async (path, def) => {
  try {
    const module = await import(path);
    return module.default;
  } catch {
    return def;
  }
};
