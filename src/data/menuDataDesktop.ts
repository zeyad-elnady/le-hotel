export interface DesktopMenuItem {
  label: string;
  translationKey: string;
  type: "link";
  link: string;
}

export const desktopMenuData: DesktopMenuItem[] = [
  { label: "Home", translationKey: "nav.home", type: "link", link: "/" },
  { label: "About Us", translationKey: "nav.about", type: "link", link: "/about" },
  { label: "Rooms", translationKey: "nav.rooms", type: "link", link: "/rooms" },
  { label: "Reviews", translationKey: "nav.reviews", type: "link", link: "/reviews" },
  { label: "Jobs", translationKey: "nav.jobs", type: "link", link: "/jobs" },
  { label: "Contact", translationKey: "nav.contact", type: "link", link: "/contact" },
];
