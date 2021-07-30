/**
 * Takes in a URL and returns its query params
 *
 * @param s url string
 * @returns Map of queries
 */
export const getQueryParams = (s?: string): Map<string, string> => {
  if (!s || typeof s !== "string" || s.length < 2) {
    return new Map();
  }

  console.log(s);
  const a: [string, string][] = s
    .substr(1)
    .split("&")
    .map((x) => {
      const d = x.split("=");
      return [d[0], d[1]];
    });
  return new Map(a);
};
