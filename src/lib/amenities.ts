export type AmenityIconKey =
  | "play"
  | "power"
  | "yoga"
  | "grocery"
  | "landscape"
  | "lift"
  | "ev"
  | "solar"
  | "water"
  | "street"
  | "gated"
  | "games"
  | "roads"
  | "security"
  | "party"
  | "sewage"
  | "lounge"
  | "terrace"
  | "fitness"
  | "smart"
  | "fastag"
  | "meditation"
  | "community";

export type AmenityItem = {
  title: string;
  desc: string;
  icon: AmenityIconKey;
};

export const amenities: AmenityItem[] = [
  { title: "Children's Play Area", desc: "Safe and engaging outdoor play spaces for younger residents.", icon: "play" },
  { title: "Partial Power Backup", desc: "Reliable backup support for essential comfort during outages.", icon: "power" },
  { title: "Yoga and Meditation Area", desc: "Dedicated wellness zones for mindful daily routines.", icon: "yoga" },
  { title: "Grocery Shop", desc: "Daily convenience essentials available within the community.", icon: "grocery" },
  { title: "Landscaping and Tree Plantation", desc: "Curated green pockets and planted avenues across the campus.", icon: "landscape" },
  { title: "High-Speed Lift Access", desc: "Efficient vertical mobility with access-controlled modern lifts.", icon: "lift" },
  { title: "EV Charging Point", desc: "Future-ready charging infrastructure at parking levels.", icon: "ev" },
  { title: "Solar Energy Electrification", desc: "Energy-conscious systems supported by solar-enabled infrastructure.", icon: "solar" },
  { title: "24x7 Water Supply", desc: "Round-the-clock water availability for uninterrupted living.", icon: "water" },
  { title: "Street Lighting", desc: "Well-lit internal streets for safety and comfort after dark.", icon: "street" },
  { title: "Gated Community", desc: "Controlled access and secure entry points throughout the project.", icon: "gated" },
  { title: "Indoor Games", desc: "Indoor recreation corners for all-age social engagement.", icon: "games" },
  { title: "Internal Roads and Footpaths", desc: "Smooth internal circulation with pedestrian-friendly movement.", icon: "roads" },
  { title: "24x7 Security", desc: "Continuous surveillance and monitoring for peace of mind.", icon: "security" },
  { title: "Party Lawn", desc: "Open celebration-friendly lawn for gatherings and events.", icon: "party" },
  { title: "Sewage Treatment Plant", desc: "On-site treatment systems aligned with sustainable operations.", icon: "sewage" },
  { title: "Residents Lounge with Valley Views", desc: "A refined social lounge overlooking the scenic Dehradun valley.", icon: "lounge" },
  { title: "Rooftop Terrace with Yoga Deck", desc: "Sky-level relaxation and wellness spaces with open views.", icon: "terrace" },
  { title: "Fitness Studio", desc: "Cardio, strength, and wellness zones in a premium active space.", icon: "fitness" },
  { title: "Smart Entry Access", desc: "Digitally managed entry controls for secure resident movement.", icon: "smart" },
  { title: "FASTag Entry", desc: "Streamlined vehicle entry with FASTag-enabled recognition.", icon: "fastag" },
  { title: "Meditation Park", desc: "Quiet landscaped retreat designed for mindfulness and calm.", icon: "meditation" },
  { title: "Community Park Spaces", desc: "Shared open-air zones for everyday connection and leisure.", icon: "community" },
];

export const featuredAmenities: AmenityItem[] = [
  amenities[17],
  amenities[18],
  amenities[16],
];
