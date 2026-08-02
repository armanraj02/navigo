// Enterprise Domain Repositories and Provider Contracts

export interface BusDto {
  id: string;
  routeId: string;
  routeColor: string;
  position: [number, number, number];
  rotation: number;
  progress: number;
  speed: number;
  isActive: boolean;
}

export interface RouteDto {
  id: string;
  name: string;
  color: string;
  stopIds: string[];
  headwayMinutes: number;
}

export interface StopDto {
  id: string;
  name: string;
  position: [number, number, number];
  routeIds: string[];
}

export interface JourneyDto {
  id: string;
  fromStopId: string;
  toStopId: string;
  totalDurationMinutes: number;
  totalFare: number;
  legsCount: number;
}

export interface UserDto {
  id: string;
  email: string;
  name: string;
  role: "passenger" | "driver" | "admin";
}

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  priority: "low" | "medium" | "high" | "critical";
  timestamp: string;
}

// -------------------------------------------------------------
// REPOSITORIES
// -------------------------------------------------------------

export interface BusRepository {
  getAll(): Promise<BusDto[]>;
  getById(id: string): Promise<BusDto | null>;
  save(bus: BusDto): Promise<void>;
}

export interface RouteRepository {
  getAll(): Promise<RouteDto[]>;
  getById(id: string): Promise<RouteDto | null>;
}

export interface StopRepository {
  getAll(): Promise<StopDto[]>;
  getById(id: string): Promise<StopDto | null>;
}

export interface JourneyRepository {
  findRoutes(fromStopId: string, toStopId: string): Promise<JourneyDto[]>;
  saveSearchHistory(userId: string, fromStopId: string, toStopId: string): Promise<void>;
}

export interface UserRepository {
  getCurrentUser(): Promise<UserDto | null>;
  updateRole(userId: string, role: UserDto["role"]): Promise<void>;
}

export interface NotificationRepository {
  getUnread(userId: string): Promise<NotificationDto[]>;
  markAsRead(id: string): Promise<void>;
}

export interface SimulationRepository {
  getClockTime(): Promise<string>;
  setClockSpeed(speedMultiplier: number): Promise<void>;
}

// -------------------------------------------------------------
// PROVIDERS
// -------------------------------------------------------------

export interface TransitProvider {
  fetchSchedules(routeId: string): Promise<unknown>;
}

export interface RealtimeProvider {
  subscribeToBusCoordinates(busId: string, callback: (pos: [number, number, number]) => void): () => void;
  subscribeToAlerts(callback: (alert: NotificationDto) => void): () => void;
}

export interface LocationProvider {
  getCurrentCoordinates(): Promise<[number, number, number]>;
  watchCoordinates(callback: (pos: [number, number, number]) => void): () => void;
}

export interface AuthenticationProvider {
  login(email: string, pass: string): Promise<UserDto>;
  logout(): Promise<void>;
}

export interface TelemetryProvider {
  trackEvent(name: string, properties?: Record<string, unknown>): void;
  reportPerfMetric(metricName: string, valueMs: number): void;
  logCrash(error: Error, metadata?: Record<string, unknown>): void;
}

export interface WeatherProvider {
  getCurrentWeather(): Promise<{ type: "sunny" | "cloudy" | "foggy" | "rainy"; temp: number }>;
}

export interface StorageProvider {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// -------------------------------------------------------------
// OFFLINE & CACHING
// -------------------------------------------------------------

export interface OfflineStorage {
  queueRequest(action: string, payload: unknown): Promise<void>;
  processQueue(): Promise<void>;
}

export interface CacheInvalidationPolicy {
  isExpired(timestamp: number, ttlSeconds: number): boolean;
}

export interface RetryPolicy {
  execute<T>(operation: () => Promise<T>, maxRetries?: number): Promise<T>;
}

export interface SyncCoordinator {
  synchronizeLocalState(): Promise<void>;
}
