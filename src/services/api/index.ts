export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
}

export const mockFetch = async <T>(url: string, options?: ApiRequestOptions): Promise<T> => {
  // Purely typed placeholder API fetcher wrapper
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url, options } as unknown as T);
    }, 200);
  });
};
