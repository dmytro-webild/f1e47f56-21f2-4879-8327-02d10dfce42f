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
    price: "700K",
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
    waUrl: "https://wa.me/6285930134439?text=Halo%20Fasya's%20Digital%20Agency%2C%20saya%20tertarik%20dengan%20paket%20Silver",
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Professional Business Website",
    popular: true,
    price: "1.4M",
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
    waUrl: "https://wa.me/6285930134439?text=Halo%20Fasya's%20Digital%20Agency%2C%20saya%20tertarik%20dengan%20paket%20Gold",
  },
  {
    id: "platinum",
    name: "Platinum",
    tagline: "Advanced Digital Experience",
    popular: false,
    exclusive: true,
    price: "2.5M",
    renewal: "Renewal Rp1.500.000/tahun",
    pages: "Hingga 8 Halaman",
    revisions: "5x Revisi",
    duration: "5–10 Hari",
    warranty: "Garansi Bug 30 Hari",
    features: [
      "Domain & hosting (.com / .id)",
      "",
      "Desain UI/UX Kustom tingkat lanjut",
      "Fondasi Advanced SEO",
      "Open Graph, Sitemap & Robots.txt",
      "Animasi kustom & Parallax motion",
      "Interaktif 3D (jika didukung)",
      "Fungsionalitas kustom spesifik bisnis",
      "Optimasi performa & kecepatan tinggi",
      "Dukungan & komunikasi prioritas",
    ],
    waUrl: "https://wa.me/6285930134439?text=Halo%20Fasya's%20Digital%20Agency%2C%20saya%20tertarik%20dengan%20paket%20Platinum",
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
  waUrl: "https://wa.me/6285930134439?text=Halo%20Fasya's%20Digital%20Agency%2C%20saya%20tertarik%20dengan%20Add-on%20Artikel%20SEO",
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
            const isGold = tier.id === "gold" || !!tier.popular;
            const isPlatinum = tier.id === "platinum" || !!tier.exclusive;

            return (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col justify-between transition-all duration-300 p-6 sm:p-8 h-full border-2",
                  isPlatinum
                    ? "bg-gradient-to-b from-[#251638]/90 via-[#1E122E]/85 to-[#170E24]/90 backdrop-blur-md text-[#FAF5FF] border-[#A855F7]/70 hover:border-[#C084FC] shadow-xl ring-1 ring-[#A855F7]/30"
                    : isGold
                    ? "bg-gradient-to-b from-[#2A200F]/90 via-[#231B0C]/85 to-[#1E170A]/90 backdrop-blur-md text-[#FFFBEB] border-[#F59E0B]/70 hover:border-[#FBBF24] shadow-xl lg:-translate-y-2 ring-1 ring-[#F59E0B]/30"
                    : "bg-gradient-to-b from-[#F8FAFC]/85 to-[#E2E8F0]/80 backdrop-blur-md text-[#0F172A] border-[#CBD5E1] hover:border-[#94A3B8] shadow-md"
                )}
              >
                {/* Header Badge & Name */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span
                      className={cn(
                        "font-mono text-[length:var(--text-label)] uppercase tracking-wider font-medium",
                        isPlatinum
                          ? "text-[#C084FC]"
                          : isGold
                          ? "text-[#FBBF24]"
                          : "text-[#475569]"
                      )}
                    >
                      {tier.tagline}
                    </span>

                    {isPlatinum ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A855F7]/25 text-[#D8B4FE] border border-[#A855F7]/50 font-mono text-[11px] uppercase tracking-wider font-semibold">
                        <Crown className="size-3 text-[#C084FC]" />
                        Pilihan Eksklusif
                      </span>
                    ) : isGold ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F59E0B] text-[#1E170A] font-mono text-[11px] uppercase tracking-wider font-semibold">
                        <Sparkles className="size-3 text-[#1E170A]" />
                        Most Popular
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3
                      className={cn(
                        "font-serif font-bold text-[length:var(--text-h3)] tracking-tight mb-2",
                        isPlatinum
                          ? "text-[#FAF5FF]"
                          : isGold
                          ? "text-[#FFFBEB]"
                          : "text-[#0F172A]"
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
                        ? "border-[#A855F7]/25"
                        : isGold
                        ? "border-[#F59E0B]/25"
                        : "border-[#CBD5E1]"
                    )}
                  >
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {tier.originalPrice && (
                        <span
                          className={cn(
                            "line-through font-mono text-sm",
                            isPlatinum
                              ? "text-[#E9D5FF]/80"
                              : isGold
                              ? "text-[#FCD34D]/80"
                              : "text-[#64748B]"
                          )}
                        >
                          {tier.originalPrice}
                        </span>
                      )}
                      <span className="font-serif font-bold text-3xl sm:text-4xl tracking-tight text-[#0F172A]">
                        {tier.price}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-1.5 mt-2 font-mono text-xs",
                        isPlatinum
                          ? "text-[#D8B4FE]"
                          : isGold
                          ? "text-[#FCD34D]"
                          : "text-[#475569]"
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
                        ? "border-[#A855F7]/25"
                        : isGold
                        ? "border-[#F59E0B]/25"
                        : "border-[#CBD5E1]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers
                        className={cn(
                          "size-4 shrink-0",
                          isPlatinum ? "text-[#C084FC]" : isGold ? "text-[#F59E0B]" : "text-[#475569]"
                        )}
                      />
                      <span className={cn("font-medium", isPlatinum ? "text-[#FAF5FF]" : isGold ? "text-[#FFFBEB]" : "text-[#0F172A]")}>
                        {tier.pages}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FileText
                        className={cn(
                          "size-4 shrink-0",
                          isPlatinum ? "text-[#C084FC]" : isGold ? "text-[#F59E0B]" : "text-[#475569]"
                        )}
                      />
                      <span className={isPlatinum ? "text-[#FAF5FF]" : isGold ? "text-[#FFFBEB]" : "text-[#1E293B]"}>
                        {tier.revisions}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock
                        className={cn(
                          "size-4 shrink-0",
                          isPlatinum ? "text-[#C084FC]" : isGold ? "text-[#F59E0B]" : "text-[#475569]"
                        )}
                      />
                      <span className={isPlatinum ? "text-[#FAF5FF]" : isGold ? "text-[#FFFBEB]" : "text-[#1E293B]"}>
                        Estimasi {tier.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck
                        className={cn(
                          "size-4 shrink-0",
                          isPlatinum ? "text-[#C084FC]" : isGold ? "text-[#F59E0B]" : "text-[#475569]"
                        )}
                      />
                      <span className={isPlatinum ? "text-[#FAF5FF]" : isGold ? "text-[#FFFBEB]" : "text-[#1E293B]"}>
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
                          ? "text-[#D8B4FE] hover:text-[#FAF5FF]"
                          : isGold
                          ? "text-[#FCD34D] hover:text-[#FFFBEB]"
                          : "text-[#475569] hover:text-[#0F172A]"
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
                          className="overflow-hidden pt-3 space-y-2.5 text-xs sm:text-sm font-sans"
                        >
                          {tier.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 leading-snug">
                              <Check
                                className={cn(
                                  "size-3.5 mt-0.5 shrink-0",
                                  isPlatinum ? "text-[#C084FC]" : isGold ? "text-[#F59E0B]" : "text-[#475569]"
                                )}
                              />
                              <span
                                className={
                                  isPlatinum
                                    ? "text-[#F3E8FF]/90"
                                    : isGold
                                    ? "text-[#FEF3C7]/90"
                                    : "text-[#334155]"
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
                      "w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 font-sans font-semibold text-sm transition-all duration-200 group shadow-md",
                      isPlatinum
                        ? "bg-[#A855F7] text-[#FAF5FF] hover:bg-[#9333EA]"
                        : isGold
                        ? "bg-[#F59E0B] text-[#1E170A] hover:bg-[#FBBF24]"
                        : "bg-[#0F172A] text-[#F8FAFC] hover:bg-[#334155]"
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
          <div className="p-6 sm:p-8 bg-[#E8EDE5]/75 backdrop-blur-md border border-[#D9E0D6] flex flex-col md:flex-row md:items-center justify-between gap-6">
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
