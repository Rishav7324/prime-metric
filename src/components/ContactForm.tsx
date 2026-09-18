'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';

export function ContactForm() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast({ variant: "destructive", title: "Invalid Name", description: "Please enter your name." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address." });
      return;
    }
    if (message.trim().length < 10) {
      toast({ variant: "destructive", title: "Message Too Short", description: "Please write at least 10 characters." });
      return;
    }
    if (!firestore) {
      toast({ variant: "destructive", title: "Unavailable", description: "Please try again in a moment." });
      return;
    }
    setSending(true);
    try {
      addDocumentNonBlocking(collection(firestore, "messages"), {
        senderName: name.trim(),
        senderEmail: email.trim(),
        messageContent: message.trim(),
        sentAt: serverTimestamp(),
      });
      setName(''); setEmail(''); setMessage('');
      toast({ title: "Message Sent", description: "Thanks for reaching out! We reply within 24–72 hours." });
    } catch {
      toast({ variant: "destructive", title: "Send Failed", description: "Please try again or email us directly." });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur">
      <h2 className="text-xl font-semibold mb-2">Send Us a Message</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Fill out the form below and we&apos;ll get back to you within 24–72 hours.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label htmlFor="contact-name" className="text-sm font-medium">Your Name</Label>
          <Input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Rahul Sharma"
            className="mt-1.5 h-10 text-sm bg-white"
            maxLength={100}
          />
        </div>
        <div>
          <Label htmlFor="contact-email" className="text-sm font-medium">Email Address</Label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1.5 h-10 text-sm bg-white"
            maxLength={150}
          />
        </div>
        <div>
          <Label htmlFor="contact-message" className="text-sm font-medium">Message</Label>
          <Textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help? Include the tool name if reporting an issue..."
            className="mt-1.5 min-h-32 text-sm bg-white"
            maxLength={2000}
          />
        </div>
        <Button type="submit" disabled={sending} className="w-full sm:w-auto h-10">
          {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          {sending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}
