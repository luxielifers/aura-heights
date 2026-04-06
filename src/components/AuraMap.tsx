"use client";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/QFRgpTvonGdywXjC9";

export default function AuraMap() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const src = `https://api.mapbox.com/styles/v1/luxiesites/cmnmsq6mt000101s30gy23zsd.html?title=false&access_token=${token}&zoomwheel=false#14.5/30.39598/78.0693`;

  return (
    <>
      {/* Non-interactive map iframe */}
      <iframe
        src={src}
        className="absolute inset-0 w-full h-full"
        style={{ border: 0, pointerEvents: "none", display: "block" }}
        title="Aura Heights Custom Map"
        loading="lazy"
      />
      {/* Click overlay — opens Google Maps */}
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label="Open Aura Heights in Google Maps"
      />
    </>
  );
}
