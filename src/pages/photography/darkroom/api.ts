import { WORKER_URL } from "../config";

const STORAGE_KEY = "darkroom-pw";

export const getStoredPassword = () => sessionStorage.getItem(STORAGE_KEY);
export const storePassword = (pw: string) => sessionStorage.setItem(STORAGE_KEY, pw);
export const clearPassword = () => sessionStorage.removeItem(STORAGE_KEY);

export async function checkPassword(pw: string): Promise<boolean> {
  const res = await fetch(`${WORKER_URL}/auth`, {
    method: "POST",
    headers: { "X-Upload-Password": pw },
  });
  return res.status === 204;
}

// Authenticated fetch against the Worker; a 401 clears the stored password so
// the gate reappears.
export async function authFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const pw = getStoredPassword();
  const res = await fetch(`${WORKER_URL}${path}`, {
    ...init,
    headers: { ...(init.headers ?? {}), "X-Upload-Password": pw ?? "" },
  });
  if (res.status === 401) clearPassword();
  return res;
}
