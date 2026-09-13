"use client";

import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "text-interactive underline-offset-4 hover:underline",
        subtle: "text-foreground/80 hover:text-foreground underline-offset-4 hover:underline",
        nav: "text-foreground/80 hover:text-foreground px-2 py-1 rounded-md",
        inline: "text-interactive underline underline-offset-2 hover:opacity-80",
        unstyled: "",
      },
      disabled: {
        true: "pointer-events-none opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  },
);

export interface LinkProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps,
    VariantProps<typeof linkVariants> {
  external?: boolean;
  showExternalIcon?: boolean;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      disabled = false,
      external = false,
      showExternalIcon = true,
      children,
      href,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const isExternal = external || (typeof href === "string" && /^https?:\/\//.test(href));
    const resolvedTarget = isExternal ? (target ?? "_blank") : target;
    const resolvedRel = isExternal ? (rel ?? "noopener noreferrer") : rel;

    return (
      <NextLink
        ref={ref}
        href={href}
        target={resolvedTarget}
        rel={resolvedRel}
        className={cn(linkVariants({ variant, disabled, className }))}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {children}
        {isExternal && (
          <>
            <span className="sr-only">(opens in new tab)</span>
            {showExternalIcon && (
              <ExternalLink className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
            )}
          </>
        )}
      </NextLink>
    );
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
