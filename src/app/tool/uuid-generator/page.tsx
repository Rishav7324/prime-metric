'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Fingerprint, Copy, RotateCcw, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const DEMO_UUIDS = [
  "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "550e8400-e29b-41d4-a716-446655440000",
  "123e4567-e89b-42d3-a456-426614174000",
  "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
  "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
];

const DEMO_COUNT = "5";

// crypto.randomUUID requires a secure context — fall back to Math.random (RFC 4122 v4 shape).
const generateUUID = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // fall through to Math.random fallback below
    }
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const UUIDGenerator = () => {
  // Pre-filled demo IDs so output shows instantly
  const [count, setCount] = useState<string>(DEMO_COUNT);
  const [uuids, setUuids] = useState<string[]>(DEMO_UUIDS);
  const { toast } = useToast();

  const parseCount = (value: string): number | null => {
    const n = Number(value);
    if (!Number.isInteger(n) || n < 1 || n > 50) return null;
    return n;
  };

  const generate = () => {
    const n = parseCount(count);
    if (n === null) {
      toast({ variant: "destructive", title: "Invalid Count", description: "Enter a whole number between 1 and 50." });
      return;
    }
    const fresh = Array.from({ length: n }, () => generateUUID());
    setUuids(fresh);
    toast({ title: "UUIDs Generated", description: `${n} unique version 4 ID${n === 1 ? "" : "s"} generated.` });
  };

  const copyItem = async (uuid: string) => {
    if (!uuid) {
      toast({ variant: "destructive", title: "Nothing to copy", description: "Generate UUIDs first." });
      return;
    }
    try {
      await navigator.clipboard.writeText(uuid);
      toast({ title: "Copied", description: "UUID copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const copyAll = async () => {
    if (uuids.length === 0) {
      toast({ variant: "destructive", title: "Nothing to copy", description: "Generate UUIDs first." });
      return;
    }
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      toast({ title: "Copied", description: `${uuids.length} UUID${uuids.length === 1 ? "" : "s"} copied to clipboard.` });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const reset = () => {
    setCount(DEMO_COUNT);
    setUuids(DEMO_UUIDS);
    toast({ title: "Reset", description: "Restored demo UUIDs." });
  };

  return (
    <CalculatorLayout
      title="UUID Generator Tool"
      description="Generate bulk UUID v4 identifiers instantly with one-click copy. Create up to 50 unique IDs for databases, APIs and test data."
      keywords="uuid generator, uuid v4 generator, guid generator, random uuid, bulk uuid generator, unique identifier generator"
      canonicalUrl="/tool/uuid-generator"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <Card className="p-6 space-y-4">
          <div>
            <Label className="text-sm font-medium" htmlFor="count">How many UUIDs? (1-50)</Label>
            <Input
              id="count"
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="e.g., 5"
              className="mt-2"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={generate} className="flex-1 gradient-button">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate UUIDs
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {uuids.length > 0 && (
          <Card className="p-6 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">{uuids.length} UUID{uuids.length === 1 ? "" : "s"}</span>
              </div>
              <Button variant="outline" size="sm" onClick={copyAll}>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </div>
            <ul className="space-y-2">
              {uuids.map((uuid, i) => (
                <li key={`${uuid}-${i}`} className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg">
                  <code className="flex-1 font-mono text-xs sm:text-sm break-all">{uuid}</code>
                  <Button variant="outline" size="sm" onClick={() => copyItem(uuid)} aria-label={`Copy ${uuid}`}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      <CalculatorContentSection
        aboutContent="The UUID Generator creates version 4 universally unique identifiers for databases, APIs, and distributed systems. Each ID is 128 bits of randomness, making collisions practically impossible across independent systems. IDs are generated entirely in your browser, so they are instant, free, and never leave your device."
        useCases={[
          { title: "Database Primary Keys", description: "Generate collision-free primary keys for records created across multiple servers or offline clients that sync later without central coordination." },
          { title: "API Request Tracing", description: "Attach a unique correlation ID to each API request so logs from different microservices can be tied together when debugging production issues." },
          { title: "Test Data Seeding", description: "Bulk-generate dozens of realistic unique IDs to seed staging databases, populate fixtures, or load-test endpoints that require distinct identifiers." },
          { title: "File & Session Tokens", description: "Create unguessable tokens for password resets, file uploads, or anonymous sessions where sequential numeric IDs would leak usage counts." },
        ]}
        tips={[
          { title: "UUID v4 Is Random", description: "Version 4 UUIDs are randomly generated with 122 bits of entropy. Never use them where sequential ordering matters — use auto-increment IDs or UUID v7 instead." },
          { title: "Store as Native UUID Type", description: "In Postgres use the uuid column type rather than text. It validates input, stores 16 bytes instead of 36 characters, and indexes faster." },
          { title: "Don't Rely on Secrecy Alone", description: "UUIDs are unguessable but not access control. Always verify permissions server-side even when resource URLs contain random identifiers." },
        ]}
        faqs={[
          { question: "What is a UUID v4?", answer: "A UUID v4 is a 128-bit identifier with 122 random bits, shown as 32 hexadecimal characters in five groups (8-4-4-4-12). The version digit is always 4 and the variant bits mark the RFC 4122 layout, so any v4 UUID is recognizable by its shape." },
          { question: "Can two generated UUIDs be the same?", answer: "Theoretically yes, but with 2^122 possible values the chance is astronomically small — you could generate billions per second for centuries without expecting a duplicate. For practical purposes every generated ID is unique." },
          { question: "Is this generator secure enough for tokens?", answer: "In modern browsers it uses crypto.randomUUID, which is cryptographically secure and suitable for session tokens and reset links. On very old browsers without Web Crypto it falls back to Math.random, which should only be used for non-security identifiers." },
          { question: "UUID vs auto-increment ID — which should I use?", answer: "Use UUIDs when records are created in distributed systems, offline clients, or merged databases where coordination is hard. Use auto-increment integers when you need compact storage, chronological ordering, or human-friendly references in a single database." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default UUIDGenerator;
