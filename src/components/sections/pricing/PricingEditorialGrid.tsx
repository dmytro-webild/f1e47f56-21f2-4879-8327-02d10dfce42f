import { useState, useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, ArrowUpRight, ShieldCheck, Clock, RefreshCw, FileText, Layers, Sparkles, Crown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  exclusive?: boolean;
  originalPrice?: string;
  price: string;
  renewal: string;
  pages: string;
  revisions: string;
  duration: string;
  warranty: string;
  features: string[];
  waUrl: string;
};

export type PricingAddon = {
  title: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  waUrl: string;
};

export type PricingEditorialGridProps = {
  tag?: string;
  title?: string;
  description?: string;
  tiers?: PricingTier[];
  addon?: PricingAddon;
  className?: string;
};

const DEFAULT_TIERS: PricingTier[] = [
  {
    id: "silver",
    name: "Silver",
    tagline: "Essential Digital Presence",
    popular: false,
    price: "Rp700.000",
    renewal: "Renewal Rp599.000/tahun",
    pages: "1 Halaman",
    revisions: "2x Revisi",
    duration: "5–7 Hari",
    warranty: "Garansi Bug 7 Hari",
    features: [
      "Domain & hosting (.com / .id)",
      "Landing page interaktif & responsif",
      "Desain adaptif mobile & desktop",
      "Seksi Hero, About, Products & Contact",
      "Integrasi WhatsApp & Instagram",
      "Integrasi Google Maps",
      "Fondasi basic SEO",
      "Favicon & branding dasar",
      "Siap rilis & deployment",
    ],
    waUrl: "https://wa.me/6283836114515?text=Halo%20VEYRO%20STUDIO%2C%20saya%20tertarik%20dengan%20paket%20Silver",
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Professional Business Website",
    popular: true,
    originalPrice: "Rp1.700.000",
    price: "Rp1.499.000",
    renewal: "Renewal Rp999.000/tahun",
    pages: "Hingga 5 Halaman",
    revisions: "3x Revisi",
    duration: "10–14 Hari",
    warranty: "Garansi Bug 14 Hari",
    features: [
      "Domain & hosting (.com / .id)",
      "1 Artikel SEO ",
      "Desain UI/UX Kustom eksklusif",
      "Galeri foto / karya interaktif",
      "Formulir kontak fungsional",
      "Integrasi media sosial lengkap",
      "Integrasi Google Maps",
      "Fondasi basic SEO",
      "Navigasi multi-halaman mulus",
      "Animasi gulir (scroll animations)",
      "Siap rilis & deployment",
    ],
    waUrl: "https://wa.me/6283836114515?text=Halo%20VEYRO%20STUDIO%2C%20saya%20tertarik%20dengan%20paket%20Gold",
  },
  {
    id: "platinum",
    name: "Platinum",
    tagline: "Advanced Digital Experience",
    popular: false,
    exclusive: true,
    price: "Rp2.500.000",
    renewal: "Renewal Rp1.500.000/tahun",
    pages: "Hingga 8 Halaman",
    revisions: "5x Revisi",
    duration: "10–25 Hari",
    warranty: "Garansi Bug 30 Hari",
    features: [
      "Domain & hosting (.com / .id)",
      "1 Artikel SEO lanjutan (advanced)",
      "Desain UI/UX Kustom tingkat lanjut",
      "Fondasi Advanced SEO",
      "Open Graph, Sitemap & Robots.txt",
      "Animasi kustom & Parallax motion",
      "Interaktif 3D (jika didukung)",
      "Fungsionalitas kustom spesifik bisnis",
      "Optimasi performa & kecepatan tinggi",
      "Dukungan & komunikasi prioritas",
    ],
    waUrl: "https://wa.me/6283836114515?text=Halo%20VEYRO%20STUDIO%2C%20saya%20tertarik%20dengan%20paket%20Platinum",
  },
];

const DEFAULT_ADDON: PricingAddon = {
  title: "Additional SEO Article",
  price: "Rp50.000",
  unit: "/artikel",
  description: "Tambahan artikel SEO berkualitas tinggi untuk mendongkrak visibilitas bisnis Anda di pencarian Google.",
  features: [
    "Struktur heading terorganisir (H1, H2, H3)",
    "Meta title & meta description teroptimasi",
    "Konten ramah SEO & relevan dengan audiens target",
  ],
  waUrl: "https://wa.me/6283836114515?text=Halo%20VEYRO%20STUDIO%2C%20saya%20tertarik%20dengan%20Add-on%20Artikel%20SEO",
};

export default function PricingEditorialGrid({
  tag = "05 / PAKET & INVESTASI",
  title = "Investasi Transparan untuk Pertumbuhan Bisnis",
  description = "Setiap paket mencakup desain profesional, fondasi SEO kuat, serta dukungan garansi pasca-rilis tanpa biaya tersembunyi.",
  tiers = DEFAULT_TIERS,
  addon = DEFAULT_ADDON,
  className,
}: PricingEditorialGridProps) {
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>({
    gold: false,
    platinum: true,
  });
  const reduce = useReducedMotion();
  const id = useId();

  const toggleExpand = (tierId: string) => {
    setExpandedTiers((prev) => ({
      ...prev,
      [tierId]: !prev[tierId],
    }));
  };

  const typing = (tag?.length ?? 0) * 0.02;

  return (
    <section
      id="pricing"
      aria-label={title}
      className={cn("relative py-[var(--section-space)] text-[#202722]", className)}
    >
      <div className="mx-auto flex w-[var(--container)] flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          {tag && (
            <div className="flex items-center gap-2 font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-[#466B55]">
              <motion.p
                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: typing, ease: "linear" }}
              >
                {tag}
              </motion.p>
            </div>
          )}

          <h2 className="text-[length:var(--text-h2)] font-serif leading-[1.05] text-[#202722]">
            {title}
          </h2>

          {description && (
            <p className="text-[length:var(--text-body)] text-[#3D4B42] leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => {
            const isExpanded = !!expandedTiers[tier.id];
            const isPopular = !!tier.popular;
            const isPlatinum = tier.id === "platinum" || !!tier.exclusive;

            return (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col justify-between transition-all duration-300 p-6 sm:p-8 h-full border",
                  isPlatinum
                    ? "bg-[#183126] text-[#F6F5F0] border-2 border-[#A7B9A5]/50 hover:border-[#A7B9A5] shadow-xl lg:-translate-y-2 ring-1 ring-[#A7B9A5]/20"
                    : isPopular
                    ? "bg-[#263F35] text-[#F6F5F0] border border-[#3D5A4B] shadow-md hover:border-[#A7B9A5]/60"
                    : "bg-[#F6F5F0] text-[#202722] border border-[#D9E0D6] hover:border-[#A7B9A5]"
                )}
              >
                {/* Header Badge & Name */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span
                      className={cn(
                        "font-mono text-[length:var(--text-label)] uppercase tracking-wider font-medium",
                        isPlatinum
                          ? "text-[#A7B9A5]"
                          : isPopular
                          ? "text-[#A7B9A5]"
                          : "text-[#466B55]"
                      )}
                    >
                      {tier.tagline}
                    </span>

                    {isPlatinum ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A7B9A5]/20 text-[#A7B9A5] border border-[#A7B9A5]/40 font-mono text-[11px] uppercase tracking-wider font-semibold">
                        <Crown className="size-3 text-[#A7B9A5]" />
                        Pilihan Eksklusif
                      </span>
                    ) : isPopular ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#466B55] text-[#F6F5F0] font-mono text-[11px] uppercase tracking-wider font-medium">
                        <Sparkles className="size-3 text-[#A7B9A5]" />
                        Most Popular
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3
                      className={cn(
                        "font-serif mb-2 tracking-tight",
                        isPlatinum
                          ? "text-[length:var(--text-h3)] text-[#F6F5F0] font-bold"
                          : "text-[length:var(--text-h3)]"
                      )}
                    >
                      {tier.name}
                    </h3>
                  </div>

                  {/* Price Block */}
                  <div
                    className={cn(
                      "mt-4 pb-6 border-b",
                      isPlatinum
                        ? "border-[#A7B9A5]/25"
                        : isPopular
                        ? "border-[#F6F5F0]/15"
                        : "border-[#D9E0D6]"
                    )}
                  >
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {tier.originalPrice && (
                        <span
                          className={cn(
                            "line-through font-mono text-sm",
                            isPlatinum || isPopular ? "text-[#A7B9A5]" : "text-[#3D4B42]"
                          )}
                        >
                          {tier.originalPrice}
                        </span>
                      )}
                      <span
                        className={cn(
                          "font-serif font-bold tracking-tight",
                          isPlatinum
                            ? "text-4xl sm:text-5xl text-[#F6F5F0]"
                            : "text-3xl sm:text-4xl font-medium"
                        )}
                      >
                        {tier.price}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-1.5 mt-2 font-mono text-xs",
                        isPlatinum || isPopular ? "text-[#A7B9A5]" : "text-[#466B55]"
                      )}
                    >
                      <RefreshCw className="size-3 shrink-0" />
                      <span>{tier.renewal}</span>
                    </div>
                  </div>

                  {/* Visible Key Highlights */}
                  <div
                    className={cn(
                      "py-6 border-b space-y-3 font-sans text-sm",
                      isPlatinum
                        ? "border-[#A7B9A5]/25"
                        : isPopular
                        ? "border-[#F6F5F0]/15"
                        : "border-[#D9E0D6]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers
                        className={cn(
                          "size-4 shrink-0",
                          isPlatinum || isPopular ? "text-[#A7B9A5]" : "text-[#466B55]"
                        )}
                      />
                      <span className={cn("font-medium", isPlatinum && "text-[#F6F5F0]")}>
                        {tier.pages}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FileText
                        className={cn(
                          "size-4 shrink-0",
                          isPlatinum || isPopular ? "text-[#A7B9A5]" : "text-[#466B55]"
                        )}
                      />
                      <span className={isPlatinum ? "text-[#F6F5F0]" : undefined}>
                        {tier.revisions}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock
                        className={cn(
                          "size-4 shrink-0",
                          isPlatinum || isPopular ? "text-[#A7B9A5]" : "text-[#466B55]"
                        )}
                      />
                      <span className={isPlatinum ? "text-[#F6F5F0]" : undefined}>
                        Estimasi {tier.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck
                        className={cn(
                          "size-4 shrink-0",
                          isPlatinum || isPopular ? "text-[#A7B9A5]" : "text-[#466B55]"
                        )}
                      />
                      <span className={isPlatinum ? "text-[#F6F5F0]" : undefined}>
                        {tier.warranty}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Features Accordion */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleExpand(tier.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`${id}-${tier.id}`}
                      className={cn(
                        "w-full flex items-center justify-between py-2 text-xs font-mono uppercase tracking-wider transition-colors",
                        isPlatinum
                          ? "text-[#A7B9A5] hover:text-[#F6F5F0]"
                          : isPopular
                          ? "text-[#A7B9A5] hover:text-[#F6F5F0]"
                          : "text-[#466B55] hover:text-[#263F35]"
                      )}
                    >
                      <span>
                        {isExpanded ? "Sembunyikan Rincian Fitur" : "View Details (Fitur Lengkap)"}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-300",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.ul
                          id={`${id}-${tier.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                          className="overflow-hidden pt-3 space-y-2.5 text-xs sm:text-sm"
                        >
                          {tier.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 leading-snug">
                              <Check
                                className={cn(
                                  "size-3.5 mt-0.5 shrink-0",
                                  isPlatinum || isPopular ? "text-[#A7B9A5]" : "text-[#466B55]"
                                )}
                              />
                              <span
                                className={
                                  isPlatinum
                                    ? "text-[#F6F5F0]"
                                    : isPopular
                                    ? "text-[#F6F5F0]/90"
                                    : "text-[#3D4B42]"
                                }
                              >
                                {feature}
                              </span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* WhatsApp CTA Button */}
                <div className="pt-6">
                  <a
                    href={tier.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 font-sans font-medium text-sm transition-all duration-200 group",
                      isPlatinum
                        ? "bg-[#F6F5F0] text-[#183126] font-semibold hover:bg-[#A7B9A5] hover:text-[#183126] shadow-md"
                        : isPopular
                        ? "bg-[#F6F5F0] text-[#263F35] hover:bg-[#E8EDE5]"
                        : "bg-[#263F35] text-[#F6F5F0] hover:bg-[#466B55]"
                    )}
                  >
                    <span>Pilih Paket {tier.name}</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-on Banner Card */}
        {addon && (
          <div className="p-6 sm:p-8 bg-[#E8EDE5] border border-[#D9E0D6] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs uppercase tracking-wider px-2.5 py-0.5 bg-[#263F35] text-[#F6F5F0]">
                  Layanan Add-on
                </span>
                <h4 className="text-xl font-serif text-[#202722]">
                  {addon.title}
                </h4>
              </div>

              <div className="flex items-baseline gap-1 font-mono text-base font-semibold text-[#263F35]">
                <span>{addon.price}</span>
                <span className="text-xs text-[#3D4B42] font-normal">{addon.unit}</span>
              </div>

              <p className="text-sm text-[#3D4B42] leading-relaxed">
                {addon.description}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2 text-xs text-[#3D4B42]">
                {addon.features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-[#466B55] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={addon.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 bg-[#263F35] text-[#F6F5F0] hover:bg-[#466B55] transition-colors text-sm font-medium group whitespace-nowrap"
              >
                <span>Tambah Artikel SEO</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
