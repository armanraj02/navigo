"use client";

import React, { useState } from "react";
import {
  Button,
  IconButton,
  Card,
  GlassCard,
  Surface,
  Divider,
  Badge,
  Avatar,
  Chip,
  Spinner,
  Skeleton,
  ProgressBar,
  Input,
  SearchInput,
  PasswordInput,
  TextArea,
  Checkbox,
  Switch,
  Radio,
  Select,
  Combobox,
  Slider,
  OTPInput,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  KPICard,
  RouteCard,
  BusCard,
  StopCard,
  Timeline,
  StatusIndicator,
  EmptyState,
  ThemeToggle,
  LoadingOverlay,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetContent,
  BottomSheetTitle,
  BottomSheetDescription,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui";

export const Showcase: React.FC = () => {
  // Input states for interactive elements
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [radioVal, setRadioVal] = useState("a");
  const [selectVal, setSelectVal] = useState("");
  const [comboVal, setComboVal] = useState("");
  const [otp, setOtp] = useState("");
  const [progress, setProgress] = useState(65);
  const [showLoading, setShowLoading] = useState(false);

  const triggerLoading = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16 flex flex-col gap-12 max-w-7xl mx-auto pb-32">
      <LoadingOverlay show={showLoading} message="Refreshing design tokens..." />

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-glass-border pb-6 select-none">
        <div className="flex flex-col gap-1">
          <h1 className="font-display font-bold text-4xl text-text-primary tracking-tight">
            Navigo Design System Showcase
          </h1>
          <p className="text-text-secondary text-sm">
            Living catalog of semantic design tokens and modular premium components.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="glass" size="sm" onClick={triggerLoading}>
            Trigger Loader
          </Button>
        </div>
      </header>

      <Tabs defaultValue="atoms">
        <TabsList className="mb-8">
          <TabsTrigger value="atoms">Atoms & Design Scales</TabsTrigger>
          <TabsTrigger value="inputs">Form Inputs</TabsTrigger>
          <TabsTrigger value="containers">Cards & Layouts</TabsTrigger>
          <TabsTrigger value="overlays">Overlays & Alerts</TabsTrigger>
          <TabsTrigger value="transit">Transit HUD Cards</TabsTrigger>
        </TabsList>

        {/* Tab 1: Atoms & Design Scales */}
        <TabsContent value="atoms" className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-display font-semibold text-primary border-b border-glass-border/40 pb-2">
              Typography Scale
            </h2>
            <div className="flex flex-col gap-6 bg-secondary/30 p-6 rounded-2xl border border-glass-border">
              <div>
                <span className="text-[10px] text-text-muted font-mono uppercase">Display (56px, Semibold, Display font)</span>
                <div className="font-display font-bold text-5xl tracking-tight">Navigo Display</div>
              </div>
              <Divider />
              <div>
                <span className="text-[10px] text-text-muted font-mono uppercase">H1 (40px, Bold, Display font)</span>
                <h1 className="text-3xl font-bold font-display">Heading H1</h1>
              </div>
              <Divider />
              <div>
                <span className="text-[10px] text-text-muted font-mono uppercase">H2 (32px, Semibold, Display font)</span>
                <h2 className="text-2xl font-semibold font-display">Heading H2</h2>
              </div>
              <Divider />
              <div>
                <span className="text-[10px] text-text-muted font-mono uppercase">Body (15px, Normal, Sans font)</span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Navigo provides a highly polished 3D simulation of a transit network. Floating glass HUD cards adapt to system configurations.
                </p>
              </div>
              <Divider />
              <div>
                <span className="text-[10px] text-text-muted font-mono uppercase">Mono (14px, Normal, Mono font)</span>
                <div className="font-mono text-sm text-primary">const scene = new THREE.Scene();</div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-display font-semibold text-primary border-b border-glass-border/40 pb-2">
              Color Palette
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              <div className="rounded-xl border border-glass-border p-4 bg-background flex flex-col gap-1">
                <span className="text-xs font-semibold text-white">Background</span>
                <span className="text-[10px] text-text-secondary font-mono">--background</span>
              </div>
              <div className="rounded-xl border border-glass-border p-4 bg-primary flex flex-col gap-1 text-white">
                <span className="text-xs font-semibold">Primary Blue</span>
                <span className="text-[10px] opacity-80 font-mono">#0071e3</span>
              </div>
              <div className="rounded-xl border border-glass-border p-4 bg-accent flex flex-col gap-1 text-white">
                <span className="text-xs font-semibold">Accent Red</span>
                <span className="text-[10px] opacity-80 font-mono">#e82127</span>
              </div>
              <div className="rounded-xl border border-glass-border p-4 bg-success flex flex-col gap-1 text-white">
                <span className="text-xs font-semibold">Success Green</span>
                <span className="text-[10px] opacity-80 font-mono">#10b981</span>
              </div>
              <div className="rounded-xl border border-glass-border p-4 bg-warning flex flex-col gap-1 text-white">
                <span className="text-xs font-semibold">Warning Yellow</span>
                <span className="text-[10px] opacity-80 font-mono">#f59e0b</span>
              </div>
              <div className="rounded-xl border border-glass-border p-4 bg-card flex flex-col gap-1">
                <span className="text-xs font-semibold text-text-primary">Card Surface</span>
                <span className="text-[10px] text-text-secondary font-mono">--card</span>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-display font-semibold text-primary border-b border-glass-border/40 pb-2">
              Buttons & Badges
            </h2>
            <div className="flex flex-wrap gap-4 bg-secondary/10 p-6 rounded-2xl border border-glass-border/50">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="glass">Glass Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <IconButton
                variant="primary"
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                }
                aria-label="Add stop"
              />
              <Divider orientation="vertical" className="h-10" />
              <div className="flex items-center gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Delayed</Badge>
                <Badge variant="danger">Offline</Badge>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-display font-semibold text-primary border-b border-glass-border/40 pb-2">
              Status & Utilities
            </h2>
            <div className="grid md:grid-cols-2 gap-6 bg-secondary/10 p-6 rounded-2xl border border-glass-border/50">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold text-text-secondary select-none">Avatars & Status Indicators</span>
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar size="sm" fallbackText="SM" />
                  <Avatar size="md" fallbackText="MD" />
                  <Avatar size="lg" fallbackText="LG" />
                  <Divider orientation="vertical" className="h-8" />
                  <StatusIndicator status="success" pulse={true} label="Live Hub" />
                  <StatusIndicator status="warning" label="High Traffic" />
                  <StatusIndicator status="danger" pulse={true} label="Incidents" />
                  <StatusIndicator status="offline" label="Offline" />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold text-text-secondary select-none">Spinners & Skeletons</span>
                <div className="flex items-center gap-6">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <span className="text-xs font-semibold text-text-secondary select-none mb-2 block">Empty States / Placeholders</span>
                <EmptyState
                  title="No Drivers Assigned"
                  description="Choose a vehicle in the Fleet Dashboard to assign an active driver shift."
                  icon={
                    <svg className="h-8 w-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  actionButton={<Button size="sm" variant="secondary">Assign Shift</Button>}
                />
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Tab 2: Inputs */}
        <TabsContent value="inputs" className="flex flex-col gap-8">
          <div className="grid md:grid-cols-2 gap-6 bg-secondary/10 p-6 rounded-2xl border border-glass-border/50">
            <Input
              label="Standard Text Input"
              placeholder="Enter transit stop name"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <PasswordInput
              label="Password Input"
              placeholder="Enter credentials"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SearchInput
              label="Search Field"
              placeholder="Search active buses..."
              value={text}
              onClear={() => setText("")}
              onChange={(e) => setText(e.target.value)}
            />
            <TextArea label="Long Notes / Feedback" placeholder="Type comments here..." />
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-text-secondary">Control Toggles</span>
              <div className="flex flex-wrap gap-8 items-center">
                <Checkbox
                  label="Accept conditions"
                  checked={checked}
                  onCheckedChange={(val) => setChecked(!!val)}
                />
                <Switch
                  label="Night Mode Link"
                  checked={toggle}
                  onCheckedChange={setToggle}
                />
              </div>
            </div>
            <Radio
              label="Fleet Status Filter"
              options={[
                { value: "a", label: "Active Vehicles" },
                { value: "b", label: "All Vehicles" },
              ]}
              value={radioVal}
              onChange={(e) => setRadioVal((e.target as HTMLInputElement).value)}
            />
            <Select
              label="Terminal Selector"
              placeholder="Choose terminal stop"
              options={[
                { value: "t1", label: "Terminal A - Metro Hub" },
                { value: "t2", label: "Terminal B - North Station" },
              ]}
              value={selectVal}
              onChange={setSelectVal}
            />
            <Combobox
              label="Combobox Autocomplete"
              placeholder="Search stops..."
              options={[
                { value: "s1", label: "Oak Street Metro" },
                { value: "s2", label: "Grand Central Plaza" },
                { value: "s3", label: "Skyline Avenue Crossing" },
              ]}
              value={comboVal}
              onChange={setComboVal}
            />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-secondary">Simulated speed limit slider: {progress} km/h</span>
              <Slider value={[progress]} onValueChange={(val) => setProgress(val[0])} max={100} step={1} />
            </div>
            <OTPInput
              label="Verification Pin Code"
              length={6}
              value={otp}
              onChange={setOtp}
            />
          </div>
        </TabsContent>

        {/* Tab 3: Containers & Layouts */}
        <TabsContent value="containers" className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-display font-semibold text-text-primary text-base mb-2">Standard Card Panel</h3>
            <p className="text-xs text-text-secondary mb-4">
              Provides carbon border with soft shadow backgrounds. Ideal for side panels.
            </p>
            <Button variant="secondary" size="sm">Action</Button>
          </Card>

          <GlassCard>
            <h3 className="font-display font-semibold text-text-primary text-base mb-2">Glassmorphic HUD Card</h3>
            <p className="text-xs text-text-secondary mb-4">
              Translucent background panel designed to float over the 3D Map canvas scene.
            </p>
            <Button variant="glass" size="sm">Action</Button>
          </GlassCard>

          <Surface tone="secondary" radius="2xl" className="p-6">
            <h3 className="font-display font-semibold text-text-primary text-base mb-2">Secondary Container Surface</h3>
            <p className="text-xs text-text-secondary">
              Provides flat, non-bordered surface wrappers. Used inside settings pages.
            </p>
          </Surface>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-text-secondary select-none">Status chips:</span>
            <div className="flex flex-wrap gap-2">
              <Chip active={true}>Standard Route</Chip>
              <Chip active={false}>Express Route</Chip>
              <Chip active={false} onRemove={() => {}}>Removable tag</Chip>
            </div>
            <span className="text-xs font-semibold text-text-secondary select-none">Progress bar:</span>
            <ProgressBar value={progress} />
          </div>
        </TabsContent>

        {/* Tab 4: Overlays */}
        <TabsContent value="overlays" className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4 bg-secondary/15 p-6 rounded-2xl border border-glass-border">
            {/* Dialog Overlay */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Open Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Dialog Modal Overlay</DialogTitle>
                <DialogDescription>
                  This centered pop-up contains details about system events. Includes overlay click dismissals.
                </DialogDescription>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="secondary" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">Confirm Action</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Side Drawer */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="secondary">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent side="right">
                <DrawerTitle>Right Settings Drawer</DrawerTitle>
                <DrawerDescription>
                  Custom sidebar containing active driver configuration options.
                </DrawerDescription>
              </DrawerContent>
            </Drawer>

            {/* Bottom Sheet */}
            <BottomSheet>
              <BottomSheetTrigger asChild>
                <Button variant="secondary">Open Bottom Sheet</Button>
              </BottomSheetTrigger>
              <BottomSheetContent>
                <BottomSheetTitle>Bottom Sheet Console</BottomSheetTitle>
                <BottomSheetDescription>
                  Designed for mobile views, sliding up from the bottom boundary.
                </BottomSheetDescription>
              </BottomSheetContent>
            </BottomSheet>

            {/* Tooltip Provider */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Hover for Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Semantic hover tooltip info.</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TabsContent>

        {/* Tab 5: Transit HUD Cards */}
        <TabsContent value="transit" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KPICard
            title="On-Time Performance"
            value="94.2%"
            change="1.4%"
            changeType="positive"
            icon={
              <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <KPICard
            title="Total Daily Trips"
            value="1,248"
            change="3%"
            changeType="negative"
            icon={
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            }
          />

          <RouteCard
            routeNumber="Express 402"
            routeName="Metro Hub to Airport Terminal"
            stopsCount={12}
            durationMinutes={35}
            isSelected={true}
            stops={[
              { name: "Terminal A - departures", time: "14:05" },
              { name: "Oak Street Crossing", time: "14:15" },
              { name: "Airport Station Hub", time: "14:40" },
            ]}
          />

          <BusCard
            busId="BUS-704"
            driverName="Michael Chen"
            occupancy={42}
            speedKmh={55}
            status="active"
            nextStop="Oak Street Metro"
          />

          <StopCard
            stopName="Oak Street Metro Hub"
            locationDetails="East Block, Crossing Ave"
            arrivals={[
              { routeNumber: "402", etaMinutes: 4 },
              { routeNumber: "108", etaMinutes: 12 },
            ]}
          />

          <div className="flex flex-col gap-4 bg-secondary/15 p-6 rounded-2xl border border-glass-border">
            <span className="text-xs font-bold text-text-secondary select-none uppercase tracking-wider">
              Transit Action Path Timeline
            </span>
            <Timeline
              nodes={[
                { title: "Metro Hub Station", description: "Bus departed terminal", time: "18:20", status: "completed" },
                { title: "Oak Street Crossing", description: "Currently approaching intersection", time: "18:32", status: "active" },
                { title: "Airport Station Terminus", description: "Scheduled arrival", time: "18:55", status: "pending" },
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

Showcase.displayName = "Showcase";
export default Showcase;
