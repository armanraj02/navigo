// Google Places API integration service

export interface PlacePredictionDto {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export class PlacesServiceClass {
  private static instance: PlacesServiceClass;
  private autocompleteService: google.maps.places.AutocompleteService | null = null;

  private constructor() {}

  public static getInstance(): PlacesServiceClass {
    if (!PlacesServiceClass.instance) {
      PlacesServiceClass.instance = new PlacesServiceClass();
    }
    return PlacesServiceClass.instance;
  }

  private getService(): google.maps.places.AutocompleteService | null {
    if (!this.autocompleteService && window.google?.maps?.places) {
      this.autocompleteService = new window.google.maps.places.AutocompleteService();
    }
    return this.autocompleteService;
  }

  public async getAutocompleteSuggestions(query: string): Promise<PlacePredictionDto[]> {
    const service = this.getService();
    if (!service) {
      // Fallback suggestions for developer mode
      const mockList = [
        { placeId: "place-1", description: "San Francisco International Airport (SFO)", mainText: "SFO Airport", secondaryText: "San Francisco, CA" },
        { placeId: "place-2", description: "Stanford University, Stanford", mainText: "Stanford University", secondaryText: "Stanford, CA" },
        { placeId: "place-3", description: "Union Square Shopping Center, SF", mainText: "Union Square", secondaryText: "San Francisco, CA" },
        { placeId: "place-4", description: "Salesforce Transit Center, SF", mainText: "Salesforce Center", secondaryText: "San Francisco, CA" },
        { placeId: "place-5", description: "Ferry Building Market, SF", mainText: "Ferry Building", secondaryText: "San Francisco, CA" },
      ];
      return mockList.filter((item) =>
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    return new Promise((resolve) => {
      service.getPlacePredictions(
        { input: query, locationBias: { lat: 37.7894, lng: -122.4014 }, radius: 20000 },
        (predictions, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
            resolve([]);
            return;
          }
          resolve(
            predictions.map((p) => ({
              placeId: p.place_id,
              description: p.description,
              mainText: p.structured_formatting.main_text,
              secondaryText: p.structured_formatting.secondary_text,
            }))
          );
        }
      );
    });
  }
}

export const PlacesService = PlacesServiceClass.getInstance();
