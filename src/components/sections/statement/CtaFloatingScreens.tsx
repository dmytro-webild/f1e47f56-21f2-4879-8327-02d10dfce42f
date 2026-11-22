import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Button = { text: string; href: string };
type Screen = { imageSrc: string; imageAlt?: string };

type CtaFloatingScreensProps = {
  tag?: string;
  title?: string;
  word?: string;
  primaryButton?: Button;
  secondaryButton?: Button;
  items?: Screen[];
  ariaLabel?: string;
  className?: string;
};

const SLOTS = [
  { l: 6, t: -9, w: 13, rx: 14, ry: 22, rz: -5, fast: false },
  { l: 74, t: -10, w: 14, rx: 10, ry: -24, rz: 6, fast: true },
  { l: 34, t: -6, w: 10, rx: -12, ry: 18, rz: 4, fast: true },
  { l: 3, t: 66, w: 12, rx: 16, ry: 26, rz: 7, fast: true },
  { l: 27, t: 72, w: 15, rx: -10, ry: -20, rz: -4, fast: false },
  { l: 56, t: 78, w: 13, rx: 18, ry: 16, rz: -8, fast: true },
  { l: 84, t: 70, w: 12, rx: -14, ry: -26, rz: 5, fast: false },
  { l: 92, t: 92, w: 10, rx: 12, ry: 20, rz: -6, fast: true },
];

const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

const defaults: Screen[] = [1579708, 1181406, 7991579, 3797991, 9218551, 4219134, 3184465].map((id) => ({ imageSrc: pexels(id) }));

const FloatingScreen = ({ item, index, progress, live }: { item: Screen; index: number; progress: MotionValue<number>; live: boolean }) => {
  const slot = SLOTS[index % SLOTS.length];
  const lap = Math.floor(index / SLOTS.length);
  const fast = lap % 2 === 0 ? slot.fast : !slot.fast;
  const travel = fast ? 220 : 110;
  const y = useTransform(progress, [0, 1], [travel, -travel]);
  const turn = useTransform(progress, [0, 1], [slot.ry - 10, slot.ry + 10]);

  return (
    <motion.div
      style={
        {
          left: `${(slot.l + lap * 7) % 100}%`,
          top: `${slot.t + lap * 9}%`,
          "--w": slot.w,
          ...(live ? { y } : null),
        } as unknown as CSSProperties
      }
      className="absolute w-[calc(var(--w)*2.2vw)] will-change-transform lg:w-[calc(var(--w)*1vw)]"
    >
      <motion.div
        style={{ rotateX: slot.rx, rotateZ: slot.rz, rotateY: live ? turn : slot.ry, transformPerspective: 1400 }}
        className="relative aspect-[4/3] w-full overflow-hidden bg-card"
      >
        <Media src={item.imageSrc} alt={item.imageAlt ?? ""} aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-background/55" />
      </motion.div>
    </motion.div>
  );
};

const CtaButton = ({ button, variant = "primary" }: { button: Button; variant?: "primary" | "secondary" }) => (
  <a
    href={button.href}
    className={cn(
      "group inline-flex min-h-[2.875rem] items-center justify-center gap-[0.75rem] px-[1.75rem] font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] transition-all duration-300",
      variant === "primary" ? "btn-primary" : "btn-secondary"
    )}
  >
    <span className="btn-label font-semibold">{button.text}</span>
    <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="size-[0.8rem] shrink-0 transition-transform duration-300 group-hover:translate-x-[2px]">
      <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  </a>
);

const CtaFloatingScreens = ({
  tag = "11 / Next chapter",
  title = "Have an idea? Let's give it shape.",
  word = "Shape",
  primaryButton = { text: "Start a project", href: "#contact" },
  secondaryButton = { text: "See our work", href: "#work" },
  items = defaults,
  ariaLabel,
  className,
}: CtaFloatingScreensProps) => {
  const ref = useRef<HTMLElement>(null);
  usePreloadImages(ref, "150%");
  const reduce = !!useReducedMotion();
  const live = !reduce;
  const { ease, slow } = useKitMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const run = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const words = title.trim().split(/\s+/);
  const typing = Array.from(tag).length;

  return (
    <section
      ref={ref}
      aria-label={ariaLabel ?? title}
      className={cn("relative overflow-hidden py-[var(--section-space)] text-foreground", className)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 lg:opacity-80">
        {items.map((item, index) => (
          <FloatingScreen key={`${item.imageSrc}-${index}`} item={item} index={index} progress={scrollYProgress} live={live} />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-[var(--container)] gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-12 lg:items-center lg:gap-[var(--gap)]">
        <motion.div
          initial={live ? "hidden" : false}
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
          className="kit-glass flex flex-col gap-[1.75rem] p-[1.375rem] lg:col-span-8 lg:gap-[2.5rem] lg:p-[clamp(2.5rem,4.5vw,4.5rem)]"
        >
          <div className="flex items-center gap-[0.875rem] font-mono text-[length:var(--text-label)] uppercase leading-[1.5] tracking-[var(--label-tracking)]">
            <motion.p
              variants={{ hidden: { clipPath: "inset(0 100% 0 0)" }, shown: { clipPath: "inset(0 0% 0 0)", transition: { duration: typing * 0.02, ease: (t: number) => Math.min(1, Math.ceil(t * typing) / typing) } } }}
              className="whitespace-nowrap"
            >
              {tag}
            </motion.p>
          </div>
          <h2 aria-label={title} className="flex max-w-[11em] flex-wrap gap-x-[0.25em] text-[length:var(--text-h1)]">
            {words.map((w, i) => (
              <div key={`${w}-${i}`} aria-hidden="true" className="overflow-hidden pb-[0.15em] -mb-[0.15em]">
                <motion.div
                  variants={{ hidden: { y: "110%" }, shown: { y: "0%", transition: { duration: slow, ease, delay: typing * 0.012 + i * 0.04 } } }}
                  className="whitespace-nowrap"
                >
                  {w}
                </motion.div>
              </div>
            ))}
          </h2>
          {(primaryButton || secondaryButton) && (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: slow * 0.6, ease, delay: 0.15 } } }}
              className="flex flex-col gap-[1rem] lg:flex-row lg:gap-[1.5rem]"
            >
              {primaryButton && <CtaButton button={primaryButton} variant="primary" />}
              {secondaryButton && <CtaButton button={secondaryButton} variant="secondary" />}
            </motion.div>
          )}
        </motion.div>
      </div>

      {word && (
        <div
          aria-hidden="true"
          className="relative z-0 mt-[clamp(1.5rem,3vw,3rem)] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]"
        >
          <motion.div style={live ? { x: run } : undefined} className="flex w-max gap-[0.4em] whitespace-nowrap text-[length:calc(var(--text-display)*1.4)] uppercase leading-[1] tracking-[var(--heading-tracking)] text-foreground/15 will-change-transform">
            {Array.from({ length: 6 }, (_, i) => (
              <p key={i}>{`${word} ·`}</p>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default CtaFloatingScreens;
