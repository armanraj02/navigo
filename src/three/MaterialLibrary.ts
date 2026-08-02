import * as THREE from "three";

export class MaterialLibraryClass {
  private static instance: MaterialLibraryClass;
  private materials: Record<string, THREE.Material> = {};

  private constructor() {
    this.initializeMaterials();
  }

  public static getInstance(): MaterialLibraryClass {
    if (!MaterialLibraryClass.instance) {
      MaterialLibraryClass.instance = new MaterialLibraryClass();
    }
    return MaterialLibraryClass.instance;
  }

  private initializeMaterials() {
    this.materials.asphalt = new THREE.MeshStandardMaterial({
      color: "#27272a",
      roughness: 0.85,
      metalness: 0.1,
    });

    this.materials.concrete = new THREE.MeshStandardMaterial({
      color: "#a1a1aa",
      roughness: 0.7,
      metalness: 0.2,
    });

    this.materials.glass = new THREE.MeshStandardMaterial({
      color: "#0071e3",
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.7,
    });

    this.materials.grass = new THREE.MeshStandardMaterial({
      color: "#16a34a",
      roughness: 0.9,
      metalness: 0.05,
    });

    this.materials.water = new THREE.MeshStandardMaterial({
      color: "#0284c7",
      roughness: 0.05,
      metalness: 0.9,
      transparent: true,
      opacity: 0.8,
    });

    this.materials.neonBlue = new THREE.MeshBasicMaterial({
      color: "#00e3a5",
    });

    this.materials.neonRed = new THREE.MeshBasicMaterial({
      color: "#e82127",
    });

    this.materials.emissiveWindow = new THREE.MeshStandardMaterial({
      color: "#222222",
      emissive: "#fcd34d",
      emissiveIntensity: 1.0,
      roughness: 0.2,
      metalness: 0.8,
    });
  }

  public getMaterial(name: string): THREE.Material {
    return this.materials[name] || this.materials.concrete;
  }

  public updateTheme(isNight: boolean): void {
    // Dynamic emissive light intensity transitions
    const windowMat = this.materials.emissiveWindow as THREE.MeshStandardMaterial;
    if (windowMat) {
      windowMat.emissiveIntensity = isNight ? 1.5 : 0.05;
      windowMat.color.set(isNight ? "#111111" : "#bbbbbb");
    }
  }
}

export const MaterialLibrary = MaterialLibraryClass.getInstance();
