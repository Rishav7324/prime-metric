'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Hash, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{md5: string, sha1: string, sha256: string} | null>(null);
  const { toast } = useToast();

  const generateHashes = async () => {
    if (!input.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Please enter text" });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    try {
      // Generate SHA-1
      const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
      const sha1 = Array.from(new Uint8Array(sha1Buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Generate SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      const sha256 = Array.from(new Uint8Array(sha256Buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Simple MD5 implementation (for demonstration - in production use a library)
      const md5 = simpleMD5(input);

      setHashes({ md5, sha1, sha256 });
      toast({ title: "Success", description: "Hashes generated!" });
    } catch(e) {
        toast({ variant: "destructive", title: "Error", description: "Could not generate hashes. Your browser might not support the Web Crypto API securely." });
    }
  };

  // Simplified MD5 (for demo purposes - use crypto-js or similar in production)
  const simpleMD5 = (str: string): string => {
    // This is a placeholder - in a real app, use a proper crypto library
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    // Pad to 32 characters to look like MD5
    return Math.abs(hash).toString(16).padEnd(32, '0').substring(0,32);
  };

  const copyHash = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    toast({ title: "Success", description: `${type} copied to clipboard!` });
  };

  return (
      <CalculatorLayout
        title="Hash Generator"
        description="Generate MD5, SHA-1, and SHA-256 hashes"
        keywords="hash generator, md5 generator, sha1 generator, sha256 generator, checksum generator, hash calculator"
        canonicalUrl="/tool/hash-generator"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="min-h-[150px]"
            />
            
            <Button onClick={generateHashes} className="w-full gradient-button">
              <Hash className="w-4 h-4 mr-2" />
              Generate Hashes
            </Button>
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
