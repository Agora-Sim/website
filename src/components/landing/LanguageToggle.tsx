import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: object, el: string) => void } };
    googleTranslateElementInit?: () => void;
  }
}

const SCRIPT_ID = "google-translate-script";
const STYLE_ID = "google-translate-style";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .goog-te-banner-frame, .skiptranslate iframe { display: none !important; }
    body { top: 0 !important; position: static !important; }
    .goog-tooltip, .goog-tooltip:hover { display: none !important; }
    .goog-text-highlight { background: none !important; box-shadow: none !important; }
    #google_translate_element { position: absolute; left: -9999px; top: -9999px; }
    font[style*="vertical-align"] { background: transparent !important; }
  `;
  document.head.appendChild(style);
}

function waitForCombo(timeoutMs = 6000): Promise<HTMLSelectElement> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      const sel = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
      if (sel) return resolve(sel);
      if (Date.now() - start > timeoutMs) return reject(new Error("Translate combo not found"));
      setTimeout(tick, 100);
    };
    tick();
  });
}

function loadTranslateScript(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById(SCRIPT_ID)) {
      resolve();
      return;
    }
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "pt", autoDisplay: false },
        "google_translate_element",
      );
      resolve();
    };
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

async function setLanguage(lang: "en" | "pt") {
  injectStyles();
  await loadTranslateScript();
  try {
    const combo = await waitForCombo();
    combo.value = lang === "pt" ? "pt" : "";
    combo.dispatchEvent(new Event("change"));
  } catch (e) {
    console.warn("[i18n] translate combo unavailable", e);
  }
}

export function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "pt">("en");
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    injectStyles();
    const saved = (localStorage.getItem("agorasim:lang") as "en" | "pt" | null) ?? "en";
    if (saved === "pt") {
      setLang("pt");
      void setLanguage("pt");
    }
  }, []);

  const switchTo = (next: "en" | "pt") => {
    if (next === lang) return;
    setLang(next);
    localStorage.setItem("agorasim:lang", next);
    void setLanguage(next);
  };

  return (
    <>
      <div id="google_translate_element" aria-hidden />
      <div
        role="group"
        aria-label="Language"
        className="inline-flex items-center rounded-md border border-border bg-card p-0.5 font-mono text-[11px] notranslate"
        translate="no"
      >
        <button
          type="button"
          onClick={() => switchTo("en")}
          aria-pressed={lang === "en"}
          className={`rounded-sm px-2 py-1 transition ${
            lang === "en" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => switchTo("pt")}
          aria-pressed={lang === "pt"}
          className={`rounded-sm px-2 py-1 transition ${
            lang === "pt" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          PT
        </button>
      </div>
    </>
  );
}
