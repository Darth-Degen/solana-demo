export type ApiError = { error: string };
export type ApiOk<T> = T & { ok: true };