import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import HorizontalScrollSection from "@/components/animation/HorizontalScrollSection";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";
import { useKitMotion, type KitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Work = { title: string; category: string; description?: string; imageSrc: string; imageAlt?: string };

type GalleryWordPanelsProps = {
  label?: string;
  title?: string;
  items?: Work[];
  ariaLabel?: string;
  className?: string;
};

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const DEFAULT_ITEMS: Work[] = [
  { title: "Halden", category: "Digital product", description: "A banking app for freelancers, built around one clear number. Positioning, interface and launch site.", imageSrc: px(3861969), imageAlt: "Laptop showing a dashboard" },
  { title: "Fjord", category: "Culture and fashion", description: "An editorial voice for an independent label. Art direction, type and a responsive shop.", imageSrc: px(1181467), imageAlt: "Working at a laptop" },
  { title: "Marlo", category: "Brand identity", description: "A new name and mark for a coffee roaster with three cafes. Identity, packaging and signage.", imageSrc: px(6476589), imageAlt: "Brand identity sketches" },
  { title: "Vinter", category: "Architecture", description: "Letting a small practice speak through space and light. Visual direction and a project-led site.", imageSrc: px(1029757), imageAlt: "Bright office interior" },
];

const COPIES = 4;

function Header({ label, title, kit, reduce }: { label: string; title: string; kit: KitMotion; reduce: boolean | null }) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const steps = Math.max(1, label.length);
  const typed = steps * 0.02;
  return (
    <div className="flex flex-col gap-[1.5rem] lg:flex-row lg:items-end lg:justify-between lg:gap-[var(--gap)]">
      <div className="flex min-w-0 flex-col gap-[1.75rem] lg:gap-[2.5rem]">
        {label && (
          <div className="flex items-center gap-[14px] font-mono text-[length:var(--text-label)] uppercase leading-[1.5]">
            {label && (
              <motion.p
                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: typed, ease: (t: number) => Math.floor(t * steps) / steps }}
                className="whitespace-nowrap text-foreground"
              >
                {label}
              </motion.p>
            )}
          </div>
        )}
        {words.length > 0 && (
          <h2 aria-label={title} className="max-w-[14em] text-balance text-[length:var(--text-h2)] leading-none tracking-[-0.045em]">
            {words.map((word, i) => (
              <div key={i} aria-hidden="true" className="mr-[0.25em] -mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top last:mr-0">
                <motion.div
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: kit.slow, ease: kit.ease, delay: typed * 0.5 + i * 0.04 }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </h2>
        )}
      </div>
    </div>
  );
}

function Panel({ item, index, total, x, kit, reduce }: { item: Work; index: number; total: number; x: MotionValue<number>; kit: KitMotion; reduce: boolean | null }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const geo = useRef({ base: 0, width: 1, view: 1 });
  const red = index % 2 === 1;
  const dir = index % 2 === 0 ? 1 : -1;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const rect = row.getBoundingClientRect();
      geo.current = { base: rect.left - x.get(), width: rect.width || 1, view: window.innerWidth || 1 };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [x]);

  const offset = (v: number) => {
    const { base, width, view } = geo.current;
    return base + v + width / 2 - view / 2;
  };
  const wordX = useTransform(x, (v) => -offset(v) * 0.4 * dir);
  const wordOpacity = useTransform(x, (v) => 0.15 + 0.85 * Math.max(0, 1 - Math.abs(offset(v)) / (geo.current.view * 0.5)));

  const number = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <article className="h-[max(20rem,calc(100svh-30rem))] w-[100vw] px-[var(--gutter)] lg:h-[max(24rem,calc(100svh-18rem))]">
      <div
        className={cn(
          "grid size-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden p-[var(--gutter)]",
          red ? "border border-accent bg-[var(--accent-glass)] text-accent-foreground backdrop-blur-[10px] lg:backdrop-blur-[16px]" : "kit-glass",
        )}
      >
        <div className="flex items-start justify-between gap-6 font-mono text-[length:var(--text-label)] uppercase leading-[1.5]">
          <p className="min-w-0 truncate">
            {number} / {item.category}
          </p>
          <p className="whitespace-nowrap">
            {number} / {count}
          </p>
        </div>

        <div
          ref={rowRef}
          aria-hidden="true"
          className="relative flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <motion.div
            style={reduce ? undefined : { x: wordX, opacity: wordOpacity }}
            className="absolute left-1/2 top-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 items-center gap-[0.22em] whitespace-nowrap text-[length:min(clamp(4.5rem,16vw,16rem),24svh)] leading-none tracking-[-0.065em] will-change-transform"
          >
            {Array.from({ length: COPIES }, (_, i) => (
              <div key={i} className="flex items-center gap-[0.22em]">
                <p>{item.title}</p>
                <div className="size-[0.13em] rounded-full bg-current" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 flex items-end justify-between gap-[var(--gap)]">
          <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.2 }} className="w-[clamp(8.5rem,17vw,16rem)] shrink-0">
            <motion.div
              variants={reduce ? undefined : { hidden: { clipPath: "inset(100% 0 0 0)" }, shown: { clipPath: "inset(0% 0 0 0)" } }}
              transition={{ duration: kit.slow, ease: kit.ease }}
            >
              <motion.div variants={reduce ? undefined : { hidden: { scale: 1.08 }, shown: { scale: 1 } }} transition={{ duration: kit.slow, ease: kit.ease }}>
                <ImageScrollParallax imageSrc={item.imageSrc} imageAlt={item.imageAlt ?? item.title} strength={0.1} className="rounded-none" />
              </motion.div>
            </motion.div>
          </motion.div>
          {item.description && (
            <p className="max-w-[25rem] text-balance text-[length:var(--text-small)] leading-[1.5] opacity-80 lg:text-[length:var(--text-body)]">{item.description}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function GalleryWordPanels({
  label = "04 / Selected work",
  title = "Ideas out in the world.",
  items = DEFAULT_ITEMS,
  ariaLabel,
  className,
}: GalleryWordPanelsProps) {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const x = useMotionValue(0);

  return (
    <section aria-label={ariaLabel ?? "Selected work"} className={cn("relative overflow-x-clip text-foreground", className)}>
      <HorizontalScrollSection
        compact
        progress={false}
        x={x}
        header={<Header label={label} title={title} kit={kit} reduce={reduce} />}
        headerClassName="w-[var(--container)] max-w-none px-0"
        trackClassName="gap-0 px-0 md:gap-0"
        className="py-0"
      >
        {items.map((item, index) => (
          <Panel key={index} item={item} index={index} total={items.length} x={x} kit={kit} reduce={reduce} />
        ))}
      </HorizontalScrollSection>
    </section>
  );
}
