import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function Section({ id, className, containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h2>
        {description ? <p className="mt-4 max-w-2xl text-base text-slate-700">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
