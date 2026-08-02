# Navigo Enterprise Integration Guide

Navigo features an abstraction layer that allows switching between local mock simulation and production backends without modifying frontend components.

---

## 🔌 Repository Swapping Workflow

To swap mock repositories with production API calls:

### 1. Implement Repository Interface
Create a new adapter matching the interface contract under `src/integration/Contracts/`:
```typescript
import { BusRepository, BusDto } from "../Contracts/Contracts";
import { HttpApiClient } from "../ApiClient/ApiClient";

export class RestBusRepository implements BusRepository {
  constructor(private apiClient: HttpApiClient) {}

  public async getAll(): Promise<BusDto[]> {
    const res = await this.apiClient.get<BusDto[]>("/api/v1/fleet/buses");
    return res.data;
  }

  public async getById(id: string): Promise<BusDto | null> {
    const res = await this.apiClient.get<BusDto>(`/api/v1/fleet/buses/${id}`);
    return res.data;
  }

  public async save(bus: BusDto): Promise<void> {
    await this.apiClient.post("/api/v1/fleet/buses", bus);
  }
}
```

### 2. Update Service Registry Mappings
Update `src/integration/DependencyInjection/ServiceRegistry.ts` (or your entry registration script) to bind the new repository instead of the mock adapter:
```typescript
import { ServiceRegistry } from "./ServiceRegistry";
import { RestBusRepository } from "../RestImplementations/RestBusRepository";

export const registerProductionServices = (apiClient: HttpApiClient): void => {
  ServiceRegistry.register("BusRepository", new RestBusRepository(apiClient));
};
```

---

## 📡 Protocol Interface Mappings

Future integration adapters should map as follows:

| Endpoint | Protocol Adapter | Subscription Strategy |
|---|---|---|
| **Bus Coordinates** | `SubscriptionClient` | WebSockets `subscribe("/fleet/coords")` |
| **Route Schedules** | `HttpApiClient` | REST JSON GET requests |
| **System Alerts** | `SseClient` | Server-Sent Events listener |
