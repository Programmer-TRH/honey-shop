export function buildQueryString(
  params: Record<string, string | string[] | undefined | null>
) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        const trimmed = v?.trim();
        if (trimmed) query.append(key, trimmed);
      });
    } else {
      const trimmed = value?.trim();
      if (trimmed) query.append(key, trimmed);
    }
  }

  return query.toString();
}
