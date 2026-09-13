"use client";

import * as React from "react";
import {
  AlertCircle,
  Bell,
  Check,
  CreditCard,
  Database,
  ExternalLink,
  Flame,
  Globe,
  HardDrive,
  Info,
  Key,
  Layers,
  Lock,
  Moon,
  Search,
  Server,
  Settings,
  Sparkles,
  Sun,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem, Radio } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Chip } from "@/components/ui/chip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Progress, ProgressBar } from "@/components/ui/progress";
import { StepIndicator } from "@/components/ui/step-indicator";

export default function ComponentsShowcasePage() {
  const [isDark, setIsDark] = React.useState(false);
  const [comboboxVal, setComboboxVal] = React.useState("fastapi");
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [checkboxChecked, setCheckboxChecked] = React.useState<boolean | "indeterminate">(true);
  const [filterChipSelected, setFilterChipSelected] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isRetrying, setIsRetrying] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const comboboxOptions = [
    { value: "fastapi", label: "FastAPI (Python)" },
    { value: "express", label: "Express.js (Node)" },
    { value: "nextjs", label: "Next.js Route Handlers" },
    { value: "django", label: "Django REST" },
    { value: "aspnet", label: "ASP.NET Core" },
    { value: "spring", label: "Spring Boot" },
  ];

  const steps = [
    { id: 1, title: "API Details", description: "Name, category, and overview" },
    { id: 2, title: "Endpoints", description: "OpenAPI specification" },
    { id: 3, title: "Pricing Plans", description: "Tiers and rate limits" },
    { id: 4, title: "Review & Publish", description: "Live listing preview" },
  ];

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground transition-colors p-6 md:p-12 font-sans",
        isDark && "dark",
      )}
    >
      <Toaster />
      <TooltipProvider>
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-outline pb-6 mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-display-l font-semibold text-foreground tracking-tight">
                UI Primitive Library
              </h1>
              <Badge variant="success" shape="pill">
                DEV-05 Ready
              </Badge>
            </div>
            <p className="text-body-m text-muted-foreground mt-1">
              Section 3.7 shared component inventory with all states and dark theme support.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="gap-2"
              aria-label="Toggle theme preview"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              <span>{isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}</span>
            </Button>
          </div>
        </header>

        {/* Inventory Navigation Grid */}
        <main className="space-y-16 max-w-6xl mx-auto">
          {/* 1. Buttons */}
          <section id="buttons" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">1. Button</h2>
              <p className="text-body-s text-muted-foreground">
                All 5 required variants (filled, tonal, outlined, text, icon), shapes, loading, and
                states.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="filled">Filled (Default)</Button>
              <Button variant="tonal">Tonal</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text (Ghost)</Button>
              <Button variant="icon" aria-label="Settings icon action">
                <Settings className="size-4" />
              </Button>
              <Button variant="filled" loading>
                Loading
              </Button>
              <Button variant="filled" disabled>
                Disabled
              </Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="filled" shape="full">
                Pill Shape (Primary CTA)
              </Button>
            </div>
          </section>

          {/* 2. Link */}
          <section id="links" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">2. Link</h2>
              <p className="text-body-s text-muted-foreground">
                Accessible links using standard anchor tags with external announcements.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/apis" variant="default">
                Default Interactive Link
              </Link>
              <Link href="/pricing" variant="subtle">
                Subtle Link
              </Link>
              <Link href="/developers" variant="nav">
                Nav Item Link
              </Link>
              <Link href="https://github.com/shahadomer/API-Lighthous" external>
                External GitHub Link
              </Link>
              <Link href="/disabled" disabled>
                Disabled Link
              </Link>
            </div>
          </section>

          {/* 3. Input & Textarea */}
          <section id="inputs" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                3. Input & 4. Textarea
              </h2>
              <p className="text-body-s text-muted-foreground">
                Default, placeholder, focus-visible, error, loading, and disabled states.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-label text-foreground" htmlFor="input-default">
                  Default Input
                </label>
                <Input id="input-default" placeholder="Search APIs..." />
              </div>
              <div className="space-y-2">
                <label className="text-label text-foreground" htmlFor="input-loading">
                  Loading Input
                </label>
                <Input id="input-loading" defaultValue="Validating OpenAPI URL" loading />
              </div>
              <div className="space-y-2">
                <label className="text-label text-destructive" htmlFor="input-error">
                  Error State Input
                </label>
                <Input id="input-error" defaultValue="invalid-url" error />
                <p className="text-xs text-destructive">Must be a valid HTTPS URL</p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-label text-foreground" htmlFor="textarea-default">
                  Textarea
                </label>
                <Textarea
                  id="textarea-default"
                  placeholder="Provide API description and usage terms..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-label text-destructive" htmlFor="textarea-error">
                  Textarea Error State
                </label>
                <Textarea id="textarea-error" defaultValue="Too short" error />
                <p className="text-xs text-destructive">Minimum 20 characters required</p>
              </div>
            </div>
          </section>

          {/* 5. Select & 6. Combobox */}
          <section id="selection" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                5. Select & 6. Combobox
              </h2>
              <p className="text-body-s text-muted-foreground">
                Dropdown and searchable keyboard-navigable selection primitives.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-label text-foreground">Radix Select</label>
                <Select defaultValue="ai">
                  <SelectTrigger aria-label="Category select">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">AI & Machine Learning</SelectItem>
                    <SelectItem value="finance">Financial & Payments</SelectItem>
                    <SelectItem value="sms">SMS & Communications</SelectItem>
                    <SelectItem value="geo">Maps & Geocoding</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-label text-foreground">Combobox (cmdk + Popover)</label>
                <Combobox
                  options={comboboxOptions}
                  value={comboboxVal}
                  onChange={setComboboxVal}
                  placeholder="Search frameworks..."
                />
              </div>
            </div>
          </section>

          {/* 7. Checkbox, 8. Radio, 9. Switch */}
          <section id="toggles" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                7. Checkbox, 8. Radio, & 9. Switch
              </h2>
              <p className="text-body-s text-muted-foreground">
                Selection controls with keyboard focus rings, checked, unchecked, and disabled
                states.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="text-heading-s font-semibold">Checkbox</h3>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="check-1"
                    checked={checkboxChecked}
                    onCheckedChange={setCheckboxChecked}
                  />
                  <label htmlFor="check-1" className="text-body-s cursor-pointer">
                    Verified Providers Only
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="check-disabled" disabled checked />
                  <label htmlFor="check-disabled" className="text-body-s opacity-60">
                    Disabled Checked
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-heading-s font-semibold">Radio Group</h3>
                <RadioGroup defaultValue="monthly">
                  <div className="flex items-center gap-2">
                    <Radio value="monthly" id="radio-1" />
                    <label htmlFor="radio-1" className="text-body-s cursor-pointer">
                      Monthly Billing
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio value="annual" id="radio-2" />
                    <label htmlFor="radio-2" className="text-body-s cursor-pointer">
                      Annual (Save 20%)
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <h3 className="text-heading-s font-semibold">Switch</h3>
                <div className="flex items-center gap-3">
                  <Switch
                    id="switch-1"
                    checked={switchChecked}
                    onCheckedChange={setSwitchChecked}
                  />
                  <label htmlFor="switch-1" className="text-body-s cursor-pointer">
                    Show Free Tier Only
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="switch-2" disabled />
                  <label htmlFor="switch-2" className="text-body-s opacity-60">
                    Disabled Option
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 10. Chip & 11. Badge */}
          <section id="chips-badges" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">10. Chip & 11. Badge</h2>
              <p className="text-body-s text-muted-foreground">
                Interactive tags, suggestion chips, filter chips, and status badges.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Chip variant="suggestion" icon={<Search className="size-3.5" />}>
                  Airline data
                </Chip>
                <Chip variant="suggestion" icon={<Search className="size-3.5" />}>
                  SMS delivery
                </Chip>
                <Chip
                  variant="filter"
                  selected={filterChipSelected}
                  onClick={() => setFilterChipSelected(!filterChipSelected)}
                >
                  Free Tier Included
                </Chip>
                <Chip variant="default" onRemove={() => toast.info("Chip removed")}>
                  OpenAPI 3.1
                </Chip>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge variant="default">Primary Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">99.9% Uptime</Badge>
                <Badge variant="warning">Degraded</Badge>
                <Badge variant="destructive">Deprecated</Badge>
                <Badge variant="neutral">REST API</Badge>
                <Badge variant="outline">GraphQL</Badge>
              </div>
            </div>
          </section>

          {/* 12. Avatar, 13. Tooltip, 14. Popover */}
          <section id="overlay-primitives" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                12. Avatar, 13. Tooltip, & 14. Popover
              </h2>
              <p className="text-body-s text-muted-foreground">
                Identity avatars and floating accessible popovers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    AL
                  </AvatarFallback>
                </Avatar>
                <Avatar className="size-10">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
                    ES
                  </AvatarFallback>
                </Avatar>
                <Avatar className="size-12">
                  <AvatarFallback className="bg-navy text-navy-foreground text-base font-bold">
                    SH
                  </AvatarFallback>
                </Avatar>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Hover or Focus for Tooltip
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip content with M3 shadow and contrast</p>
                </TooltipContent>
              </Tooltip>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="tonal" size="sm">
                    Open Popover
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4">
                  <h4 className="font-semibold text-sm">Endpoint Quota</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    10,000 free requests per month included on developer plan.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </section>

          {/* 15. Dialog & 16. Drawer */}
          <section id="dialogs-drawers" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                15. Dialog & 16. Drawer
              </h2>
              <p className="text-body-s text-muted-foreground">
                Accessible modal dialogs with focus trap and Vaul drawer.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="filled">Open Modal Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>API Key Generated</DialogTitle>
                    <DialogDescription>
                      Store this key securely. You will not be able to view it again.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="rounded-md bg-muted p-3 font-mono text-xs break-all">
                    apilh_live_9f8382c7e10a2b49c719
                  </div>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Close
                    </Button>
                    <Button
                      variant="filled"
                      onClick={() => {
                        toast.success("API key copied to clipboard");
                        setDialogOpen(false);
                      }}
                    >
                      Copy Key
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outlined">Open Mobile Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Quick Filters</DrawerTitle>
                      <DrawerDescription>Adjust categories and pricing models.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 space-y-3">
                      <Button variant="tonal" className="w-full justify-start">
                        Free APIs Only
                      </Button>
                      <Button variant="tonal" className="w-full justify-start">
                        Verified Providers
                      </Button>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Dismiss Drawer</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>

              <Button
                variant="outline"
                onClick={() => toast.success("Sample action completed successfully!")}
              >
                Trigger 22. Toast
              </Button>
            </div>
          </section>

          {/* 17. Tabs & 18. Accordion */}
          <section id="tabs-accordion" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                17. Tabs & 18. Accordion
              </h2>
              <p className="text-body-s text-muted-foreground">
                Segmented content navigation and progressive disclosure.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="ts">TypeScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="curl"
                  className="rounded-lg bg-surface-inverse text-white p-4 font-mono text-xs"
                >
                  curl -X GET &quot;https://api.apilh.com/v1/flights&quot; \<br />
                  &nbsp;&nbsp;-H &quot;Authorization: Bearer YOUR_KEY&quot;
                </TabsContent>
                <TabsContent
                  value="ts"
                  className="rounded-lg bg-surface-inverse text-white p-4 font-mono text-xs"
                >
                  import &#123; LighthouseClient &#125; from &quot;@apilh/sdk&quot;;
                  <br />
                  const client = new LighthouseClient();
                </TabsContent>
                <TabsContent
                  value="python"
                  className="rounded-lg bg-surface-inverse text-white p-4 font-mono text-xs"
                >
                  import apilh
                  <br />
                  client = apilh.Client(api_key=&quot;YOUR_KEY&quot;)
                </TabsContent>
              </Tabs>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What does hosting an API mean?</AccordionTrigger>
                  <AccordionContent className="text-body-s text-muted-foreground">
                    Deploying code on API Lighthouse infrastructure (APIaaS). Provider-listed APIs
                    run on their own servers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How are payouts handled?</AccordionTrigger>
                  <AccordionContent className="text-body-s text-muted-foreground">
                    Payouts are calculated monthly with transparent commission rates.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* 19. Table, 20. Pagination, 21. Breadcrumb */}
          <section id="data-navigation" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                19. Table, 20. Pagination, & 21. Breadcrumb
              </h2>
              <p className="text-body-s text-muted-foreground">
                Structured data and hierarchical wayfinding.
              </p>
            </div>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/apis">Catalog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>AI & Machine Learning</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="rounded-xl border border-outline overflow-hidden">
              <Table>
                <TableCaption>Sample API Registry Listing Data</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>API Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Pricing</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">SkyTrack Flight Radar</TableCell>
                    <TableCell>AeroData Labs</TableCell>
                    <TableCell>Travel</TableCell>
                    <TableCell>Free tier / $29/mo</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="success">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CompanyGraph Intelligence</TableCell>
                    <TableCell>RegistryOne</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Usage-based</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="success">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>

          {/* 23. Skeleton, 24. EmptyState, 25. ErrorState */}
          <section id="states" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                23. Skeleton, 24. EmptyState, & 25. ErrorState
              </h2>
              <p className="text-body-s text-muted-foreground">
                Asynchronous state management: loading skeletons, zero-result empty states, and
                recoverable error boundaries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-outline p-6 space-y-4">
                <h3 className="text-heading-s font-semibold">Skeleton Loaders</h3>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <Skeleton className="h-28 w-full rounded-xl" />
              </div>

              <EmptyState
                title="No APIs match your filters"
                description="Try clearing search query or loosening price tier constraints."
                action={
                  <Button variant="tonal" size="sm" onClick={() => toast.info("Filters reset")}>
                    Reset Filters
                  </Button>
                }
              />

              <ErrorState
                title="Unable to load catalog"
                description="The API registry service did not respond within 5,000ms."
                isRetrying={isRetrying}
                onRetry={() => {
                  setIsRetrying(true);
                  setTimeout(() => {
                    setIsRetrying(false);
                    toast.success("Connection re-established");
                  }, 1200);
                }}
              />
            </div>
          </section>

          {/* 26. ProgressBar & 27. StepIndicator */}
          <section id="indicators" className="space-y-4">
            <div className="border-b border-outline pb-2">
              <h2 className="text-heading-m font-semibold text-foreground">
                26. ProgressBar & 27. StepIndicator
              </h2>
              <p className="text-body-s text-muted-foreground">
                Process indicators for multi-step submission wizards and activation checklists.
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProgressBar label="Storage Quota Used" value={65} showValue />
                <ProgressBar label="Monthly API Requests" value={88} showValue />
              </div>

              <div className="rounded-2xl border border-outline p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-heading-s font-semibold">Submission Wizard Steps</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                    >
                      Previous Step
                    </Button>
                    <Button
                      variant="filled"
                      size="sm"
                      disabled={activeStep === steps.length - 1}
                      onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
                <StepIndicator
                  steps={steps}
                  currentStepIndex={activeStep}
                  onStepClick={(i) => setActiveStep(i)}
                />
              </div>
            </div>
          </section>
        </main>
      </TooltipProvider>
    </div>
  );
}
