// Enterprise Domain Error Types, Loggers, and Retry Policies

export class DomainError extends Error {
  public code: string;
  public timestamp: string;

  constructor(message: string, code = "DOMAIN_ERROR") {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}

export class NetworkError extends DomainError {
  constructor(message: string, code = "NETWORK_ERROR") {
    super(message, code);
  }
}

export class ValidationError extends DomainError {
  constructor(message: string, code = "VALIDATION_ERROR") {
    super(message, code);
  }
}

export class AuthError extends DomainError {
  constructor(message: string, code = "AUTH_ERROR") {
    super(message, code);
  }
}

// -------------------------------------------------------------
// Global Error Mapper
// -------------------------------------------------------------
export const GlobalErrorMapper = {
  mapResponseStatus: (status: number, message = "An error occurred"): DomainError => {
    switch (status) {
      case 400:
        return new ValidationError(message, "BAD_REQUEST_ERROR");
      case 401:
      case 403:
        return new AuthError(message, "UNAUTHORIZED_ACCESS_ERROR");
      case 404:
        return new DomainError(message, "RESOURCE_NOT_FOUND_ERROR");
      case 500:
      case 502:
      case 503:
        return new NetworkError(message, "INTERNAL_SERVER_ERROR");
      default:
        return new DomainError(message, "UNMAPPED_API_ERROR");
    }
  },
};

// -------------------------------------------------------------
// Logging and Retry helper definitions
// -------------------------------------------------------------
export interface Logger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, error?: Error, ...args: unknown[]): void;
}

export const ConsoleLogger: Logger = {
  info: (msg, ...args) => console.log(`[INFO] ${msg}`, ...args),
  warn: (msg, ...args) => console.warn(`[WARN] ${msg}`, ...args),
  error: (msg, err, ...args) => console.error(`[ERROR] ${msg}`, err, ...args),
};

export class SimpleRetryPolicy {
  public static async execute<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    delayMs = 1000
  ): Promise<T> {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        return await operation();
      } catch (error) {
        attempts++;
        if (attempts >= maxRetries) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempts));
      }
    }
    throw new DomainError("Retry operation failed", "RETRY_POLICY_TIMEOUT");
  }
}
