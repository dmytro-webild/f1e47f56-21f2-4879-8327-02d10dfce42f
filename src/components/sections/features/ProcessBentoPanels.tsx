import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Principle = { title: string; description?: string };

type ProcessBentoPanelsProps = {
  tag?: string;
  title?: string;
  description?: string;
  items?: Principle[];
  ariaLabel?: string;
  className?: string;
};

const defaultItems: Principle[] = [
  { title: "Listen first", description: "We start with your goals, your customers and what is not working yet." },
  { title: "Keep it clear", description: "One idea at a time, said simply, so people understand you fast." },
  { title: "Build to last", description: "Work that holds up as you grow, and that your team can run on its own." },
  { title: "Stay close", description: "A small team, regular check-ins and one person who owns the timeline." },
];

const ProcessBentoPanels = ({
  tag = "03 / Our approach",
  title = "How we work.",
  description = "A few simple principles behind every project.",
  items = defaultItems,
  ariaLabel,
  className,
}: ProcessBentoPanelsProps) => {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();
  const words = title ? title.split(/\s+/) : [];
  const labelSteps = tag.length;

  return (
    <section aria-label={ariaLabel ?? title ?? "Approach"} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="kit-glass mx-auto flex w-[var(--container)] flex-col p-[1.375rem] lg:p-[clamp(2rem,3vw,3rem)]">
        {tag && (
          <motion.p
            initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true }}
            transition={{ duration: labelSteps * 0.02, ease: (t: number) => Math.ceil(t * labelSteps) / labelSteps }}
            className="self-start whitespace-nowrap font-[family-name:var(--font-label)] text-[length:var(--text-label)] uppercase leading-[1.5]"
          >
            {tag}
          </motion.p>
        )}

        <div className="mt-[1.75rem] flex flex-col gap-[1.5rem] lg:mt-[2.5rem] lg:flex-row lg:items-end lg:justify-between lg:gap-[5rem]">
          <h2 className="min-w-0 text-balance text-[length:var(--text-h2)] [overflow-wrap:anywhere]">
            {words.map((word, i) => (
              <Fragment key={i}>
                <div className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                  <motion.div
                    initial={reduce ? false : { y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: kit.base, ease: kit.ease, delay: labelSteps * 0.02 + i * 0.04 }}
                    className="inline-block"
                  >
                    {word}
                  </motion.div>
                </div>
                {i < words.length - 1 && " "}
              </Fragment>
            ))}
          </h2>
          {description && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: "1rem" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
              className="max-w-[18rem] shrink-0 text-balance text-[length:var(--text-body-lg)] leading-[1.3] tracking-[-0.045em]"
            >
              {description}
            </motion.p>
          )}
        </div>

        <ul className="mt-[clamp(1.5rem,3vw,3rem)] grid grid-cols-1 gap-[0.75rem] lg:grid-cols-2 lg:gap-[1rem] xl:grid-cols-4">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: kit.slow, ease: kit.ease, delay: i * 0.08 }}
              className={cn("flex min-h-[15rem] flex-col justify-between gap-[2rem] p-[1.75rem] lg:min-h-[19rem]", i === 0 ? "bg-accent text-accent-foreground" : "kit-card")}
            >
              <p className="font-[family-name:var(--font-label)] text-[length:var(--text-label)] uppercase leading-[1.5]">{`${String(i + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`}</p>
              <div className="flex flex-col gap-[0.75rem]">
                <h3 className="text-balance text-[length:var(--text-h3)] leading-[1.02] [overflow-wrap:anywhere]">{item.title}</h3>
                {item.description && <p className="max-w-[26rem] text-[length:var(--text-body)] leading-[1.5] tracking-[-0.025em] opacity-80">{item.description}</p>}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProcessBentoPanels;
