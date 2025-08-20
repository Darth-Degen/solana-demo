// ExampleForm.tsx
"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@utils";
import type { Mode } from "@types";
import {
  NumberInput,
  RadioGroup,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@components";

type FormState = {
  name: string;
  email: string;
  password: string; // using TextInput as a password field for now
  about: string;
  qty: number | null;
  agree: boolean;
  newsletter: boolean;
  country: string;
  plan: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  about: "",
  qty: 1,
  agree: false,
  newsletter: true,
  country: "",
  plan: "free",
};

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
];

const plans = [
  { value: "free", label: "Free", description: "Basic features" },
  { value: "pro", label: "Pro", description: "For growing teams" },
  { value: "enterprise", label: "Enterprise", description: "Custom needs" },
];

function ExampleFormCard({ mode, title }: { mode: Mode; title: string }) {
  const [data, setData] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setData((d) => ({ ...d, [key]: value }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(data);
    // You can swap this for your own submit handler
    console.log("Submit:", data);
  };

  const handleReset = () => {
    setData(initialState);
    setSubmitted(null);
  };

  return (
    <div
      className={cn(
        "w-full rounded p-4 md:p-6",
        mode === "dark"
          ? "bg-template-black text-template-white"
          : "bg-template-white text-template-black"
      )}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:min-w-[600px]"
      >
        <TextInput
          label="Full Name"
          placeholder="Jane Doe"
          required
          value={data.name}
          onValueChange={(v) => set("name", v)}
          mode={mode}
        />

        <TextInput
          label="Email"
          placeholder="you@example.com"
          type="email"
          required
          value={data.email}
          onValueChange={(v) => set("email", v)}
          mode={mode}
        />

        {/* Using TextInput as password for now. If you add PasswordInput later, swap it here. */}
        <TextInput
          label="Password"
          placeholder="••••••••"
          type="password"
          required
          minLength={8}
          description="Minimum 8 characters"
          value={data.password}
          onValueChange={(v) => set("password", v)}
          mode={mode}
        />

        <Textarea
          label="About"
          placeholder="Tell us a bit about yourself..."
          maxLength={180}
          value={data.about}
          onValueChange={(v) => set("about", v)}
          mode={mode}
        />

        <NumberInput
          label="Quantity"
          min={1}
          max={100}
          integerOnly
          clamp
          value={data.qty ?? ""} // keep this
          onValueChange={(n: number | null) => set("qty", n)} // will now fire correctly
          mode={mode}
        />

        <Switch
          label="Subscribe to newsletter"
          description="Occasional updates, no spam."
          checked={data.newsletter}
          onCheckedChange={(v: boolean) => set("newsletter", v)}
          mode={mode}
        />

        <Select
          label="Country"
          placeholder="Select a country"
          options={countries}
          value={data.country}
          onValueChange={(v: string) => set("country", v)}
          mode={mode}
          required
        />

        <RadioGroup
          label="Plan"
          description="Choose the plan that fits you"
          options={plans}
          value={data.plan}
          onValueChange={(v: string) => set("plan", v)}
          mode={mode}
          direction="col"
        />

        {/* Actions */}
        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            className={cn(
              "rounded px-4 py-2 text-sm font-medium",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              mode === "dark"
                ? "bg-template-yellow text-template-black hover:opacity-90 focus:ring-template-yellow"
                : "bg-template-yellow text-template-black hover:opacity-90 focus:ring-template-yellow"
            )}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleReset}
            className={cn(
              "rounded px-4 py-2 text-sm font-medium border",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              mode === "dark"
                ? "border-white/20 text-template-white hover:bg-white/10 focus:ring-template-yellow"
                : "border-black/10 text-template-black hover:bg-black/5 focus:ring-template-yellow"
            )}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Debug / preview */}
      <div className="mt-6 text-xs opacity-80">
        <div className="font-semibold mb-1">Live state</div>
        <pre
          className="overflow-auto rounded p-3 border text-xs"
          style={{ maxHeight: 180 }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>

        {submitted && (
          <>
            <div className="font-semibold mt-3 mb-1">Last submitted</div>
            <pre
              className="overflow-auto rounded p-3 border text-xs"
              style={{ maxHeight: 180 }}
            >
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}

export default function ExampleForm() {
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ExampleFormCard mode="dark" title="Example Form — Dark" />
        <ExampleFormCard mode="light" title="Example Form — Light" />
      </div>
    </div>
  );
}
