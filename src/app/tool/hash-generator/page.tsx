'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Hash, Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

type HashResults = { md5: string; sha1: string; sha256: string };

const DEMO_INPUT = "hello";
const DEMO_HASHES: HashResults = {
  md5: "5d41402abc4b2a76b9719d911017c592",
  sha1: "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
  sha256: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
};

// Correct MD5 implementation (RFC 1321). MD5 is not exposed via Web Crypto,
// so a compact JS implementation is used here for real MD5 digests.
const md5Hash = (input: string): string => {
  const leftRotate = (x: number, c: number): number =>
    ((x << c) | (x >>> (32 - c))) >>> 0;
  const addUnsigned = (x: number, y: number): number =>
    (((x & 0xffff) + (y & 0xffff)) & 0xffff) |
    ((((x >>> 16) + (y >>> 16) + (((x & 0xffff) + (y & 0xffff)) >>> 16)) & 0xffff) << 16);

  const s: number[] = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const K: number[] = Array.from(
    { length: 64 },
    (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) >>> 0
  );

  const msgBytes = Array.from(new TextEncoder().encode(input));
  const bitLen = msgBytes.length * 8;
  msgBytes.push(0x80);
  while (msgBytes.length % 64 !== 56) {
    msgBytes.push(0);
  }
  // Append 64-bit little-endian bit length
  for (let i = 0; i < 8; i++) {
    msgBytes.push(Math.floor(bitLen / Math.pow(2, 8 * i)) & 0xff);
  }

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let offset = 0; offset < msgBytes.length; offset += 64) {
    const M: number[] = [];
    for (let j = 0; j < 16; j++) {
      M[j] =
        (msgBytes[offset + j * 4] |
          (msgBytes[offset + j * 4 + 1] << 8) |
          (msgBytes[offset + j * 4 + 2] << 16) |
          (msgBytes[offset + j * 4 + 3] << 24)) >>>
        0;
    }
    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;
    for (let i = 0; i < 64; i++) {
      let F: number;
      let g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = addUnsigned(
        addUnsigned(addUnsigned(addUnsigned(F >>> 0, A), K[i]), M[g]),
        0
      );
      A = D;
      D = C;
      C = B;
      B = addUnsigned(B, leftRotate(F, s[i]));
    }
    a0 = addUnsigned(a0, A);
    b0 = addUnsigned(b0, B);
    c0 = addUnsigned(c0, C);
    d0 = addUnsigned(d0, D);
  }

  const toHexLE = (n: number): string => {
    let out = "";
    for (let i = 0; i < 4; i++) {
      out += (((n >>> (8 * i)) & 0xff).toString(16)).padStart(2, "0");
    }
    return out;
  };
  return toHexLE(a0) + toHexLE(b0) + toHexLE(c0) + toHexLE(d0);
};

const bytesToHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const HashGenerator = () => {
  const [input, setInput] = useState(DEMO_INPUT);
  const [hashes, setHashes] = useState<HashResults | null>(DEMO_HASHES);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const charCount = input.length;
  const byteCount = new TextEncoder().encode(input).length;

  const generateHashes = async () => {
    if (!input.trim()) {
      toast({ variant: "destructive", title: "Empty Input", description: "Please enter text to hash." });
      return;
    }
    if (typeof crypto === "undefined" || !crypto.subtle) {
      toast({ variant: "destructive", title: "Not Supported", description: "Web Crypto API is unavailable. Use HTTPS or a modern browser." });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    setIsGenerating(true);

    try {
      // Generate SHA-1
      const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
      const sha1 = bytesToHex(sha1Buffer);

      // Generate SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      const sha256 = bytesToHex(sha256Buffer);

      const md5 = md5Hash(input);

      setHashes({ md5, sha1, sha256 });
      toast({ title: "Hashes Generated", description: "MD5, SHA-1 and SHA-256 computed." });
    } catch {
        toast({ variant: "destructive", title: "Hashing failed", description: "Could not generate hashes. Your browser might not support the Web Crypto API securely." });
    } finally {
      setIsGenerating(false);
    }
  };

  // Demo hashes above keep the output visible instantly; regeneration happens on demand.

  const copyHash = async (hash: string, type: string) => {
    if (!hash) {
      toast({ variant: "destructive", title: "Nothing to copy", description: "Generate hashes first." });
      return;
    }
    try {
      await navigator.clipboard.writeText(hash);
      toast({ title: "Copied", description: `${type} copied to clipboard.` });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const clear = () => {
    setInput("");
    setHashes(null);
    toast({ title: "Cleared", description: "Input and hashes cleared." });
  };

  return (
      <CalculatorLayout
        title="Hash Generator"
        description="Generate MD5, SHA-1, and SHA-256 hashes"
        keywords="hash generator, md5 generator, sha1 generator, sha256 generator, checksum generator, hash calculator"
        canonicalUrl="/tool/hash-generator"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <Card className="p-6 space-y-4">
            <Label className="text-sm font-medium" htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="min-h-[150px]"
            />
            <p className="text-xs text-neutral-500">{charCount} characters • {byteCount} bytes</p>
            
            <div className="flex gap-2">
              <Button onClick={generateHashes} disabled={isGenerating} className="flex-1 gradient-button">
                <Hash className="w-4 h-4 mr-2" />
                Generate Hashes
              </Button>
              <Button onClick={clear} variant="outline" size="icon" className="shrink-0" aria-label="Clear">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {hashes && (
            <div className="space-y-4">
              <Card className="p-6 space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-bold">MD5</Label>
                  <Button variant="outline" size="sm" onClick={() => copyHash(hashes.md5, 'MD5')}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <code className="block p-4 bg-muted/50 rounded-lg font-mono text-sm break-all">
                  {hashes.md5}
                </code>
              </Card>

              <Card className="p-6 space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-bold">SHA-1</Label>
                  <Button variant="outline" size="sm" onClick={() => copyHash(hashes.sha1, 'SHA-1')}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <code className="block p-4 bg-muted/50 rounded-lg font-mono text-sm break-all">
                  {hashes.sha1}
                </code>
              </Card>

              <Card className="p-6 space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-bold">SHA-256</Label>
                  <Button variant="outline" size="sm" onClick={() => copyHash(hashes.sha256, 'SHA-256')}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <code className="block p-4 bg-muted/50 rounded-lg font-mono text-sm break-all">
                  {hashes.sha256}
                </code>
              </Card>
            </div>
          )}
        </div>

        <CalculatorContentSection
          aboutContent="The Hash Generator creates cryptographic hash values from any input text using MD5, SHA-1, and SHA-256 algorithms. Hashing is a one-way cryptographic function that converts data of any size into a fixed-length string of characters, called a hash or digest. These hashes are deterministic (same input always produces the same hash) but practically irreversible (you cannot retrieve the original text from the hash). Hash functions are fundamental to data security, password storage, digital signatures, file integrity verification, and blockchain technology. This tool helps developers, security professionals, and IT administrators generate and verify hashes for various security and verification purposes."
          useCases={[
            { title: "Password Hashing", description: "Generate hashes for password storage. Never store plain-text passwords - store only the hash. When users log in, hash their input and compare hashes for authentication." },
            { title: "File Integrity Verification", description: "Create checksums for files to verify they haven't been corrupted or tampered with during transfer. Compare hash before and after download to ensure file integrity." },
            { title: "Digital Signatures", description: "Generate unique identifiers for documents or data. Hashes serve as digital fingerprints proving authenticity and detecting any modifications to original content." },
            { title: "Data Deduplication", description: "Identify duplicate data by comparing hashes instead of entire files. Identical hashes indicate identical content, making deduplication efficient." },
            { title: "Version Control", description: "Git and other version control systems use SHA hashes to uniquely identify commits, track changes, and ensure code repository integrity." },
            { title: "API Security", description: "Create secure tokens, verify webhook signatures, and implement HMAC authentication for API requests using cryptographic hashes." }
          ]}
          tips={[
            { title: "Choose the Right Algorithm", description: "SHA-256 is currently the most secure standard for general use. MD5 and SHA-1 are considered cryptographically broken for security purposes but remain useful for non-cryptographic checksums. Use SHA-256 for security-critical applications." },
            { title: "Add Salt for Passwords", description: "Never hash passwords without adding salt (random data). Rainbow tables can crack unsalted password hashes. Use bcrypt, scrypt, or Argon2 for password hashing in production, not these simple hashes." },
            { title: "Hashing Is One-Way", description: "You cannot reverse a hash to get the original text. Hashing is intentionally irreversible. If you need encryption you can decrypt later, use encryption algorithms like AES, not hashing." },
            { title: "Case Sensitivity Matters", description: "Hashing is case-sensitive. 'Password' and 'password' produce completely different hashes. Even a single character difference creates an entirely different hash value." },
            { title: "Use for Verification, Not Encryption", description: "Hashes verify data integrity and authenticity but don't encrypt data. For confidentiality, use encryption. For verification, use hashing. They serve different security purposes." }
          ]}
          faqs={[
            { question: "What's the difference between MD5, SHA-1, and SHA-256?", answer: "MD5 produces 128-bit hashes, SHA-1 produces 160-bit hashes, and SHA-256 produces 256-bit hashes. Longer hashes are more secure. MD5 and SHA-1 are deprecated for security use due to collision vulnerabilities. SHA-256 is currently the recommended standard for secure applications." },
            { question: "Can hashes be reversed or decrypted?", answer: "No, cryptographic hash functions are one-way by design. You cannot reverse a hash to get the original input. However, weak passwords can be cracked using rainbow tables (precomputed hash databases) or brute force, which is why salting is crucial for password storage." },
            { question: "What is a hash collision?", answer: "A collision occurs when two different inputs produce the same hash output. While mathematically possible, good hash functions make collisions extremely rare. MD5 and SHA-1 have known collision vulnerabilities, which is why they're deprecated. SHA-256 is collision-resistant for practical purposes." },
            { question: "Why are MD5 and SHA-1 considered insecure?", answer: "Researchers have demonstrated practical collision attacks against MD5 and SHA-1, meaning attackers can create two different files with identical hashes. This breaks their security guarantee. While still useful for checksums, don't use them for passwords, digital signatures, or security-critical applications. Use SHA-256 or higher." },
            { question: "How do I verify a file's integrity with hashes?", answer: "Download the file and generate its hash. Compare it with the hash provided by the source (usually displayed on download pages). If hashes match exactly, the file is authentic and uncorrupted. Even one bit difference creates a completely different hash, detecting any tampering or corruption." },
            { question: "Should I use this tool for storing passwords in my application?", answer: "No. This tool uses simple hashing suitable for demonstrations and checksums. For production password storage, use dedicated password hashing functions like bcrypt, scrypt, or Argon2 that include built-in salting, stretching, and are designed specifically to resist brute-force attacks." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default HashGenerator;
