"use client";

export default function AuraMap() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-bg text-center px-6">
        <p className="font-tenor text-primary/75 leading-relaxed max-w-sm">
          Map preview is unavailable right now.
        </p>
      </div>
    );
  }

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

      {/* Gold pin — bottom of wrapper anchors to map center (Aura Heights coords) */}
      <div
        className="absolute z-[5] pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -100%)",
        }}
      >
        <div className="flex items-start gap-3">

          {/* Pin SVG — Google Maps teardrop shape */}
          <svg
            width="48"
            height="62"
            viewBox="0 0 44 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter:
                "drop-shadow(0px 8px 14px rgba(184,137,42,0.50)) drop-shadow(0px 2px 5px rgba(0,0,0,0.22))",
            }}
          >
            {/* Teardrop body */}
            <path
              d="M22 0C9.85 0 0 9.85 0 22C0 37.5 22 58 22 58C22 58 44 37.5 44 22C44 9.85 34.15 0 22 0Z"
              fill="#B8892A"
            />
            {/* Subtle inner highlight rim */}
            <path
              d="M22 2.5C11.5 2.5 2.5 11.5 2.5 22C2.5 36 22 54.5 22 54.5C22 54.5 41.5 36 41.5 22C41.5 11.5 32.5 2.5 22 2.5Z"
              fill="#D4A84B"
              opacity="0.30"
            />
            {/* White ring */}
            <circle cx="22" cy="20.5" r="10" fill="#FAF7F2" />
            {/* Gold centre dot */}
            <circle cx="22" cy="20.5" r="4" fill="#B8892A" />
          </svg>

          {/* "Aura Heights" label badge */}
          <div
            style={{
              marginTop: "14px",
              background: "rgba(250, 247, 242, 0.94)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(184, 137, 42, 0.28)",
              borderRadius: "30px",
              padding: "8px 20px",
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              fontFamily: "var(--font-josefin, 'Josefin Sans', sans-serif)",
              color: "#1C1C1C",
              whiteSpace: "nowrap" as const,
              boxShadow:
                "0 6px 28px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(184,137,42,0.18)",
            }}
          >
            Aura Heights
          </div>
        </div>
      </div>

    </>
  );
}
