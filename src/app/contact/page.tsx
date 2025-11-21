
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";
import LegalPageLayout from "@/components/LegalPageLayout";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not connect to our services. Please try again later.",
      });
      return;
    }

    const messagesCollection = collection(firestore, "messages");
    addDocumentNonBlocking(messagesCollection, {
      senderName: name,
      senderEmail: email,
      messageContent: message,
      sentAt: serverTimestamp(),
    });

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
        <p className="text-muted-foreground text-center mb-8">We'd love to hear from you. Whether you have a question, a suggestion for a new calculator, or just want to say hello, please don't hesitate to reach out.</p>
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
                  <h3 className="font-semibold text-lg mb-2">General Inquiries & Support</h3>
                  <p className="text-muted-foreground">
                    For general questions, support, or feedback:
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
                  <h3 className="font-semibold text-lg mb-2">Feature Requests</h3>
                   <p className="text-muted-foreground">
                    Have an idea for a new tool or calculator?
                  </p>
                  <a href="mailto:help@primemetric.online?subject=Feature%20Request" className="text-primary hover:underline">
                    help@primemetric.online
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
