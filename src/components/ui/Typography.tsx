import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & { as?: keyof JSX.IntrinsicElements };

export function Display({ as: Tag = "h1", className, children, ...props }: Props) {
  return (
    <Tag
      className={cn("font-display text-display text-foreground leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Heading({ as: Tag = "h2", className, children, ...props }: Props) {
  return (
    <Tag
      className={cn("font-display text-h1 text-foreground leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function SubHeading({ as: Tag = "h3", className, children, ...props }: Props) {
  return (
    <Tag
      className={cn("font-display text-h2 text-foreground", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Body({ as: Tag = "p", className, children, ...props }: Props) {
  return (
    <Tag
      className={cn("font-sans text-base text-foreground leading-relaxed", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Caption({ as: Tag = "span", className, children, ...props }: Props) {
  return (
    <Tag
      className={cn("caption", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
