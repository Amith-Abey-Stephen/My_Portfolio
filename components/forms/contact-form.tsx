"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-input border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted transition-colors focus:border-burgundy-light focus:outline-none focus-visible:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-card border border-border bg-surface p-10 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-burgundy/30 bg-burgundy/10 text-burgundy-light">
            <Check className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-foreground">
            Message sent.
          </h3>
          <p className="mt-2 text-secondary">
            Thanks for reaching out — I&rsquo;ll get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="link-underline mt-6 text-sm text-muted hover:text-foreground"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
          noValidate
        >
          {/* Honeypot — hidden from humans, catches bots. */}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-secondary"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                autoComplete="name"
                placeholder="Your name"
                className={field}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-secondary"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={field}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-secondary"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              rows={5}
              placeholder="What are you building?"
              className={cn(field, "resize-y")}
            />
          </div>

          {status === "error" && error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-burgundy px-6 py-3 font-medium text-burgundy-foreground transition-[background-color,transform] duration-200 hover:bg-burgundy-hover hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send message <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
