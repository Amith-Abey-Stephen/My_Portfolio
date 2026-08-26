"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { genzDictionary } from "@/content/genz";

/**
 * Gen Z mode — "english (chronically online)", à la Canva. A purely
 * client-side layer: server routes (sitemap, llms.txt, JSON-LD, RSS) and SEO
 * copy stay in normal English; the visible DOM is swapped via an exact-match
 * dictionary once the toggle is on. Nothing upstream of render changes.
 */

const STORAGE_KEY = "amith:genz";
const SWAP_ATTRS = ["placeholder", "aria-label"] as const;
const SKIP_SELECTOR = "script,style,[data-genz-skip]";

type Dict = Map<string, string>;

const toGenz: Dict = new Map(Object.entries(genzDictionary));
const fromGenz: Dict = new Map(
  Object.entries(genzDictionary).map(([plain, genz]) => [genz, plain]),
);

function swapText(node: Text, dict: Dict) {
  const value = node.nodeValue;
  if (!value) return;
  const key = value.trim();
  const next = key ? dict.get(key) : undefined;
  if (next) node.nodeValue = value.replace(key, next);
}

function swapAttrs(el: Element, dict: Dict) {
  for (const attr of SWAP_ATTRS) {
    const value = el.getAttribute(attr);
    const next = value ? dict.get(value.trim()) : undefined;
    if (next) el.setAttribute(attr, next);
  }
}

function swapTree(root: Node, dict: Dict) {
  if (root.nodeType === Node.TEXT_NODE) {
    const parent = root.parentElement;
    if (parent && !parent.closest(SKIP_SELECTOR)) swapText(root as Text, dict);
    return;
  }
  if (!(root instanceof Element) || root.closest(SKIP_SELECTOR)) return;
  swapAttrs(root, dict);
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode: (n) =>
        n instanceof Element && n.matches(SKIP_SELECTOR)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    },
  );
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n instanceof Element) swapAttrs(n, dict);
    else swapText(n as Text, dict);
  }
}

const GenZContext = createContext<{ enabled: boolean; toggle: () => void }>({
  enabled: false,
  toggle: () => {},
});

export function useGenZ() {
  return useContext(GenZContext);
}

export function GenZProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  // Distinguishes a click from the initial localStorage restore, so reloading
  // with the mode on doesn't flash the "activated" toast.
  const userToggled = useRef(false);

  // Restore after hydration — localStorage can't inform the server render.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(STORAGE_KEY) === "1") setEnabled(true);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-genz", enabled);
    swapTree(document.body, enabled ? toGenz : fromGenz);
    if (!enabled) return;
    // React re-renders resurface original copy (rotating headline words,
    // route changes, form states) — re-swap nodes as they appear. Our own
    // writes are no-ops on the next pass (translated text is never a
    // dictionary key), so this cannot loop.
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") swapTree(record.target, toGenz);
        for (const added of record.addedNodes) swapTree(added, toGenz);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!userToggled.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch {}
    setToast(
      enabled
        ? "gen z mode: ON 🧃 it's giving website"
        : "back to professional mode 🧐",
    );
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [enabled]);

  const toggle = useCallback(() => {
    userToggled.current = true;
    setEnabled((prev) => !prev);
  }, []);

  return (
    <GenZContext.Provider value={{ enabled, toggle }}>
      {children}
      <div
        data-genz-skip
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center"
      >
        <AnimatePresence>
          {toast && (
            <motion.p
              key={toast}
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full border border-burgundy/40 bg-background/90 px-5 py-2.5 font-mono text-sm text-foreground shadow-2xl backdrop-blur-xl"
            >
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </GenZContext.Provider>
  );
}
