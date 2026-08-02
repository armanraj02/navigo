import { CameraPreset, CameraPresets } from "./CameraPresets";

export interface ViewConfig {
  id: string;
  name: string;
  cameraPreset: CameraPreset;
  overlayConfig: {
    sidebarVisible: boolean;
    navbarVisible: boolean;
    bottomHudVisible: boolean;
    overlaysAllowed: boolean;
  };
  hudTheme: "glass" | "primary" | "accent";
}

export class ViewRegistryManager {
  private static instance: ViewRegistryManager;
  private registry: Map<string, ViewConfig>;

  private constructor() {
    this.registry = new Map();
    this.registerDefaults();
  }

  public static getInstance(): ViewRegistryManager {
    if (!ViewRegistryManager.instance) {
      ViewRegistryManager.instance = new ViewRegistryManager();
    }
    return ViewRegistryManager.instance;
  }

  private registerDefaults() {
    this.register({
      id: "landing",
      name: "Cinematic Overview",
      cameraPreset: CameraPresets.landing,
      overlayConfig: {
        sidebarVisible: false,
        navbarVisible: false,
        bottomHudVisible: false,
        overlaysAllowed: false,
      },
      hudTheme: "accent",
    });

    this.register({
      id: "passenger",
      name: "Passenger Board",
      cameraPreset: CameraPresets.passenger,
      overlayConfig: {
        sidebarVisible: true,
        navbarVisible: true,
        bottomHudVisible: true,
        overlaysAllowed: true,
      },
      hudTheme: "glass",
    });

    this.register({
      id: "driver",
      name: "Driver Terminal",
      cameraPreset: CameraPresets.driver,
      overlayConfig: {
        sidebarVisible: true,
        navbarVisible: true,
        bottomHudVisible: true,
        overlaysAllowed: true,
      },
      hudTheme: "primary",
    });

    this.register({
      id: "admin",
      name: "Fleet Analytics",
      cameraPreset: CameraPresets.admin,
      overlayConfig: {
        sidebarVisible: true,
        navbarVisible: true,
        bottomHudVisible: true,
        overlaysAllowed: true,
      },
      hudTheme: "accent",
    });

    this.register({
      id: "tracking",
      name: "Active Tracking",
      cameraPreset: CameraPresets.tracking,
      overlayConfig: {
        sidebarVisible: true,
        navbarVisible: true,
        bottomHudVisible: true,
        overlaysAllowed: true,
      },
      hudTheme: "glass",
    });

    this.register({
      id: "search",
      name: "Transit Search",
      cameraPreset: CameraPresets.search,
      overlayConfig: {
        sidebarVisible: true,
        navbarVisible: true,
        bottomHudVisible: true,
        overlaysAllowed: true,
      },
      hudTheme: "glass",
    });

    this.register({
      id: "settings",
      name: "System Settings",
      cameraPreset: CameraPresets.settings,
      overlayConfig: {
        sidebarVisible: true,
        navbarVisible: true,
        bottomHudVisible: false,
        overlaysAllowed: true,
      },
      hudTheme: "glass",
    });
  }

  public register(config: ViewConfig): void {
    this.registry.set(config.id, config);
  }

  public getView(id: string): ViewConfig | undefined {
    return this.registry.get(id);
  }

  public getAllViews(): ViewConfig[] {
    return Array.from(this.registry.values());
  }
}

export const ViewRegistry = ViewRegistryManager.getInstance();
