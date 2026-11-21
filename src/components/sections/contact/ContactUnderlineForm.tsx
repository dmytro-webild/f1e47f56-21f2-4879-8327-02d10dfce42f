import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Field = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea"; placeholder?: string; required?: boolean };

type ContactUnderlineFormProps = {
  title?: string;
  fields?: Field[];
  servicesLabel?: string;
  services?: string[];
  button?: { text: string };
  ariaLabel?: string;
  className?: string;
};

const ContactUnderlineForm = ({
  title = "Tell us what you're building.",
  fields = [
    { name: "name", label: "Your name", placeholder: "Your full name", required: true },
    { name: "email", label: "Your email", type: "email", placeholder: "you@company.com", required: true },
    { name: "company", label: "Company or website", placeholder: "Optional" },
    { name: "message", label: "Project details", type: "textarea", placeholder: "What are you building, and what should change?", required: true },
  ],
  servicesLabel = "Service",
  services = ["Brand identity", "Website", "Product design", "Motion", "Other"],
  button = { text: "Send message" },
  ariaLabel,
  className,
}: ContactUnderlineFormProps) => {
  const reduce = !!useReducedMotion();
  const live = !reduce;
  const { ease, base, slow } = useKitMotion();
  const [active, setActive] = useState(0);
  const words = title.trim().split(/\s+/);
  const rise = (i: number) => ({ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: { duration: slow * 0.7, ease, delay: 0.1 + i * 0.06 } } });
  const wipe = (i: number) => ({ hidden: { clipPath: "inset(0 100% 0 0)" }, shown: { clipPath: "inset(0 0% 0 0)", transition: { duration: slow, ease, delay: 0.15 + i * 0.06 } } });

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="kit-glass mx-auto flex w-[var(--container)] flex-col gap-[clamp(1.5rem,3vw,3rem)] p-[1.375rem] lg:p-[clamp(2rem,3.5vw,3.5rem)]">
        <motion.h2
          aria-label={title}
          initial={live ? "hidden" : false}
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
          className="flex max-w-[12em] flex-wrap gap-x-[0.25em] text-[length:var(--text-h1)]"
        >
          {words.map((word, i) => (
            <div key={`${word}-${i}`} aria-hidden="true" className="overflow-hidden pb-[0.15em] -mb-[0.15em]">
              <motion.div variants={{ hidden: { y: "110%" }, shown: { y: "0%", transition: { duration: slow, ease, delay: i * 0.04 } } }} className="whitespace-nowrap">
                {word}
              </motion.div>
            </div>
          ))}
        </motion.h2>

        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-12 lg:gap-[var(--gap)]">

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={live ? "hidden" : false}
            whileInView="shown"
            viewport={{ once: true }}
            className="flex flex-col gap-[clamp(1.5rem,2.4vw,2rem)] lg:col-span-8"
          >
            {fields.map((field, i) => (
              <motion.label key={field.name} variants={rise(i)} className="group flex flex-col gap-[0.75rem]">
                <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.2] tracking-[var(--label-tracking)]">
                  {field.required ? `${field.label} *` : field.label}
                </p>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={3}
                    className="w-full resize-none bg-transparent pb-[0.75rem] text-[length:var(--text-body-lg)] leading-[1.3] tracking-[-0.03em] text-foreground outline-none placeholder:text-foreground/90"
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-transparent pb-[0.75rem] text-[length:var(--text-body-lg)] leading-[1.3] tracking-[-0.03em] text-foreground outline-none placeholder:text-foreground/90"
                  />
                )}
                <motion.div variants={wipe(i)} aria-hidden="true" className="-mt-[0.75rem] h-px w-full bg-input transition-colors duration-300 group-focus-within:bg-foreground" />
              </motion.label>
            ))}

            {services.length > 0 && (
              <motion.fieldset
                initial={live ? { opacity: 0, y: 24 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: slow * 0.5, ease }}
                className="flex flex-col gap-[1rem]"
              >
                <legend className="mb-[1rem] text-[length:var(--text-body-lg)] leading-[1.2] tracking-[-0.03em]">{servicesLabel}</legend>
                <div className="flex flex-wrap gap-[0.5rem]">
                  {services.map((service, i) => (
                    <button
                      key={`${service}-${i}`}
                      type="button"
                      aria-pressed={active === i}
                      onClick={() => setActive(i)}
                      className={cn(
                        "min-h-[2.75rem] whitespace-nowrap border px-[0.875rem] font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] transition-colors",
                        active === i ? "border-accent text-foreground" : "border-input text-muted-foreground hover:border-foreground hover:text-foreground",
                      )}
                      style={{ transitionDuration: `${base * 0.5}s` }}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </motion.fieldset>
            )}

            {button && (
              <motion.div
                initial={live ? { opacity: 0, y: 24 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: slow * 0.5, ease }}
                className="pt-[0.5rem]"
              >
                <button type="submit" className="btn-primary w-full lg:w-auto lg:min-w-[15rem]">
                  <p className="btn-label">{button.text}</p>
                </button>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactUnderlineForm;
