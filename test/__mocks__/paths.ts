// Like SvelteKit with `paths.relative`, one directory deep, such as from `<base>/api/preview`.
export const resolve = (id: string): string => ".." + id
