import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  number?: string;
  label?: string;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, number, label, className, children, ...props }, ref) => (
    <section
      ref={ref}
      id={id}
      className={cn("relative px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40 border-t border-border", className)}
      {...props}
    >
      {(number || label) && (
        <div className="absolute top-8 right-6 md:right-12 lg:right-20 flex items-center gap-3">
          {number && <span className="caption">{number}</span>}
          {label && <span className="caption">{label}</span>}
        </div>
      )}
      {children}
    </section>
  )
);
SectionWrapper.displayName = "SectionWrapper";
