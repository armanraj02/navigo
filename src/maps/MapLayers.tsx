"use client";

import React, { useEffect } from "react";
import { useGoogleMap } from "./GoogleMapProvider";

interface MapLayersProps {
  showTransit?: boolean;
  showTraffic?: boolean;
}

export const MapLayers: React.FC<MapLayersProps> = ({ showTransit = true, showTraffic = false }) => {
  const { map } = useGoogleMap();

  useEffect(() => {
    if (!map || !window.google?.maps) return;

    let transitLayer: google.maps.TransitLayer | null = null;
    let trafficLayer: google.maps.TrafficLayer | null = null;

    if (showTransit) {
      transitLayer = new window.google.maps.TransitLayer();
      transitLayer.setMap(map);
    }

    if (showTraffic) {
      trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }

    return () => {
      if (transitLayer) transitLayer.setMap(null);
      if (trafficLayer) trafficLayer.setMap(null);
    };
  }, [map, showTransit, showTraffic]);

  return null;
};

export default MapLayers;
