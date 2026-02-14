import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-brand-700/70 font-body leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
