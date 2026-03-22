"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { ContactFormData } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialState: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setFormData(initialState);
  };

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-none">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                required
                name="name"
                value={formData.name}
                onChange={onChange}
                className="border-slate-300 focus-visible:ring-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="border-slate-300 focus-visible:ring-slate-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              required
              name="message"
              value={formData.message}
              onChange={onChange}
              rows={6}
              className="border-slate-300 focus-visible:ring-slate-300"
            />
          </div>

          <Button type="submit" className="rounded-full px-6 py-3 text-sm font-semibold">
            Send Message
          </Button>

          {isSubmitted ? (
            <Alert variant="success" className="rounded-xl">
              <AlertDescription>Thanks. Your message was captured locally for now.</AlertDescription>
            </Alert>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
