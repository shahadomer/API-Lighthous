"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { primaryNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-[88vw] max-w-sm flex-col bg-surface p-0">
        {/* Drawer Header */}
        <SheetHeader className="border-b border-border px-6 py-4 text-left">
          <SheetTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" aria-hidden="true" />
            </span>
            API Lighthouse
          </SheetTitle>
        </SheetHeader>

        {/* Section 4.1 Requirement: Filled Sign up free button at the TOP of mobile drawer */}
        <div className="border-b border-border/70 bg-secondary/30 px-6 py-4">
          <div className="flex flex-col gap-2.5">
            <SheetClose asChild>
              <Button variant="filled" className="w-full justify-center font-medium" asChild>
                <Link href="/signup">Sign up free</Link>
              </Button>
            </SheetClose>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Already have an account?</span>
              <SheetClose asChild>
                <Link href="/login" className="font-medium text-interactive hover:underline">
                  Log in →
                </Link>
              </SheetClose>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Mobile Navigation" className="flex-1 overflow-y-auto px-4 py-4">
          <Accordion type="multiple" className="w-full space-y-1">
            {primaryNav.map((item) => {
              if (item.isMegaPanel && item.megaItems) {
                return (
                  <AccordionItem key={item.label} value={item.label} className="border-none">
                    <AccordionTrigger className="rounded-xl px-3 py-2.5 text-base font-medium text-foreground hover:bg-secondary/60 hover:no-underline">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-1">
                      <div className="space-y-1 pl-3">
                        {item.megaItems.map((sub) => (
                          <SheetClose asChild key={sub.href}>
                            <Link
                              href={sub.href}
                              className="flex flex-col rounded-lg px-3 py-2 transition-colors hover:bg-secondary/70"
                            >
                              <span className="text-sm font-medium text-foreground">
                                {sub.label}
                              </span>
                              {sub.description && (
                                <span className="text-xs text-muted-foreground">
                                  {sub.description}
                                </span>
                              )}
                            </Link>
                          </SheetClose>
                        ))}
                        {item.footerAction && (
                          <SheetClose asChild>
                            <Link
                              href={item.footerAction.href}
                              className="block px-3 py-2 text-xs font-semibold text-interactive hover:underline"
                            >
                              {item.footerAction.label}
                            </Link>
                          </SheetClose>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              return (
                <div key={item.href} className="py-0.5">
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary/60"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </div>
              );
            })}
          </Accordion>
        </nav>

        {/* Drawer Footer Notice */}
        <div className="border-t border-border px-6 py-4 text-xs text-muted-foreground">
          <p>API Lighthouse · Verified API Directory & Marketplace</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
