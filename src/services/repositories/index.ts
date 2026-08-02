import { MockBusResponse, MockRouteResponse } from "../mock";

export interface BusRepository {
  getActiveBuses(): Promise<MockBusResponse[]>;
  getBusById(id: string): Promise<MockBusResponse | null>;
}

export interface RouteRepository {
  getRoutes(): Promise<MockRouteResponse[]>;
}

export class MockBusRepositoryImpl implements BusRepository {
  async getActiveBuses(): Promise<MockBusResponse[]> {
    return [];
  }

  async getBusById(id: string): Promise<MockBusResponse | null> {
    return { id, speed: 0, latitude: 0, longitude: 0, occupancy: 0 };
  }
}

export class MockRouteRepositoryImpl implements RouteRepository {
  async getRoutes(): Promise<MockRouteResponse[]> {
    return [];
  }
}
