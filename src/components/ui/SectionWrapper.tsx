import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, className, children, ...props }, ref) => (
    <section
      ref={ref}
      id={id}
      className={cn("relative px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40 border-t border-border", className)}
      {...props}
    >
      {children}
    </section>
  )
);
SectionWrapper.displayName = "SectionWrapper";
