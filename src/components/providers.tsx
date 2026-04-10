"use client";

import { ReactLenis } from "lenis/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CookieConsentChoice = "accepted" | "essential";

type CookieConsentContextValue = {
  consentChoice: CookieConsentChoice | null;
  hasMadeChoice: boolean;
  canLoadThirdParty: boolean;
  acceptCookies: () => void;
  useEssentialOnly: () => void;
};

const COOKIE_CONSENT_KEY = "aura_cookie_consent_v1";

const CookieConsentContext = createContext<CookieConsentContextValue>({
  consentChoice: null,
  hasMadeChoice: false,
  canLoadThirdParty: false,
  acceptCookies: () => undefined,
  useEssentialOnly: () => undefined,
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [consentChoice, setConsentChoice] = useState<CookieConsentChoice | null>(null);
  const [consentLoaded, setConsentLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    const storedChoice = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedChoice === "accepted" || storedChoice === "essential") {
      queueMicrotask(() => {
        setConsentChoice(storedChoice);
      });
    }

    queueMicrotask(() => {
      setConsentLoaded(true);
    });
  }, []);

  const acceptCookies = () => {
    setConsentChoice("accepted");
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
  };

  const useEssentialOnly = () => {
    setConsentChoice("essential");
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "essential");
  };

  const consentValue = useMemo<CookieConsentContextValue>(() => {
    const hasMadeChoice = consentChoice !== null;
    return {
      consentChoice,
      hasMadeChoice,
      canLoadThirdParty: consentChoice === "accepted",
      acceptCookies,
      useEssentialOnly,
    };
  }, [consentChoice]);

  return (
    <CookieConsentContext.Provider value={consentValue}>
      <ReactLenis root>
        {children}

        {consentLoaded && !consentValue.hasMadeChoice && (
          <div className="fixed z-[130] left-4 right-4 bottom-4 md:left-1/2 md:-translate-x-1/2 md:max-w-3xl">
            <div
              className="rounded-2xl border px-5 py-4 md:px-6 md:py-5"
              style={{
                background: "rgba(250, 247, 242, 0.95)",
                borderColor: "rgba(184,137,42,0.28)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 14px 38px rgba(0,0,0,0.18)",
              }}
            >
              <p className="font-tenor text-sm md:text-[15px] text-primary/90 leading-relaxed">
                We use optional cookies to enable Vimeo videos and the interactive location map.
                You can continue with essential-only mode, or accept optional cookies for the full experience.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2.5 sm:justify-end">
                <button
                  type="button"
                  onClick={useEssentialOnly}
                  className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-marble text-primary px-5 py-2.5 hover:border-bronze hover:text-bronze transition-colors"
                >
                  Essential Only
                </button>

                <button
                  type="button"
                  onClick={acceptCookies}
                  className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bronze text-white px-5 py-2.5 hover:shadow-[0_0_18px_rgba(184,137,42,0.32)] transition-shadow"
                >
                  Accept Optional Cookies
                </button>
              </div>
            </div>
          </div>
        )}
      </ReactLenis>
    </CookieConsentContext.Provider>
  );
}
