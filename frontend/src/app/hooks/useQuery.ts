export const getQueryParams = (s?: string): Map<string, string> => {
  if (!s || typeof s !== "string" || s.length < 2) {
    return new Map();
  }
  const a: [string, string][] = s
    .substr(1)
    .split("&")
    .map((x) => {
      const a = x.split("=");
      return [a[0], a[1]];
    });
  return new Map(a);
};
