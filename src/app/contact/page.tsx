'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";
import LegalPageLayout from "@/components/LegalPageLayout";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <LegalPageLayout title="Contact Us">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Help</h3>
                  <p className="text-muted-foreground">
                    For general inquiries and support:
                  </p>
                  <a href="mailto:help@primemetric.online" className="text-primary hover:underline">
                    help@primemetric.online
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-start space-x-4">
                <MessageSquare className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">New Request</h3>
                   <p className="text-muted-foreground">
                    Request a new tool or calculator:
                  </p>
                  <a href="mailto:requestnewtool@primemetric.online" className="text-primary hover:underline">
                    requestnewtool@primemetric.online
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </LegalPageLayout>
    </>
  );
};

export default Contact;
