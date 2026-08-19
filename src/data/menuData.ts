export interface MenuItem {
  label: string;
  translationKey: string;
  link: string;
}

export const menuData: MenuItem[] = [
  { label: "Home", translationKey: "nav.home", link: "/" },
  { label: "About Us", translationKey: "nav.about", link: "/about" },
  { label: "Rooms", translationKey: "nav.rooms", link: "/rooms" },
  { label: "Events", translationKey: "nav.events", link: "/events" },
  { label: "Reviews", translationKey: "nav.reviews", link: "/reviews" },
  { label: "Jobs", translationKey: "nav.jobs", link: "/jobs" },
  { label: "Contact", translationKey: "nav.contact", link: "/contact" },
];
