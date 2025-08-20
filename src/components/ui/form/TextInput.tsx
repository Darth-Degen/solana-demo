"use client";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useId,
  useState,
  useCallback,
} from "react";
import { cn, stylesFor } from "@utils";
import { Mode } from "@types";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** Debounced change callback with the current string value */
  onValueChange?: (value: string) => void;
  /** Debounce delay in ms for onValueChange (default 300) */
  debounceMs?: number;
  /** Optional label & helper text */
  label?: string;
  description?: string;
  /** Wrapper class for label+input column */
  containerClassName?: string;
  /** Force mode; defaults to "dark" */
  mode?: Mode;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      id,
      type = "text",
      onValueChange,
      debounceMs = 300,
      label,
      description,
      className,
      containerClassName,
      disabled,
      value: controlledValue,
      defaultValue,
      mode = "dark",
      ...rest
    },
    ref
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const descId = description ? `${inputId}-desc` : undefined;
    const s = stylesFor(mode);

    const isControlled = controlledValue !== undefined;
    const [internal, setInternal] = useState<string>(
      defaultValue !== undefined ? String(defaultValue) : ""
    );
    const raw = isControlled ? String(controlledValue ?? "") : internal;

    // Debounced emit
    useEffect(() => {
      if (!onValueChange) return;
      const t = window.setTimeout(
        () => onValueChange(raw),
        Math.max(0, debounceMs)
      );
      return () => window.clearTimeout(t);
    }, [raw, debounceMs, onValueChange]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        if (!isControlled) setInternal(next);
      },
      [isControlled]
    );

    return (
      <div
        className={cn(
          "inline-flex w-full max-w-sm flex-col gap-1",
          containerClassName
        )}
      >
        {label ? (
          <label htmlFor={inputId} className={s.label}>
            {label}
          </label>
        ) : null}

        <input
          id={inputId}
          ref={ref}
          type={type}
          disabled={disabled}
          value={raw}
          onChange={(e) => onValueChange?.(e.target.value)}
          aria-describedby={descId}
          className={cn(
            s.inputBase,
            mode === "dark" && "autofill-dark",
            disabled && s.disabled,
            className
          )}
          {...rest}
        />

        {description ? (
          <p id={descId} className={s.description}>
            {description}
          </p>
        ) : null}
      </div>
    );
  }
);

export default TextInput;

/*
USAGE

<TextInput
  label="Username"
  placeholder="Enter username"
  maxLength={30}
  mode="light"
  onValueChange={(v) => console.log(v)}
/>

// Controlled
const [name, setName] = useState("");
<TextInput
  label="Name"
  value={name}
  mode="dark"
  onValueChange={setName}
/>
*/
