import { AmenityIconKey } from "@/lib/amenities";

type AmenityIconProps = {
  icon: AmenityIconKey;
  className?: string;
};

const iconPathMap: Record<AmenityIconKey, string> = {
  play: "M12 4a8 8 0 1 0 0 16 8 8 0 1 0 0-16Zm-1 5.5 4 2.5-4 2.5V9.5Z",
  power: "M13 3h-2v7h2V3Zm-1 18a7 7 0 0 1-5.66-11.11l1.62 1.18A5 5 0 1 0 17 14a5 5 0 0 0-1.02-3.03l1.62-1.18A7 7 0 0 1 12 21Z",
  yoga: "M12 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4Zm-6 8h12v2H6v-2Zm2-3h8l1 2H7l1-2Zm3 5h2v4h-2v-4Z",
  grocery: "M6 7h12l-1.1 5.5a2 2 0 0 1-2 1.5H9.1a2 2 0 0 1-2-1.5L6 7Zm2-3h8v2H8V4Zm1 12a2 2 0 1 0 0 4 2 2 0 1 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4Z",
  landscape: "M4 18h16v2H4v-2Zm2-1 3-6 3 4 2-3 4 5H6Zm8-9a2 2 0 1 0 0-4 2 2 0 1 0 0 4Z",
  lift: "M7 3h10v18H7V3Zm2 4h6v10H9V7Zm3-2 2 2h-4l2-2Zm0 14-2-2h4l-2 2Z",
  ev: "M11 3h4l-2 5h3l-5 7 1-5H8l3-7Zm-5 13h2v5H6v-5Zm10 0h2v5h-2v-5Z",
  solar: "M12 2 13 5h-2l1-3Zm0 17 1 3h-2l1-3ZM4.9 5.6 7.3 7 6 8.3 4.9 5.6Zm14.2 12.8L16.7 17 18 15.7l1.1 2.7ZM2 12l3-1v2l-3-1Zm17 0 3-1v2l-3-1ZM4.9 18.4 6 15.7 7.3 17l-2.4 1.4Zm14.2-12.8-1.1 2.7L16.7 7 19.1 5.6ZM7 9h10l-1.2 8H8.2L7 9Z",
  water: "M12 4c3 3.4 5 5.7 5 8a5 5 0 1 1-10 0c0-2.3 2-4.6 5-8Zm-2 9a2 2 0 0 0 4 0h2a4 4 0 0 1-8 0h2Z",
  street: "M11 3h2v3h-2V3Zm-5 5h2v13H6V8Zm10 0h2v13h-2V8Zm-8 5h8v2H8v-2Z",
  gated: "M5 9h14v12H5V9Zm2 2v8h10v-8H7Zm4-8h2v4h-2V3Z",
  games: "M7 8h10a3 3 0 0 1 3 3v4h-3l-2-2h-6l-2 2H4v-4a3 3 0 0 1 3-3Zm1 2v2h2v-2H8Zm6 0v2h2v-2h-2Z",
  roads: "M11 3h2v3h-2V3Zm0 6h2v3h-2V9Zm0 6h2v3h-2v-3ZM4 21l4-18h2L6 21H4Zm14 0-4-18h2l4 18h-2Z",
  security: "M12 3 5 6v6c0 4.5 3 7.4 7 9 4-1.6 7-4.5 7-9V6l-7-3Zm0 5a2 2 0 1 1 0 4 2 2 0 1 1 0-4Zm-3 7a3 3 0 0 1 6 0H9Z",
  party: "M6 21v-8l6-2 6 2v8h-2v-6l-4-1.3V21h-2v-7.3L8 15v6H6ZM12 3l5 3-5 3-5-3 5-3Z",
  sewage: "M4 18h16v2H4v-2Zm2-2h12l-1.5-7h-9L6 16Zm4-10h4l1 2H9l1-2Z",
  lounge: "M5 12h14v5h-2v-3H7v3H5v-5Zm2-4h10a2 2 0 0 1 2 2v1H5v-1a2 2 0 0 1 2-2Z",
  terrace: "M4 19h16v2H4v-2Zm2-3h12v2H6v-2Zm3-5h6v4H9v-4ZM8 3h8v2H8V3Z",
  fitness: "M3 10h3v4H3v-4Zm15 0h3v4h-3v-4ZM7 11h10v2H7v-2Zm-1-3h2v8H6V8Zm10 0h2v8h-2V8Z",
  smart: "M12 3a4 4 0 0 1 4 4v1h1a2 2 0 0 1 2 2v8h-2v-8h-2V7a3 3 0 1 0-6 0v3H7v8H5v-8a2 2 0 0 1 2-2h1V7a4 4 0 0 1 4-4Zm-1 9h2v4h-2v-4Z",
  fastag: "M4 7h16v10H4V7Zm2 2v6h12V9H6Zm1 1h3v4H7v-4Zm5 0h5v1h-5v-1Zm0 2h5v1h-5v-1Zm0 2h3v1h-3v-1Z",
  meditation: "M12 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4Zm-6 9h12v2H6v-2Zm3-4h6l1 3H8l1-3Zm2 6h2v3h-2v-3Z",
  community: "M5 18h14v2H5v-2Zm1-1a3 3 0 1 1 2.8-4h6.4A3 3 0 1 1 18 17H6Zm2-8a2 2 0 1 0 0-4 2 2 0 1 0 0 4Zm8 0a2 2 0 1 0 0-4 2 2 0 1 0 0 4Z",
};

export default function AmenityIcon({ icon, className }: AmenityIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className ?? "w-10 h-10"}>
      <path d={iconPathMap[icon]} />
    </svg>
  );
}
