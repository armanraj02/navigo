// typed API Client interfaces supporting REST, WebSockets, gRPC, and SSE protocols

export interface HttpHeaderMap {
  [key: string]: string;
}

export interface RequestOptions {
  headers?: HttpHeaderMap;
  timeoutMs?: number;
}

export interface ApiClientResponse<T> {
  data: T;
  status: number;
  headers: HttpHeaderMap;
}

// -------------------------------------------------------------
// REST/HTTP Contract
// -------------------------------------------------------------
export interface HttpApiClient {
  get<T>(url: string, options?: RequestOptions): Promise<ApiClientResponse<T>>;
  post<T>(url: string, body: unknown, options?: RequestOptions): Promise<ApiClientResponse<T>>;
  put<T>(url: string, body: unknown, options?: RequestOptions): Promise<ApiClientResponse<T>>;
  delete<T>(url: string, options?: RequestOptions): Promise<ApiClientResponse<T>>;
}

// -------------------------------------------------------------
// WebSockets / Subscription Contract
// -------------------------------------------------------------
export interface SubscriptionClient {
  connect(url: string): Promise<void>;
  disconnect(): void;
  subscribe<T>(topic: string, callback: (data: T) => void): () => void;
  send<T>(topic: string, message: T): void;
}

// -------------------------------------------------------------
// Server-Sent Events (SSE) Contract
// -------------------------------------------------------------
export interface SseClient {
  connectEventStream<T>(url: string, callback: (event: T) => void): () => void;
}

// -------------------------------------------------------------
// gRPC-Web / Protocol Buffers Contract
// -------------------------------------------------------------
export interface GrpcWebClient {
  unaryCall<Request, Response>(
    methodName: string,
    request: Request,
    metadata?: HttpHeaderMap
  ): Promise<Response>;
}
