"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { ContactFormData } from "@/types";

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
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Name
          <input
            required
            name="name"
            value={formData.name}
            onChange={onChange}
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none ring-offset-2 focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Email
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none ring-offset-2 focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
        Message
        <textarea
          required
          name="message"
          value={formData.message}
          onChange={onChange}
          rows={6}
          className="rounded-xl border border-slate-300 px-3 py-2 outline-none ring-offset-2 focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
        />
      </label>

      <button
        type="submit"
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Send Message
      </button>

      {isSubmitted ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Thanks. Your message was captured locally for now.
        </p>
      ) : null}
    </form>
  );
}
