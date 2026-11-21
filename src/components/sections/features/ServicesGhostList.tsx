import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Service = { title: string; description?: string; button?: { text: string; href: string } };

type ServicesGhostListProps = {
  tag?: string;
  items?: Service[];
  description?: string;
  ariaLabel?: string;
  className?: string;
};

const ServiceRow = ({ item, index }: { item: Service; index: number }) => {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const solid = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.7], [0.15, 1, 1, 0.15], { clamp: true });
  const detail = useTransform(scrollYProgress, [0.36, 0.46, 0.54, 0.64], [0, 1, 1, 0], { clamp: true });
  const rise = useTransform(detail, [0, 1], ["0.75rem", "0rem"]);

  return (
    <li ref={ref} className="border-b border-foreground/15 py-[clamp(1rem,1.7vw,1.5rem)]">
      <div className="flex items-baseline gap-[clamp(0.75rem,1.4vw,1.25rem)]">
        <p className="w-[2ch] shrink-0 font-mono text-[length:var(--text-label)] leading-[1.15] text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
        <motion.h3
          style={reduce ? undefined : { opacity: solid }}
          className="min-w-0 text-[length:min(var(--text-h1),11cqi)] leading-[1.05] tracking-[-0.06em] [overflow-wrap:anywhere]"
        >
          {item.title}
        </motion.h3>
      </div>
      {(item.description || item.button) && (
        <motion.div
          style={reduce ? undefined : { opacity: detail, y: rise }}
          className="mt-3 flex flex-col items-start gap-4 pl-[calc(2ch+clamp(0.75rem,1.4vw,1.25rem))] lg:flex-row lg:items-baseline lg:justify-between lg:gap-[var(--gap)]"
        >
          {item.description && <p className="max-w-[30em] text-[length:var(--text-body)] leading-[1.45] text-muted-foreground">{item.description}</p>}
          {item.button && (
            <a href={item.button.href} className="btn-link shrink-0 gap-3">
              <p className="whitespace-nowrap">{item.button.text}</p>
              <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M3 9l6-6M4 3h5v5" />
              </svg>
            </a>
          )}
        </motion.div>
      )}
    </li>
  );
};

const ServicesGhostList = ({
  tag = "05 / Services",
  items = [
    { title: "Brand strategy", description: "Positioning, naming and a story your whole team can tell the same way." },
    { title: "Visual identity", description: "Logo, type, colour and a system that holds from a favicon to a billboard." },
    { title: "Web design", description: "Sites designed around one clear idea, page by page and state by state." },
    { title: "Development", description: "Fast, accessible builds your team can edit without calling us." },
    { title: "Motion", description: "Movement that explains the product and gives the brand a pulse." },
  ],
  description = "One connected process. A clear deliverable at every stage.",
  ariaLabel,
  className,
}: ServicesGhostListProps) => {
  const reduce = useReducedMotion();
  const typing = (tag?.length ?? 0) * 0.02;

  return (
    <section
      aria-label={ariaLabel ?? tag ?? "Services"}
      className={cn("relative py-[var(--section-space)] text-foreground", className)}
    >
      <div className="kit-glass mx-auto flex w-[var(--container)] flex-col gap-[clamp(1.5rem,3vw,3rem)] p-[1.375rem] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
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
        <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
          <ul className="border-t border-foreground/15 [container-type:inline-size]">
            {items.map((item, index) => (
              <ServiceRow key={index} item={item} index={index} />
            ))}
          </ul>
          {description && <p className="max-w-[32em] text-[length:var(--text-body)] leading-[1.45] text-muted-foreground">{description}</p>}
        </div>
      </div>
    </section>
  );
};

export default ServicesGhostList;
