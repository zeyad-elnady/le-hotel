export interface MenuItem {
  label: string;
  translationKey: string;
  link: string;
}

export const menuData: MenuItem[] = [
  { label: "Home", translationKey: "nav.home", link: "/" },
  { label: "Rooms", translationKey: "nav.rooms", link: "/rooms" },
  { label: "Reviews", translationKey: "nav.reviews", link: "/reviews" },
  { label: "Jobs", translationKey: "nav.jobs", link: "/jobs" },
  { label: "About Us", translationKey: "nav.about", link: "/about" },
  { label: "Contact", translationKey: "nav.contact", link: "/contact" },
];
