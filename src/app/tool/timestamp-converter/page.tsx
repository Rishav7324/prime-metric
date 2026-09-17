'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Clock, Copy, RotateCcw, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const DEMO_TS = "1767225600"; // 2026-01-01T00:00:00Z
const DEMO_DATETIME = "2026-01-01T00:00";

const MAX_MS = 8640000000000000;

function parseTimestamp(raw: string, unit: "s" | "ms"): number | null {
  if (!raw.trim()) return null;
  const n = Number(raw.trim());
  if (!Number.isFinite(n)) return null;
  const ms = unit === "s" ? n * 1000 : n;
  if (!Number.isFinite(ms) || Math.abs(ms) > MAX_MS) return null;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return ms;
}

function parseDateInput(raw: string): number | null {
  if (!raw.trim()) return null;
  const ms = new Date(raw).getTime();
  if (Number.isNaN(ms)) return null;
  return ms;
}

const TimestampConverter = () => {
  // Pre-filled demo values so both conversions show instantly
  const [timestamp, setTimestamp] = useState<string>(DEMO_TS);
  const [dateInput, setDateInput] = useState<string>(DEMO_DATETIME);
  const [unit, setUnit] = useState<"s" | "ms">("s");
  const { toast } = useToast();

  const fromTimestamp = useMemo(() => {
    const ms = parseTimestamp(timestamp, unit);
    if (ms === null) return null;
    const d = new Date(ms);
    return { utc: d.toUTCString(), local: d.toLocaleString(), iso: d.toISOString() };
  }, [timestamp, unit]);

  const fromDate = useMemo(() => {
    const ms = parseDateInput(dateInput);
    if (ms === null) return null;
    return { seconds: Math.floor(ms / 1000).toString(), millis: ms.toString() };
  }, [dateInput]);

  const useNow = () => {
    const now = Date.now();
    const value = unit === "s" ? Math.floor(now / 1000).toString() : now.toString();
    setTimestamp(value);
    toast({ title: "Current Time", description: "Filled in the current timestamp." });
  };

  const convertTimestamp = () => {
    if (!timestamp.trim()) {
      toast({ variant: "destructive", title: "Empty Input", description: "Enter a Unix timestamp to convert." });
      return;
    }
    if (fromTimestamp === null) {
      toast({ variant: "destructive", title: "Invalid Timestamp", description: "Enter a finite numeric timestamp within the valid date range." });
      return;
    }
    toast({ title: "Converted", description: "Timestamp converted to date." });
  };

  const convertDate = () => {
    if (!dateInput.trim()) {
      toast({ variant: "destructive", title: "Empty Input", description: "Pick a date and time to convert." });
      return;
    }
    if (fromDate === null) {
      toast({ variant: "destructive", title: "Invalid Date", description: "Enter a valid date and time." });
      return;
    }
    toast({ title: "Converted", description: "Date converted to timestamp." });
  };

  const copyText = async (value: string, label: string) => {
    if (!value) {
      toast({ variant: "destructive", title: "Nothing to copy", description: "Convert a value first." });
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: "Copied", description: `${label} copied to clipboard.` });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const reset = () => {
    setTimestamp(DEMO_TS);
    setDateInput(DEMO_DATETIME);
    setUnit("s");
    toast({ title: "Reset", description: "Restored demo values." });
  };

  return (
    <CalculatorLayout
      title="Timestamp Converter"
      description="Convert Unix timestamps to readable dates and back instantly. Supports seconds and milliseconds with UTC and local time display."
      keywords="timestamp converter, unix timestamp, epoch converter, unix time converter, timestamp to date, date to timestamp"
      canonicalUrl="/tool/timestamp-converter"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium" htmlFor="timestamp">Unix Timestamp → Date</Label>
            <div className="flex gap-2">
              <Button onClick={useNow} variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Now
              </Button>
              <Button onClick={reset} variant="outline" size="icon" aria-label="Reset">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={unit === "s" ? "default" : "outline"}
              size="sm"
              onClick={() => setUnit("s")}
              className="flex-1"
            >
              Seconds
            </Button>
            <Button
              variant={unit === "ms" ? "default" : "outline"}
              size="sm"
              onClick={() => setUnit("ms")}
              className="flex-1"
            >
              Milliseconds
            </Button>
          </div>
          <Input
            id="timestamp"
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder={unit === "s" ? "e.g., 1767225600" : "e.g., 1767225600000"}
          />
          <Button onClick={convertTimestamp} className="w-full gradient-button">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Convert to Date
          </Button>
          {fromTimestamp ? (
            <div className="space-y-2">
              {[
                { label: "UTC", value: fromTimestamp.utc },
                { label: "Local", value: fromTimestamp.local },
                { label: "ISO 8601", value: fromTimestamp.iso },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg">
                  <span className="text-xs font-semibold w-16 shrink-0">{row.label}</span>
                  <code className="flex-1 font-mono text-xs sm:text-sm break-all">{row.value}</code>
                  <Button variant="outline" size="sm" onClick={() => copyText(row.value, row.label)} aria-label={`Copy ${row.label}`}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-500">Enter a valid timestamp to see the converted date.</p>
          )}
        </Card>

        <Card className="p-6 space-y-4">
          <Label className="text-sm font-medium" htmlFor="date">Date → Unix Timestamp</Label>
          <Input
            id="date"
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <Button onClick={convertDate} className="w-full gradient-button">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Convert to Timestamp
          </Button>
          {fromDate ? (
            <div className="space-y-2">
              {[
                { label: "Seconds", value: fromDate.seconds },
                { label: "Millis", value: fromDate.millis },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg">
                  <span className="text-xs font-semibold w-16 shrink-0">{row.label}</span>
                  <code className="flex-1 font-mono text-xs sm:text-sm break-all">{row.value}</code>
                  <Button variant="outline" size="sm" onClick={() => copyText(row.value, `Timestamp (${row.label})`)} aria-label={`Copy ${row.label}`}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-500">Pick a valid date and time to see the timestamp.</p>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Timestamp Converter translates between Unix time (seconds or milliseconds since January 1, 1970 UTC) and human-readable dates in both directions. Every timestamp is shown in UTC and your local timezone plus ISO 8601, so timezone mix-ups are easy to spot. All conversions run locally in your browser with no data sent anywhere."
        useCases={[
          { title: "Debugging APIs & Logs", description: "Turn raw epoch values from API responses or server logs into readable dates to pinpoint exactly when an event happened." },
          { title: "Scheduling Cron Jobs", description: "Convert a planned run time into a Unix timestamp for cron expressions, scheduled functions, or token expiry fields." },
          { title: "Fixing Timezone Bugs", description: "Compare the UTC and local renderings side by side to confirm whether an off-by-hours bug comes from timezone handling." },
          { title: "Database Migration Checks", description: "Verify migrated created_at values by spot-checking that stored integer timestamps map to the expected calendar dates." },
        ]}
        tips={[
          { title: "Seconds vs Milliseconds", description: "Modern JavaScript uses milliseconds (13 digits) while most backends and JWTs use seconds (10 digits). If your date lands in 1970 or year 50000, you picked the wrong unit." },
          { title: "Trust UTC for Storage", description: "Always store and exchange timestamps in UTC, converting to local time only for display. This avoids daylight-saving and timezone-offset bugs." },
          { title: "Watch for Negative Values", description: "Negative timestamps represent dates before 1970 and are valid. If you see one unexpectedly, check for uninitialized or default-zero date fields." },
        ]}
        faqs={[
          { question: "What is a Unix timestamp?", answer: "A Unix timestamp counts seconds (or milliseconds) elapsed since January 1, 1970 00:00:00 UTC, known as the Unix epoch. It is a timezone-independent way to represent a single moment in time used by databases, APIs, and operating systems." },
          { question: "Why does my timestamp show the wrong date?", answer: "The most common cause is mixing seconds and milliseconds — a seconds value read as milliseconds lands in January 1970, while milliseconds read as seconds lands tens of thousands of years ahead. Toggle the unit switch and convert again." },
          { question: "What is the difference between UTC and local time here?", answer: "UTC is the universal reference time with no offset, while local time applies your device's timezone and daylight-saving rules. The same timestamp can fall on different calendar days in each, which is why both are displayed." },
          { question: "What range of dates can I convert?", answer: "JavaScript dates support roughly ±8.64 quadrillion milliseconds (about 275,000 years each way). Values outside that range are rejected because they cannot be represented as real dates." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default TimestampConverter;
