import config from "./app";
import { catchError, createFailure, createSuccess } from "./result";

async function customFetch<T>(endpoint: string, options: FetchOptions): Promise<Result<T>> {
  const { body, responseType = "json", ...restOptions } = options;

   if (typeof body === "string") {
    options.headers = { ...options.headers, "Content-Type": "application/json" };
  }

  const [error, response] = await catchError(
    fetch(`${config.baseUrl}${endpoint}`, { ...restOptions, body, headers: { ...options.headers  }, credentials: "include" })
  );

  if (error || !response?.ok) {

    if (response?.status === 404) {
      return createFailure<T>({ message: "route not found" });
    }

    const errorData = error ? error : { ...(await response?.json()), status: response?.status };
    
    return createFailure<T>(errorData);
  }

  if (response.status === 204) {
    return createSuccess<T>({} as T);
  }

  if (responseType === "blob") {
    const blob = await response.blob();
    return createSuccess<T>(blob as T);
  }

  const data = await response.json();
  return createSuccess<T>(data.data);
}

export async function Get<T>(endpoint: string, options?: FetchOptions) {
  return await customFetch<T>(endpoint, { ...options, method: "GET" });
}

export async function Post<T>(endpoint: string, data?: unknown, options?: FetchOptions) {
  const body = data instanceof FormData ? data : JSON.stringify(data);
  return await customFetch<T>(endpoint, { ...options, method: "POST", body });
}

export async function Put<T>(endpoint: string, data?: unknown, options?: FetchOptions) {
  const body = data instanceof FormData ? data : JSON.stringify(data);
  return await customFetch<T>(endpoint, { ...options, method: "PUT", body });
}

export async function Patch<T>(endpoint: string, data?: unknown, options?: FetchOptions) {
  const body = data instanceof FormData ? data : JSON.stringify(data);
  return await customFetch<T>(endpoint, { ...options, method: "PATCH", body });
}

export async function Delete<T>(endpoint: string, options?: FetchOptions) {
  return await customFetch<T>(endpoint, { ...options, method: "DELETE" });
}
