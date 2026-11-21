import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useImageReady, useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Review = { quote: string; name: string; role?: string; imageSrc: string; imageAlt?: string };

type TestimonialPortraitQuoteProps = {
  label?: string;
  title?: string;
  items?: Review[];
  ariaLabel?: string;
  className?: string;
};

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

const DEFAULT_ITEMS: Review[] = [
  { quote: "Ostra found the idea at the heart of our product and gave it a calm, distinctive voice. Every screen now feels considered and easy to use.", name: "Mara Voss", role: "Founder, Halden", imageSrc: px(3851165), imageAlt: "Portrait of Mara Voss" },
  { quote: "They listened for weeks before drawing a single line. The identity they made still feels right three years and two new cafes later.", name: "Jonas Reid", role: "Owner, Marlo Coffee", imageSrc: px(8327756), imageAlt: "Portrait of Jonas Reid" },
  { quote: "Our new site finally shows the work the way we see it. Enquiries doubled in the first season and the team loves updating it.", name: "Sanne Bakker", role: "Partner, Vinter Architects", imageSrc: px(14055666), imageAlt: "Portrait of Sanne Bakker" },
];

const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={cn("size-[18px]", flip && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 10h14M11 4l6 6-6 6" />
  </svg>
);

export default function TestimonialPortraitQuote({
  label = "08 / Client words",
  title = "Built side by side.",
  items = DEFAULT_ITEMS,
  ariaLabel,
  className,
}: TestimonialPortraitQuoteProps) {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: items.length > 1, duration: 30 });
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "150%");
  const [current, setCurrent] = useState(0);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitInView = useInView(portraitRef, { once: true, amount: 0.3 });
  const portraitReady = useImageReady(portraitRef, portraitInView);

  const sync = useCallback(() => {
    if (emblaApi) setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, sync]);

  useEffect(() => {
    items.forEach((item) => {
      const img = new Image();
      img.src = item.imageSrc;
    });
  }, [items]);

  const words = title.trim().split(/\s+/).filter(Boolean);
  const steps = Math.max(1, label.length);
  const typed = steps * 0.02;
  const active = items[current] ?? items[0];
  const pad = (n: number) => String(n).padStart(2, "0");

  if (!items.length) return null;

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? "Testimonials"} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="kit-glass mx-auto flex w-[var(--container)] flex-col p-[1.375rem] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        {label && (
          <div className="flex items-center gap-[14px] font-mono text-[length:var(--text-label)] uppercase leading-[1.5]">
            {label && (
              <motion.p
                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: typed, ease: (t: number) => Math.floor(t * steps) / steps }}
                className="whitespace-nowrap"
              >
                {label}
              </motion.p>
            )}
          </div>
        )}
        {words.length > 0 && (
          <h2 aria-label={title} className="mt-[1.75rem] max-w-[14em] text-balance text-[length:var(--text-h2)] leading-none tracking-[-0.045em] lg:mt-[2.5rem]">
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

        <div className="mt-[clamp(1.5rem,3vw,3rem)] grid grid-cols-1 gap-[1.5rem] lg:grid-cols-[clamp(12rem,19.5vw,17.5rem)_minmax(0,1fr)] lg:gap-[clamp(3rem,6vw,6rem)]">

          <motion.div ref={portraitRef} initial="hidden" animate={portraitInView && portraitReady ? "shown" : "hidden"} className="w-[clamp(8.75rem,36vw,12rem)] lg:order-1 lg:w-full">
            <motion.div
              variants={reduce ? undefined : { hidden: { clipPath: "inset(100% 0 0 0)" }, shown: { clipPath: "inset(0% 0 0 0)" } }}
              transition={{ duration: kit.slow, ease: kit.ease }}
              className="relative aspect-square w-full overflow-hidden"
            >
            <AnimatePresence initial={false}>
              <motion.div
                key={current}
                initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 1, transition: { duration: kit.slow } }}
                transition={{ duration: kit.slow, ease: kit.ease }}
                className="absolute inset-0"
              >
                <MotionMedia
                  src={active.imageSrc}
                  alt={active.imageAlt ?? active.name}
                  loading="eager"
                  decoding="async"
                  initial={reduce ? false : { scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: kit.slow, ease: kit.ease }}
                  className="size-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            </motion.div>
          </motion.div>

          <div ref={emblaRef} className="min-w-0 cursor-grab overflow-hidden active:cursor-grabbing lg:order-3">
            <div className="flex">
              {items.map((item, index) => {
                const on = index === current;
                const lines = item.quote.trim().split(/\s+/);
                return (
                  <figure key={index} aria-roledescription="slide" aria-label={`${index + 1} of ${items.length}`} className="min-w-0 shrink-0 grow-0 basis-full">
                    <blockquote aria-label={item.quote} className="text-balance text-[length:clamp(1.375rem,0.9rem+1.9vw,2.375rem)] leading-[1.18] tracking-[-0.035em]">
                      {lines.map((word, i) => (
                        <div key={i} aria-hidden="true" className="mr-[0.25em] -mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top last:mr-0">
                          <motion.div
                            initial={false}
                            animate={reduce || on ? { y: "0%" } : { y: "-110%" }}
                            transition={{ duration: on ? kit.base : kit.fast, ease: kit.ease, delay: on ? 0.2 + i * 0.012 : 0 }}
                          >
                            {word}
                          </motion.div>
                        </div>
                      ))}
                    </blockquote>
                    <figcaption className="mt-[1.75rem] flex flex-col gap-[4px]">
                      <p className="text-[length:var(--text-body)] leading-[1.5]">{item.name}</p>
                      {item.role && <p className="font-mono text-[length:var(--text-label)] leading-[1.5] text-muted-foreground">{item.role}</p>}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-[2rem] flex items-center justify-between gap-6 border-t border-border pt-[20px]">
          <p className="whitespace-nowrap font-mono text-[length:var(--text-label)] leading-[1.5]">
            {pad(current + 1)} / {pad(items.length)}
          </p>
          {items.length > 1 && (
            <div className="flex gap-[12px]">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => emblaApi?.scrollPrev()}
                className="flex size-[48px] items-center justify-center rounded-full border border-foreground/30 transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <Arrow flip />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => emblaApi?.scrollNext()}
                className="flex size-[48px] items-center justify-center rounded-full border border-foreground/30 transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <Arrow />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
