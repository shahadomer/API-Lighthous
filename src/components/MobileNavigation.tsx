import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/navigation";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open main menu"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[86vw] max-w-sm bg-surface p-0">
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-2 text-navy">
            <Lightbulb className="size-5 text-highlight" aria-hidden="true" />
            API Lighthouse
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-5">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.to}>
              <Link
                to={link.to}
                className="rounded-xl px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-highlight" }}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-border px-6 py-5">
          <SheetClose asChild>
            <Link
              to="/login"
              className="rounded-xl px-3 py-2 text-center text-sm font-medium text-navy hover:bg-secondary"
            >
              Log in
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to="/signup">
              <Button variant="outline" className="w-full rounded-xl">
                Sign up
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link to="/signup" search={{ intent: "provider" }}>
              <Button className="w-full rounded-xl">Publish your API</Button>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
