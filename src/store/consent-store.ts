import { create } from "zustand";

type ConsentValue = boolean | null;

interface ConsentState {
  accepted: ConsentValue;
  setConsent: (value: boolean) => void;
  hydrate: () => void;
}

export const useConsentStore = create<ConsentState>((set) => ({
  accepted: null,
  setConsent: (value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookie-consent", value ? "accepted" : "declined");
    }
    set({ accepted: value });
  },
  hydrate: () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted") set({ accepted: true });
    else if (stored === "declined") set({ accepted: false });
  },
}));
