// Custom Dependency Injection Service locator registry

export class ServiceRegistryClass {
  private static instance: ServiceRegistryClass;
  private services: Map<string, unknown> = new Map();

  private constructor() {}

  public static getInstance(): ServiceRegistryClass {
    if (!ServiceRegistryClass.instance) {
      ServiceRegistryClass.instance = new ServiceRegistryClass();
    }
    return ServiceRegistryClass.instance;
  }

  public register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }

  public resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service [${key}] is not registered in the ServiceRegistry.`);
    }
    return service as T;
  }

  public has(key: string): boolean {
    return this.services.has(key);
  }

  public clear(): void {
    this.services.clear();
  }
}

export const ServiceRegistry = ServiceRegistryClass.getInstance();
