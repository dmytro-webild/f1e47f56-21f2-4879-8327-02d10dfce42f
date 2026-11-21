import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Question = { title: string; description: string };

type FaqHairlineIndexProps = {
  tag?: string;
  title?: string;
  items?: Question[];
  ariaLabel?: string;
  className?: string;
};

const FaqHairlineIndex = ({
  tag = "10 / Questions",
  title = "Before we start.",
  items = [
    { title: "How long does a project take?", description: "A brand identity takes six to eight weeks. A website takes eight to twelve, depending on how many pages and how much custom motion it needs." },
    { title: "Do you work with early stage teams?", description: "Yes. Some of our best work started before the company had a name. We scale the scope to the stage you are at." },
    { title: "Who will we work with day to day?", description: "A small senior team: one strategist, one designer and one developer, with a single lead who owns the timeline." },
    { title: "Can we edit the website ourselves?", description: "Every site ships on a CMS your team can use without us, with a short handover session and written notes." },
    { title: "Do you work outside Copenhagen?", description: "Most of our clients are elsewhere in Europe and the US. We work remotely and meet in person for the kickoff when it helps." },
  ],
  ariaLabel,
  className,
}: FaqHairlineIndexProps) => {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const { ease, base, slow } = useKitMotion();
  const id = useId();
  const typing = (tag?.length ?? 0) * 0.02;
  const words = title.split(" ");

  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn("relative py-[var(--section-space)] text-foreground", className)}
    >
      <div className="kit-glass mx-auto grid w-[var(--container)] gap-[clamp(1.5rem,3vw,3rem)] p-[1.375rem] lg:grid-cols-12 lg:gap-[var(--gap)] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        <div className="flex flex-col lg:col-span-5">
          {tag && (
            <div className="flex flex-wrap items-center gap-x-[14px] gap-y-1 font-mono text-[length:var(--text-label)] uppercase leading-[1.5] tracking-[var(--label-tracking)]">
              {tag && (
                <motion.p
                  initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: typing, ease: "linear" }}
                  className="whitespace-nowrap"
                >
                  {tag}
                </motion.p>
              )}
            </div>
          )}
          <motion.h2
            aria-label={title}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.04, delayChildren: 0.15 }}
            className="mt-7 max-w-[10em] text-[length:var(--text-h2)] leading-[1.05] lg:mt-10"
          >
            {words.map((word, index) => (
              <div key={index} aria-hidden="true" className={cn("-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top", index < words.length - 1 && "mr-[0.25em]")}>
                <motion.div variants={{ hidden: { y: "110%" }, show: { y: "0%" } }} transition={{ duration: slow, ease }} className="inline-block">
                  {word}
                </motion.div>
              </div>
            ))}
          </motion.h2>
        </div>
        <ul className="self-start border-t border-foreground/15 lg:col-span-7">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={index} className="border-b border-foreground/15">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-[clamp(0.5rem,1.4vw,1.25rem)] py-[clamp(1.1rem,1.8vw,1.6rem)] text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/40 lg:grid-cols-[4rem_1fr_auto]"
                >
                  <p className="font-mono text-[length:var(--text-label)] leading-[1.5] text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="min-w-0 text-balance text-[length:var(--text-h3)] leading-[1.1] tracking-[-0.03em] [overflow-wrap:anywhere]">{item.title}</h3>
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[clamp(0.875rem,1.2vw,1.125rem)] shrink-0 self-center" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M1 8h14" />
                    <path d="M8 1v14" className={cn("origin-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", isOpen && "scale-y-0")} />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${id}-${index}`}
                      initial={reduce ? false : { height: 0 }}
                      animate={{ height: "auto" }}
                      exit={reduce ? undefined : { height: 0 }}
                      transition={{ duration: base, ease }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
                        animate={{ clipPath: "inset(0 0 0% 0)" }}
                        transition={{ duration: base, ease }}
                        className="pb-[clamp(1.1rem,1.8vw,1.6rem)] pl-[calc(2.5rem+clamp(0.5rem,1.4vw,1.25rem))] pr-[clamp(2rem,4vw,3rem)] lg:pl-[calc(4rem+clamp(0.5rem,1.4vw,1.25rem))]"
                      >
                        <motion.p
                          initial={reduce ? false : { y: 16, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: base, ease, delay: 0.1 }}
                          className="max-w-[34em] text-[length:var(--text-body)] leading-[1.5] text-muted-foreground"
                        >
                          {item.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqHairlineIndex;
