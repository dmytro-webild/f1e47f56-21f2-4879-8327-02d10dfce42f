import { useEffect, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Link = { text: string; href: string };

type FooterWordmarkLandingProps = {
  brand?: string;
  mark?: string;
  links?: Link[];
  tagline?: string;
  copyright?: string;
  ariaLabel?: string;
  className?: string;
};

export default function FooterWordmarkLanding({
  brand = "Ostra",
  mark,
  links = [
    { text: "Privacy policy", href: "#" },
    { text: "Terms of use", href: "#" },
  ],
  tagline = "Independent minds. Shared ambition.",
  copyright = "© Ostra Studio 2026",
  ariaLabel,
  className,
}: FooterWordmarkLandingProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const word = wordRef.current;
    if (!row || !word) return;
    const fit = () => {
      const current = parseFloat(getComputedStyle(row).fontSize) || 16;
      const k = word.offsetWidth / current;
      const width = row.clientWidth;
      if (!k || !width) return;
      row.style.fontSize = `${Math.floor((width / k) * 10) / 10}px`;
    };
    fit();
    let alive = true;
    document.fonts?.ready.then(() => alive && fit());
    const observer = new ResizeObserver(fit);
    observer.observe(row);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [brand]);

  return (
    <footer aria-label={ariaLabel ?? "Footer"} className={cn("relative pb-[var(--gutter)] pt-[clamp(2.5rem,1.8rem+2.8vw,3rem)] text-foreground", className)}>
      <div className="kit-glass mx-auto flex w-[var(--container)] flex-col px-[1.375rem] pt-[1.375rem] lg:px-[clamp(2rem,3.5vw,3.5rem)] lg:pt-[clamp(2rem,3.5vw,3.5rem)]">
        <div ref={rowRef} className="flex text-[length:var(--text-display)]">
          <div ref={wordRef} aria-label={brand} role="img" className="flex w-max shrink-0 items-start">
            <p aria-hidden="true" className="whitespace-nowrap font-medium leading-[0.9] tracking-[-0.065em]">
              {brand}
            </p>
            {mark && (
              <p aria-hidden="true" className="ml-[0.04em] mt-[0.02em] flex size-[0.15em] items-center justify-center rounded-full border-[0.018em] border-accent text-[length:0.1em] font-medium leading-none text-accent">
                {mark}
              </p>
            )}
          </div>
        </div>

        {links.length > 0 && (
          <ul className="mt-[clamp(1.75rem,1.5rem+1vw,2.25rem)] flex flex-wrap gap-x-[clamp(1.25rem,2.2vw,2rem)] gap-y-[8px]">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="btn-link w-[clamp(10rem,15vw,12.5rem)] justify-between border-b border-border pb-[12px] pt-[12px]">
                  <p className="whitespace-nowrap">{link.text}</p>
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="size-[16px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 15L15 5M7 5h8v8" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] grid grid-cols-1 gap-[8px] border-t border-border py-[28px] font-mono text-[length:var(--text-label)] uppercase leading-[1.5] text-muted-foreground lg:grid-cols-3 lg:items-center">
          <div aria-hidden="true" className="hidden lg:block" />
          {tagline && <p className="text-balance lg:text-center">{tagline}</p>}
          {copyright && <p className="whitespace-nowrap lg:text-right">{copyright}</p>}
        </div>
      </div>
    </footer>
  );
}
