"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Layers,
  MapPin,
  Search,
  Clock,
  Mic,
  Home as HomeIcon,
  Briefcase,
  User,
  Activity
} from "lucide-react";
import { SceneEvents } from "@/three/SceneEvents";
import { BusState } from "@/three/simulation/BusPool";
import { BusManager } from "@/three/simulation/BusManager";
import { BusStopManager } from "@/three/simulation/BusStopManager";
import { PassengerCoordinator } from "../PassengerCoordinator/PassengerCoordinator";
import { useJourneyStore } from "@/features/journey/JourneyState/JourneyState";
import { useUIStore } from "@/store/uiStore";
import { SearchController } from "@/features/search/SearchController";
import { MapCoordinator } from "@/maps/MapCoordinator";
import { MapManager } from "@/maps/MapManager";
import { JourneyCoordinator } from "@/features/journey/JourneyCoordinator/JourneyCoordinator";
import { Button } from "@/components/ui";

export const PassengerHUD: React.FC = () => {
  const setView = useUIStore((s) => s.setView);
  const [selectedBus, setSelectedBus] = useState<BusState | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [sugs, setSugs] = useState<string[]>([]);
  const [sheetHeight, setSheetHeight] = useState<"collapsed" | "expanded">("collapsed");
  const [trafficActive, setTrafficActive] = useState(false);
  const [transitActive, setTransitActive] = useState(true);

  // References to Google Map layers to avoid object mutation
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);
  const transitLayerRef = useRef<google.maps.TransitLayer | null>(null);

  // Journey selection state
  const journeyOptions = useJourneyStore((s) => s.journeyOptions);

  useEffect(() => {
    // Listen for select events
    const unsubBus = SceneEvents.subscribe("BUS_SELECTED", (busId) => {
      if (busId) {
        const bus = BusManager.getBusById(busId as string);
        if (bus) {
          setSelectedBus(bus);
          setSheetHeight("expanded");
          return;
        }
      }
      setSelectedBus(null);
    });

    const unsubStop = SceneEvents.subscribe("STOP_SELECTED", (stopId) => {
      if (stopId) {
        const stop = BusStopManager.getStopById(stopId as string);
        if (stop) {
          setSelectedBus(null);
          setSheetHeight("expanded");
          return;
        }
      }
    });

    return () => {
      unsubBus();
      unsubStop();
    };
  }, []);

  const handleSearchChange = async (val: string) => {
    setSearchVal(val);
    if (!val) {
      setSugs([]);
      return;
    }
    const matches = await SearchController.getSuggestions(val);
    setSugs(matches);
  };

  const handleSelectSuggestion = async (place: string) => {
    setSearchVal(place);
    setSugs([]);
    setSearchFocused(false);
    setSheetHeight("expanded");

    // Perform routing search
    await JourneyCoordinator.search("Airport Terminal", place);
  };

  const handleLocateMe = () => {
    MapCoordinator.focusLocation(37.7894, -122.4014, 16);
  };

  const toggleTraffic = () => {
    const map = MapManager.getMap();
    if (!map) return;
    
    if (!trafficActive) {
      const layer = new google.maps.TrafficLayer();
      layer.setMap(map);
      trafficLayerRef.current = layer;
      setTrafficActive(true);
    } else {
      if (trafficLayerRef.current) {
        trafficLayerRef.current.setMap(null);
        trafficLayerRef.current = null;
      }
      setTrafficActive(false);
    }
  };

  const toggleTransit = () => {
    const map = MapManager.getMap();
    if (!map) return;

    if (!transitActive) {
      const layer = new google.maps.TransitLayer();
      layer.setMap(map);
      transitLayerRef.current = layer;
      setTransitActive(true);
    } else {
      if (transitLayerRef.current) {
        transitLayerRef.current.setMap(null);
        transitLayerRef.current = null;
      }
      setTransitActive(false);
    }
  };

  const handleZoom = (factor: number) => {
    const map = MapManager.getMap();
    if (map) {
      const curr = map.getZoom() || 16;
      map.setZoom(curr + factor);
    }
  };

  const clearActiveSearch = () => {
    setSearchVal("");
    JourneyCoordinator.clearJourney();
    setSelectedBus(null);
    setSheetHeight("collapsed");
  };

  // Nearby simulated buses
  const buses = BusManager.getAllBuses().slice(0, 3);
  const stops = BusStopManager.getAllStops().slice(0, 3);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-6 overflow-hidden">
      
      {/* 1. TOP FLOATING NAVIGATION */}
      <div className="w-full max-w-4xl mx-auto pointer-events-auto flex flex-col gap-2 z-40">
        <div className="w-full bg-[#161920]/80 backdrop-blur-xl border border-white/5 px-4 py-2.5 rounded-full flex items-center justify-between gap-4 shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
          
          {/* Logo */}
          <div className="flex items-center gap-2 pl-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="font-bold tracking-wider text-xs font-mono text-white">NAVIGO</span>
          </div>

          {/* Autocomplete Input */}
          <div className="flex-1 max-w-lg relative">
            <div className="w-full h-10 px-3 bg-zinc-950/40 rounded-full border border-white/5 flex items-center gap-2 focus-within:border-blue-500/40 transition-colors">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchVal}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 bg-transparent text-xs font-semibold text-white outline-none placeholder:text-zinc-500"
              />
              {searchVal && (
                <button onClick={clearActiveSearch} className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 pr-1">
                  CLEAR
                </button>
              )}
              <Mic className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-zinc-300" />
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {searchFocused && sugs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-12 bg-[#161920]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 max-h-60 overflow-y-auto"
                >
                  {sugs.map((place, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectSuggestion(place)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <div className="text-[11px] text-zinc-200 font-semibold truncate">{place}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options Row */}
          <div className="flex items-center gap-2 pr-2">
            <button
              onClick={() => setView("driver")}
              className="text-[10px] font-bold text-zinc-400 hover:text-white bg-zinc-800/40 hover:bg-zinc-800/80 px-2.5 py-1.5 rounded-full border border-white/5 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: "12s" }} />
              Driver cockpit
            </button>
            <button
              onClick={() => setView("admin")}
              className="text-[10px] font-bold text-zinc-400 hover:text-white bg-zinc-800/40 hover:bg-zinc-800/80 px-2.5 py-1.5 rounded-full border border-white/5 transition-all flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Operations Center
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md border border-white/10">
              <User className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Quick chip links under search bar */}
        {searchFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 justify-center mt-1"
          >
            <button
              onClick={() => handleSelectSuggestion("Salesforce Transit Center")}
              className="px-3 py-1 rounded-full bg-zinc-900/60 backdrop-blur-md border border-white/5 text-[10px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <Briefcase className="w-3 h-3 text-blue-400" /> Salesforce Center
            </button>
            <button
              onClick={() => handleSelectSuggestion("Airport Terminal")}
              className="px-3 py-1 rounded-full bg-zinc-900/60 backdrop-blur-md border border-white/5 text-[10px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-emerald-400" /> SFO Airport
            </button>
            <button
              onClick={() => handleSelectSuggestion("Downtown Center")}
              className="px-3 py-1 rounded-full bg-zinc-900/60 backdrop-blur-md border border-white/5 text-[10px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <HomeIcon className="w-3 h-3 text-amber-400" /> Downtown
            </button>
          </motion.div>
        )}
      </div>

      {/* 2. SIDE FLOATING ROUND BUTTONS */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto flex flex-col gap-2.5 z-40">
        <button
          onClick={handleLocateMe}
          title="Locate Me"
          className="w-10 h-10 rounded-full bg-[#161920]/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors text-white"
        >
          <Compass className="w-4.5 h-4.5 text-blue-400" />
        </button>
        <button
          onClick={toggleTraffic}
          title="Traffic Layer"
          className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-lg transition-all ${
            trafficActive
              ? "bg-blue-600 border-blue-500 text-white"
              : "bg-[#161920]/80 border-white/10 text-zinc-400 hover:text-white"
          }`}
        >
          <Layers className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={toggleTransit}
          title="Transit Layer"
          className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-lg transition-all ${
            transitActive
              ? "bg-emerald-600 border-emerald-500 text-white"
              : "bg-[#161920]/80 border-white/10 text-zinc-400 hover:text-white"
          }`}
        >
          <Activity className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={() => handleZoom(1)}
          title="Zoom In"
          className="w-10 h-10 rounded-full bg-[#161920]/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors text-white font-bold text-sm"
        >
          +
        </button>
        <button
          onClick={() => handleZoom(-1)}
          title="Zoom Out"
          className="w-10 h-10 rounded-full bg-[#161920]/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors text-white font-bold text-sm"
        >
          -
        </button>
      </div>

      {/* 3. DRAGGABLE BOTTOM SHEET */}
      <div className="w-full max-w-xl mx-auto pointer-events-auto z-40">
        <motion.div
          animate={{ height: sheetHeight === "expanded" ? 440 : 140 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="w-full bg-[#12141c]/95 backdrop-blur-2xl border-t border-white/10 rounded-t-[32px] px-6 py-4 shadow-[0_-15px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative"
        >
          {/* Drag Handle */}
          <div
            onClick={() => setSheetHeight(sheetHeight === "collapsed" ? "expanded" : "collapsed")}
            className="w-12 h-1.5 bg-zinc-700/80 hover:bg-zinc-500 rounded-full mx-auto mb-3 cursor-pointer transition-colors"
          />

          <div className="flex-1 overflow-y-auto pr-1">
            <AnimatePresence mode="wait">
              
              {/* STATE A: ACTIVE BUS IS TRACKED (Zomato-inspired food delivery timeline) */}
              {selectedBus && (
                <motion.div
                  key="bus-tracking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4 text-white"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 rounded-xl bg-blue-600 font-bold text-xs">
                        Route {selectedBus.routeId}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">Vehicle {selectedBus.id}</h3>
                        <p className="text-[10px] text-zinc-400">Heading North at {Math.round(selectedBus.speed * 3.6)} km/h</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold text-sm">3 min ETA</div>
                      <div className="text-[9px] text-zinc-500">Delay: None</div>
                    </div>
                  </div>

                  {/* Food delivery style timeline progress bar */}
                  <div className="bg-zinc-950/40 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3">Live Progress Checkpoints</div>
                    
                    <div className="relative pl-6 flex flex-col gap-6">
                      <div className="absolute left-2.5 top-1 bottom-1 w-0.5 bg-emerald-500/20" />
                      
                      {/* Checkpoint 1 */}
                      <div className="relative">
                        <div className="absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-900 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                        <div className="text-xs font-bold text-emerald-400">Current Stop: Downtown Center</div>
                        <div className="text-[9px] text-zinc-500">Completed at {selectedBus.progress > 0.5 ? "16:26" : "Just now"}</div>
                      </div>

                      {/* Checkpoint 2 */}
                      <div className="relative">
                        <div className="absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full bg-zinc-700 border-2 border-zinc-900" />
                        <div className="text-xs font-semibold text-zinc-300">Next: Industrial Park</div>
                        <div className="text-[9px] text-zinc-500">ETA 2.4 min</div>
                      </div>

                      {/* Checkpoint 3 */}
                      <div className="relative">
                        <div className="absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full bg-zinc-700 border-2 border-zinc-900" />
                        <div className="text-xs font-semibold text-zinc-300">Destination: Airport Terminal</div>
                        <div className="text-[9px] text-zinc-500">ETA 6 min</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="primary" className="flex-1 h-9 text-xs rounded-xl" onClick={() => PassengerCoordinator.resetCamera()}>
                      Center Follow View
                    </Button>
                    <Button variant="secondary" className="h-9 w-9 p-0 rounded-xl" onClick={clearActiveSearch}>
                      ✕
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STATE B: JOURNEY RESULTS ACTIVE (Zomato restaurant list style route cards) */}
              {!selectedBus && journeyOptions.length > 0 && (
                <motion.div
                  key="journey-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-3 text-white"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs font-bold font-mono uppercase text-zinc-400">Ranked Routing Options</div>
                    <button onClick={clearActiveSearch} className="text-[10px] text-zinc-500 hover:text-zinc-300">
                      Clear Search
                    </button>
                  </div>

                  {/* Route Options cards mapping */}
                  <div className="flex flex-col gap-2.5">
                    {journeyOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => {
                          JourneyCoordinator.selectJourney(opt);
                        }}
                        className="bg-[#181b26] border border-white/5 p-3 rounded-2xl hover:border-blue-500/20 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="px-2.5 py-2 rounded-xl font-black text-xs" style={{ backgroundColor: opt.primaryRouteColor || "#3b82f6" }}>
                            R-{opt.primaryRouteId}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">{opt.totalDurationMinutes} min duration</span>
                              {opt.isRecommended && (
                                <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-[9px] text-zinc-400 mt-0.5">ETA: {opt.departureTime} departure · {opt.transfers} transfers</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-bold text-white">${opt.fare.toFixed(2)}</div>
                          <div className="text-[8px] text-zinc-500 mt-1 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> Eco Score: {opt.environmentScore}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STATE C: DEFAULT COLLAPSED / EXPANDED HOMEPAGE CARDS */}
              {!selectedBus && journeyOptions.length === 0 && (
                <motion.div
                  key="default-sheet"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4 text-white"
                >
                  {/* Collapsed snippet: Nearby Buses summary */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-extrabold text-sm text-white">Explore Nearby Buses</h3>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Live transit schedules serving your coordinates</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                      Live GPS Sync
                    </div>
                  </div>

                  {/* Near Buses list */}
                  <div className="flex flex-col gap-2">
                    {buses.map((bus) => (
                      <div
                        key={bus.id}
                        onClick={() => {
                          setSelectedBus(bus);
                          setSheetHeight("expanded");
                          PassengerCoordinator.handleBusSelect(bus.id);
                        }}
                        className="bg-[#181b26]/60 border border-white/5 p-3 rounded-2xl hover:border-emerald-500/20 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-[10px] font-black text-emerald-400">
                            {bus.routeId}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-zinc-200">Vehicle {bus.id}</h4>
                            <p className="text-[9px] text-zinc-500 mt-0.5">Next Stop: Airport Terminal · Progress {Math.round(bus.progress * 100)}%</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold text-emerald-400">Track Live</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expanded mode grid options */}
                  {sheetHeight === "expanded" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 pt-4 border-t border-white/5 flex flex-col gap-3"
                    >
                      <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Popular Station Hubs</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {stops.map((stop) => (
                          <div
                            key={stop.id}
                            onClick={() => {
                              PassengerCoordinator.handleStopSelect(stop.id);
                            }}
                            className="bg-zinc-950/40 p-2.5 rounded-xl border border-white/5 hover:border-blue-500/20 cursor-pointer transition-all hover:scale-[1.02] text-center"
                          >
                            <MapPin className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
                            <div className="text-[10px] font-bold truncate text-white">{stop.name}</div>
                            <div className="text-[8px] text-zinc-500 mt-0.5">Route count: {stop.routeIds.length}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default PassengerHUD;
