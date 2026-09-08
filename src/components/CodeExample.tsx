import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  javascript: string;
  python: string;
  response: string;
};

export function CodeExample({ javascript, python, response }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-navy text-navy-foreground shadow-[var(--shadow-card)]">
      <Tabs defaultValue="javascript">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <TabsList className="bg-white/10">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">Sample Data</span>
        </div>

        <TabsContent value="javascript" className="m-0">
          <pre className="overflow-x-auto p-5 text-xs leading-relaxed">
            <code>{javascript}</code>
          </pre>
        </TabsContent>
        <TabsContent value="python" className="m-0">
          <pre className="overflow-x-auto p-5 text-xs leading-relaxed">
            <code>{python}</code>
          </pre>
        </TabsContent>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-white/60">Sample JSON response</p>
          <pre className="mt-2 overflow-x-auto text-xs leading-relaxed">
            <code>{response}</code>
          </pre>
        </div>
      </Tabs>
    </div>
  );
}
