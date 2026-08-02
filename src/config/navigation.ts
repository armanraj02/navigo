export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  role: "passenger" | "driver" | "admin" | "all";
}

export const navigationConfig: NavigationItem[] = [
  {
    id: "landing",
    label: "Explore",
    href: "/",
    role: "all",
  },
  {
    id: "passenger",
    label: "Passenger Console",
    href: "/passenger",
    role: "passenger",
  },
  {
    id: "driver",
    label: "Driver Console",
    href: "/driver",
    role: "driver",
  },
  {
    id: "admin",
    label: "Admin Console",
    href: "/admin",
    role: "admin",
  },
];
