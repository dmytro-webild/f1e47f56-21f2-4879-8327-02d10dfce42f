import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Button = { text: string; href: string };

type HeroShapeSplitProps = {
  tag?: string;
  title?: string;
  description?: string;
  primaryButton?: Button;
  secondaryButton?: Button;
  scrollLabel?: string;
  introDelay?: number;
  ariaLabel?: string;
  className?: string;
};

const RollLink = ({ text, href, show, delay }: Button & { show: boolean; delay: number }) => {
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const letters = Array.from(text);
  return (
    <motion.a
      href={href}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: slow, ease, delay }}
      className="btn-link group w-full max-w-[15.5rem] justify-between gap-[1rem] border-b border-foreground/25 py-[0.75rem] lg:w-[12.75rem] lg:py-[0.5rem]"
    >
      <div className="relative min-w-0 overflow-hidden">
        <p className="sr-only">{text}</p>
        <div aria-hidden="true" className="flex">
          {letters.map((char, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 0.015}s` }}
              className="relative whitespace-pre transition-transform duration-[450ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full motion-reduce:transition-none"
            >
              {char}
              <div className="absolute left-0 top-full">{char}</div>
            </div>
          ))}
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="size-[0.75rem] shrink-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
        <path d="M2.5 9.5l7-7M3.5 2.5h6v6" stroke="currentColor" strokeWidth="1" />
      </svg>
    </motion.a>
  );
};

const HeroShapeSplit = ({
  tag = "00 / Intro",
  title = "Brands people remember.",
  description = "Identity, websites and digital products for founders with something to say.",
  primaryButton = { text: "Start a project", href: "#contact" },
  secondaryButton = { text: "See our work", href: "#gallery" },
  scrollLabel = "Scroll to discover",
  introDelay = 0,
  ariaLabel,
  className,
}: HeroShapeSplitProps) => {
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const [go, setGo] = useState(introDelay <= 0);
  const tagChars = Array.from(tag);
  const words = title.trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    if (go) return;
    const start = () => setGo(true);
    const fallback = window.setTimeout(start, (introDelay + 1.5) * 1000);
    window.addEventListener("kit:intro", start);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("kit:intro", start);
    };
  }, [go, introDelay]);

  return (
    <section
      aria-label={ariaLabel ?? "Intro"}
      className={cn("relative overflow-x-clip text-foreground", className)}
    >
      <div className="relative min-h-svh overflow-hidden">
        <div className="relative mx-auto flex min-h-svh w-[var(--container)] flex-col pb-[clamp(4rem,12svh,7rem)] pt-[clamp(6.5rem,15svh,10rem)] lg:pt-[clamp(7rem,17svh,10rem)]">
          <div className="relative z-10 flex flex-col items-start lg:w-1/2 lg:pr-[var(--gap)]">
            <div className="flex items-center gap-[0.875rem] font-mono text-[length:var(--text-label)] uppercase leading-[1.5]">
              <p className="sr-only">{tag}</p>
              <div aria-hidden="true" className="flex whitespace-nowrap">
                {tagChars.map((char, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={go ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.01, delay: i * 0.02 }}
                    className="whitespace-pre"
                  >
                    {char}
                  </motion.div>
                ))}
              </div>
            </div>

            <h1
              aria-label={title}
              className="mt-[1.75rem] text-balance text-[length:calc(var(--text-h1)*0.85)] leading-[1] tracking-[-0.05em] [overflow-wrap:anywhere] lg:mt-[2.5rem]"
            >
              {words.map((word, i) => (
                <div key={i} aria-hidden="true" className="mr-[0.24em] inline-block overflow-hidden align-top pt-[0.08em] -mt-[0.08em] pb-[0.15em] -mb-[0.15em] last:mr-0">
                  <motion.div
                    initial={reduce ? false : { y: "110%" }}
                    animate={go ? { y: "0%" } : undefined}
                    transition={{ duration: slow, ease, delay: 0.3 + i * 0.04 }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </h1>

            {description && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={go ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: slow, ease, delay: 0.12 }}
                className="mt-[1.25rem] max-w-[34rem] text-balance text-[length:var(--text-body)] leading-[1.5] tracking-[-0.025em] lg:mt-[1.5rem]"
              >
                {description}
              </motion.p>
            )}

            {(primaryButton || secondaryButton) && (
              <div className="mt-[1.5rem] flex w-full flex-col lg:mt-[2.25rem] lg:flex-row lg:flex-wrap lg:gap-x-[1.5rem] lg:gap-y-[1rem]">
                {primaryButton && <RollLink {...primaryButton} show={go} delay={0.2} />}
                {secondaryButton && <RollLink {...secondaryButton} show={go} delay={0.26} />}
              </div>
            )}
          </div>

          {scrollLabel && (
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={go ? { opacity: 1 } : undefined}
              transition={{ duration: slow, ease, delay: 0.5 }}
              className="absolute bottom-[clamp(1.5rem,5svh,3.5rem)] left-0 hidden items-center gap-[0.75rem] font-mono text-[length:var(--text-label)] uppercase leading-[1.5] text-muted-foreground lg:flex"
            >
              <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="size-[0.75rem]">
                <path d="M6 1.5v9M2.5 7L6 10.5 9.5 7" stroke="currentColor" strokeWidth="1" />
              </svg>
              <p className="whitespace-nowrap">{scrollLabel}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroShapeSplit;
