// Passenger dashboard feature module
export interface PassengerTicket {
  ticketId: string;
  sourceStop: string;
  destStop: string;
  fare: number;
}

export const passengerActions = {
  bookTicket: (ticket: Omit<PassengerTicket, "ticketId">): PassengerTicket => {
    return { ...ticket, ticketId: "ticket_mock" };
  },
};

export * from "./PassengerExperience/PassengerExperience";
export * from "./PassengerCoordinator/PassengerCoordinator";
export * from "./PassengerHUD/PassengerHUD";
export * from "./PassengerHUD/PassengerOverlay";
export * from "./PassengerWidgets/ETAChip";
export * from "./PassengerWidgets/FareChip";
export * from "./PassengerWidgets/OccupancyIndicator";
export * from "./PassengerWidgets/WeatherChip";
export * from "./PassengerWidgets/TimeChip";
export * from "./PassengerWidgets/PassengerLocationWidget";
export * from "./PassengerPanels/NearbyStopsPanel";
export * from "./PassengerPanels/NearbyBusesPanel";
export * from "./PassengerPanels/AlertsPanel";
export * from "./PassengerPanels/PassengerSettingsPanel";
export * from "./PassengerCards/BusCard";
export * from "./PassengerCards/RouteCard";
export * from "./PassengerCards/StopCard";
export * from "./PassengerCards/TicketCard";
export * from "./PassengerCards/AlertCard";
export * from "./PassengerCamera/PassengerCameraModes";
export * from "./SelectionSystem/SelectionController";
