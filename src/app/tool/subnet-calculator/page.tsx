'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Network, Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

type SubnetResult = {
  cidr: string;
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  mask: string;
  wildcard: string;
  totalAddresses: number;
  usableHosts: number;
  ipBinary: string;
  maskBinary: string;
  networkBinary: string;
  ipClass: string;
  ipType: string;
};

const DEMO_IP = "192.168.1.10";
const DEMO_PREFIX = "24";
const DEMO_MASK = "255.255.255.0";

function parseIPv4(ip: string): number[] | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  const octets: number[] = [];
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const n = parseInt(p, 10);
    if (n < 0 || n > 255) return null;
    octets.push(n);
  }
  return octets;
}

function parsePrefix(s: string): number | null {
  const t = s.trim();
  if (!/^\d{1,2}$/.test(t)) return null;
  const n = parseInt(t, 10);
  return n >= 0 && n <= 32 ? n : null;
}

const octetsToInt = (o: number[]): number =>
  ((((o[0] << 24) >>> 0) + (o[1] << 16) + (o[2] << 8) + o[3]) >>> 0);

const prefixToMaskInt = (p: number): number =>
  p === 0 ? 0 : ((0xffffffff << (32 - p)) >>> 0);

const intToIp = (n: number): string =>
  `${(n >>> 24) & 255}.${(n >>> 16) & 255}.${(n >>> 8) & 255}.${n & 255}`;

const intToBinaryDotted = (n: number): string =>
  [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]
    .map((o) => o.toString(2).padStart(8, "0"))
    .join(".");

function maskStrToPrefix(mask: string): number | null {
  const octets = parseIPv4(mask);
  if (!octets) return null;
  const m = octetsToInt(octets);
  let count = 0;
  for (let i = 31; i >= 0; i--) {
    if ((m >>> i) & 1) count++;
    else break;
  }
  if (count < 32 && ((m << count) >>> 0) !== 0) return null; // non-contiguous ones
  return prefixToMaskInt(count) === m ? count : null;
}

function ipClassAndType(firstOctet: number, ipInt: number): { ipClass: string; ipType: string } {
  const ipClass =
    firstOctet < 128 ? "A" : firstOctet < 192 ? "B" : firstOctet < 224 ? "C" : firstOctet < 240 ? "D (Multicast)" : "E (Reserved)";
  const isPrivate =
    (ipInt >>> 24) === 10 ||
    (ipInt & 0xfff00000) >>> 0 === 0xac100000 ||
    (ipInt & 0xffff0000) >>> 0 === 0xc0a80000;
  const isLoopback = (ipInt >>> 24) === 127;
  return { ipClass, ipType: isLoopback ? "Loopback" : isPrivate ? "Private" : "Public" };
}

function computeSubnet(ipStr: string, prefix: number): SubnetResult | null {
  const octets = parseIPv4(ipStr);
  if (!octets || prefix < 0 || prefix > 32) return null;
  const ipInt = octetsToInt(octets);
  const maskInt = prefixToMaskInt(prefix);
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const wildcardInt = (~maskInt >>> 0) >>> 0;

  let totalAddresses: number;
  let usableHosts: number;
  let firstHost: string;
  let lastHost: string;
  if (prefix === 32) {
    totalAddresses = 1;
    usableHosts = 1;
    firstHost = intToIp(networkInt);
    lastHost = intToIp(networkInt);
  } else if (prefix === 31) {
    totalAddresses = 2;
    usableHosts = 2; // point-to-point links use both addresses (RFC 3021)
    firstHost = intToIp(networkInt);
    lastHost = intToIp(broadcastInt);
  } else {
    totalAddresses = 2 ** (32 - prefix);
    usableHosts = totalAddresses - 2;
    firstHost = intToIp((networkInt + 1) >>> 0);
    lastHost = intToIp((broadcastInt - 1) >>> 0);
  }

  const { ipClass, ipType } = ipClassAndType(octets[0], ipInt);
  return {
    cidr: `${intToIp(networkInt)}/${prefix}`,
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    firstHost,
    lastHost,
    mask: intToIp(maskInt),
    wildcard: intToIp(wildcardInt),
    totalAddresses,
    usableHosts,
    ipBinary: intToBinaryDotted(ipInt),
    maskBinary: intToBinaryDotted(maskInt),
    networkBinary: intToBinaryDotted(networkInt),
    ipClass,
    ipType,
  };
}

const SubnetCalculator = () => {
  const [ip, setIp] = useState(DEMO_IP);
  const [prefixStr, setPrefixStr] = useState(DEMO_PREFIX);
  const [maskStr, setMaskStr] = useState(DEMO_MASK);
  // Pre-filled demo so the full subnet breakdown renders instantly
  const [result, setResult] = useState<SubnetResult | null>(() => computeSubnet(DEMO_IP, 24));
  const { toast } = useToast();

  const onPrefixChange = (v: string) => {
    setPrefixStr(v);
    const p = parsePrefix(v);
    if (p !== null) setMaskStr(intToIp(prefixToMaskInt(p)));
  };

  const onMaskChange = (v: string) => {
    setMaskStr(v);
    const p = maskStrToPrefix(v);
    if (p !== null) setPrefixStr(String(p));
  };

  const calculate = () => {
    if (!parseIPv4(ip)) {
      toast({ variant: "destructive", title: "Invalid IP Address", description: "Enter a valid IPv4 address (four octets, 0–255), e.g. 192.168.1.10." });
      return;
    }
    const p = parsePrefix(prefixStr);
    if (p === null) {
      toast({ variant: "destructive", title: "Invalid Prefix", description: "CIDR prefix must be a whole number from 0 to 32." });
      return;
    }
    const computed = computeSubnet(ip, p);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Could not compute the subnet. Check the IP and prefix." });
      return;
    }
    setMaskStr(computed.mask);
    setResult(computed);
    toast({ title: "Subnet Calculated", description: `${computed.cidr} • ${computed.usableHosts.toLocaleString()} usable hosts.` });
  };

  const reset = () => {
    setIp(DEMO_IP);
    setPrefixStr(DEMO_PREFIX);
    setMaskStr(DEMO_MASK);
    setResult(computeSubnet(DEMO_IP, 24));
    toast({ title: "Reset", description: "Restored demo 192.168.1.10/24." });
  };

  const copyGroup = async (text: string, label: string) => {
    if (!text) {
      toast({ variant: "destructive", title: "Nothing to copy", description: "Calculate a subnet first." });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: `${label} copied to clipboard.` });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const networkText = result
    ? `CIDR: ${result.cidr}\nNetwork: ${result.network}\nBroadcast: ${result.broadcast}\nSubnet mask: ${result.mask}\nWildcard: ${result.wildcard}`
    : "";
  const hostText = result
    ? `First host: ${result.firstHost}\nLast host: ${result.lastHost}\nUsable hosts: ${result.usableHosts}\nTotal addresses: ${result.totalAddresses}\nClass: ${result.ipClass} • ${result.ipType}`
    : "";
  const binaryText = result
    ? `IP: ${result.ipBinary}\nMask: ${result.maskBinary}\nNetwork: ${result.networkBinary}`
    : "";

  const row = (label: string, value: string, mono = true) => (
    <div className="flex items-center justify-between gap-2 py-1.5 border-b border-neutral-100 last:border-0">
      <span className="text-xs text-neutral-500">{label}</span>
      <span className={`text-[13px] font-semibold text-black text-right break-all ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );

  return (
    <CalculatorLayout
      title="Subnet Calculator – IPv4 Subnet & IP Range"
      description="Free IPv4 subnet calculator — enter an IP with a CIDR prefix or mask to get the network, broadcast, usable hosts, wildcard and binary octets."
      keywords="subnet calculator, ipv4 subnet calculator, cidr calculator, ip subnet mask calculator, network calculator, broadcast address calculator"
      canonicalUrl="/tool/subnet-calculator"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <Card className="p-4 sm:p-5 space-y-3">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <Label className="text-sm font-medium" htmlFor="ip">IP Address</Label>
              <Input id="ip" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="192.168.1.10" className="mt-1.5 h-10 text-sm font-mono" />
            </div>
            <div>
              <Label className="text-sm font-medium" htmlFor="prefix">CIDR Prefix (0–32)</Label>
              <Input id="prefix" inputMode="numeric" value={prefixStr} onChange={(e) => onPrefixChange(e.target.value)} placeholder="24" className="mt-1.5 h-10 text-sm font-mono" />
            </div>
            <div>
              <Label className="text-sm font-medium" htmlFor="mask">Subnet Mask</Label>
              <Input id="mask" value={maskStr} onChange={(e) => onMaskChange(e.target.value)} placeholder="255.255.255.0" className="mt-1.5 h-10 text-sm font-mono" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">
              <Network className="w-4 h-4 mr-2" />
              Calculate Subnet
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {result && (
          <div className="space-y-4">
            <Card className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-sm font-bold">Network Addresses</h2>
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => copyGroup(networkText, "Network addresses")}>
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                </Button>
              </div>
              {row("CIDR notation", result.cidr)}
              {row("Network address", result.network)}
              {row("Broadcast address", result.broadcast)}
              {row("Subnet mask", result.mask)}
              {row("Wildcard mask", result.wildcard)}
            </Card>

            <Card className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-sm font-bold">Host Range</h2>
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => copyGroup(hostText, "Host range")}>
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                </Button>
              </div>
              {row("First usable host", result.firstHost)}
              {row("Last usable host", result.lastHost)}
              {row("Usable hosts", result.usableHosts.toLocaleString())}
              {row("Total addresses", result.totalAddresses.toLocaleString())}
              {row("IP class", `Class ${result.ipClass}`, false)}
              {row("Address type", result.ipType, false)}
            </Card>

            <Card className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-sm font-bold">Binary Octets</h2>
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => copyGroup(binaryText, "Binary octets")}>
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                </Button>
              </div>
              {row("IP", result.ipBinary)}
              {row("Mask", result.maskBinary)}
              {row("Network", result.networkBinary)}
            </Card>
          </div>
        )}
      </div>

      <CalculatorContentSection
        aboutContent="The IPv4 Subnet Calculator splits any IPv4 address and CIDR prefix (or subnet mask) into its network address, broadcast address, usable host range, wildcard mask and binary octets. It handles edge cases like /31 point-to-point links and /32 single-host routes, and flags the address class and private-versus-public type. Results update from the pre-filled 192.168.1.10/24 demo so you can explore instantly."
        useCases={[
          { title: "Plan Office Networks", description: "Size VLANs and DHCP scopes by checking usable host counts before assigning a prefix." },
          { title: "Write Firewall Rules", description: "Derive exact network and wildcard addresses for ACLs and security-group CIDR blocks." },
          { title: "Study for Certifications", description: "Practice subnetting with binary octets visible for CCNA and Network+ exam prep." },
          { title: "Debug Connectivity", description: "Confirm two hosts share a network address when pings fail across subnets." },
        ]}
        tips={[
          { title: "Prefix and Mask Stay in Sync", description: "Typing a valid prefix auto-fills its mask and vice versa — a quick way to memorize pairs like /24 with 255.255.255.0." },
          { title: "Remember /31 and /32", description: "These have no traditional broadcast range: /31 gives two usable point-to-point addresses and /32 is a single host route." },
          { title: "Usable Means Minus Two", description: "For prefixes /30 and shorter, subtract the network and broadcast addresses from the total to get assignable hosts." },
        ]}
        faqs={[
          { question: "What is the difference between network and broadcast addresses?", answer: "The network address identifies the subnet itself (host bits all zero) and the broadcast address targets every host in it (host bits all one). Neither is assignable to a device in standard subnets." },
          { question: "How is the wildcard mask related to the subnet mask?", answer: "The wildcard is the bitwise inverse of the subnet mask — where the mask has 0s, the wildcard has 1s. ACLs and OSPF network statements use it to match address ranges." },
          { question: "How many usable hosts does my prefix give me?", answer: "Raise 2 to the power of host bits (32 minus prefix) and subtract 2 for network and broadcast. A /24 has 8 host bits, so 2^8 − 2 = 254 usable hosts." },
          { question: "Why is 192.168.1.10 a private address?", answer: "The ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 are reserved for private networks and never routed on the public internet, which is why home routers use them." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SubnetCalculator;
