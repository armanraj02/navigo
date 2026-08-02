// Google Geocoding API integration service

export interface GeocodeResult {
  formattedAddress: string;
  lat: number;
  lng: number;
}

export class GeocoderServiceClass {
  private static instance: GeocoderServiceClass;
  private geocoder: google.maps.Geocoder | null = null;

  private constructor() {}

  public static getInstance(): GeocoderServiceClass {
    if (!GeocoderServiceClass.instance) {
      GeocoderServiceClass.instance = new GeocoderServiceClass();
    }
    return GeocoderServiceClass.instance;
  }

  private getGeocoder(): google.maps.Geocoder | null {
    if (!this.geocoder && window.google?.maps) {
      this.geocoder = new window.google.maps.Geocoder();
    }
    return this.geocoder;
  }

  public async geocode(address: string): Promise<GeocodeResult | null> {
    const coder = this.getGeocoder();
    if (!coder) {
      return {
        formattedAddress: address,
        lat: 37.7894,
        lng: -122.4014,
      };
    }

    return new Promise((resolve) => {
      coder.geocode({ address }, (results, status) => {
        if (status !== window.google.maps.GeocoderStatus.OK || !results || !results[0]) {
          resolve(null);
          return;
        }
        const result = results[0];
        resolve({
          formattedAddress: result.formatted_address,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        });
      });
    });
  }

  public async reverseGeocode(lat: number, lng: number): Promise<string> {
    const coder = this.getGeocoder();
    if (!coder) {
      return "San Francisco Financial District, CA";
    }

    return new Promise((resolve) => {
      coder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status !== window.google.maps.GeocoderStatus.OK || !results || !results[0]) {
          resolve("Unmapped Location");
          return;
        }
        resolve(results[0].formatted_address);
      });
    });
  }
}

export const GeocoderService = GeocoderServiceClass.getInstance();
