export type NavLink = {
  href: string;
  label: string;
};

// NOTE: Navigation conflict #3 (AGENTS.md) is unresolved — nav items will
// change when Shahad rules on section 4.1. Do not add or remove entries here.
export const navLinks: NavLink[] = [
  { href: "/apis", label: "Explore APIs" },
  { href: "/providers", label: "For Providers" },
  { href: "/developers", label: "Developers" },
  { href: "/guides", label: "Resources" },
] as const;
