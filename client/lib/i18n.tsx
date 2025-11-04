import React, { createContext, useContext, useMemo, useState } from "react";
import en from "../locales/en.json";
import hi from "../locales/hi.json";
import bn from "../locales/bn.json";
import ta from "../locales/ta.json";
import te from "../locales/te.json";
import ml from "../locales/ml.json";
import kn from "../locales/kn.json";
import mr from "../locales/mr.json";
import gu from "../locales/gu.json";
import pa from "../locales/pa.json";
import or from "../locales/or.json";
import as_ from "../locales/as.json";
import sd from "../locales/sd.json";
import ne from "../locales/ne.json";
import sa from "../locales/sa.json";
import kok from "../locales/kok.json";
import brx from "../locales/brx.json";
import doi from "../locales/doi.json";
import mni from "../locales/mni.json";
import mai from "../locales/mai.json";
import sat from "../locales/sat.json";
import ks from "../locales/ks.json";

const ALL_LOCALES: { [key: string]: any } = {
  en,
  hi,
  bn,
  ta,
  te,
  ml,
  kn,
  mr,
  gu,
  pa,
  or,
  as: as_,
  sd,
  ne,
  sa,
  kok,
  brx,
  doi,
  mni,
  mai,
  sat,
  ks,
};

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "ml", label: "മലയാളം" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "as", label: "অসমীয়া" },
  { code: "sd", label: "سنڌي" },
  { code: "ne", label: "नेपाली" },
  { code: "sa", label: "संस्कृतम्" },
  { code: "kok", label: "कों��णी" },
  { code: "brx", label: "बड़ो" },
  { code: "doi", label: "डोगरी" },
  { code: "mni", label: "মৈতৈলোন্" },
  { code: "mai", label: "मैथिली" },
  { code: "sat", label: "ସନ୍ତାଳି" },
  { code: "ks", label: "کٙشْمِیٖرِی" },
];

type I18nContextType = {
  lang: string;
  setLang: (l: string) => void;
  t: (key: string, fallback?: string) => string;
  languages: { code: string; label: string }[];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("bf_lang");
      return saved || "en";
    }
    return "en";
  });

  const setLang = (l: string) => {
    if (ALL_LOCALES[l]) {
      window.localStorage.setItem("bf_lang", l);
      _setLang(l);
    }
  };

  // internal state
  const [_lang, _setLang] = React.useState<string>(lang);

  const t = (key: string, fallback = "") => {
    const locale = ALL_LOCALES[_lang] || ALL_LOCALES["en"];
    const parts = key.split(".");
    let cur: any = locale;
    for (const p of parts) {
      if (cur && typeof cur === "object" && cur.hasOwnProperty(p)) {
        cur = cur[p];
      } else {
        cur = undefined;
        break;
      }
    }
    if (cur === undefined || cur === null) return fallback || key;
    if (typeof cur === "string") return cur;
    return String(cur);
  };

  const value = useMemo(() => ({ lang: _lang, setLang: setLang as any, t, languages }), [_lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
