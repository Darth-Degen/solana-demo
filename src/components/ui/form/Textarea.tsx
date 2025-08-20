"use client";
import React, {
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useId,
  useState,
  useCallback,
  ChangeEvent,
  useLayoutEffect,
} from "react";
import { cn, stylesFor } from "@utils";
import type { Mode } from "@types";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Debounced value-only callback. Set debounceMs=0 for immediate. */
  onValueChange?: (value: string) => void;
  /** Debounce delay (ms) for onValueChange; default 300 */
  debounceMs?: number;
  /** Optional label & helper text */
  label?: string;
  description?: string;
  /** Wrapper class for label+input column */
  containerClassName?: string;
  /** Force mode; defaults to "dark" */
  mode?: Mode;
  /** Auto-resize height to fit content */
  autoResize?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      id,
      label,
      description,
      className,
      containerClassName,
      disabled,
      mode = "dark",

      value: controlledValue,
      defaultValue,

      onChange: nativeOnChange,
      onValueChange,
      debounceMs = 300,

      rows = 4,
      autoResize = false,

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

    // Debounced value-only callback
    useEffect(() => {
      if (!onValueChange) return;
      if (debounceMs <= 0) {
        onValueChange(raw);
        return;
      }
      const t = window.setTimeout(() => onValueChange(raw), debounceMs);
      return () => window.clearTimeout(t);
    }, [raw, debounceMs, onValueChange]);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        const next = e.target.value;
        if (!isControlled) setInternal(next);
        nativeOnChange?.(e);
        if (autoResize) {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = `${el.scrollHeight}px`;
        }
      },
      [isControlled, nativeOnChange, autoResize]
    );

    // Resize when controlled value changes
    useLayoutEffect(() => {
      if (!autoResize) return;
      const el = document.getElementById(inputId) as HTMLTextAreaElement | null;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }, [raw, autoResize, inputId]);

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

        <textarea
          id={inputId}
          ref={ref}
          disabled={disabled}
          value={raw}
          onChange={handleChange}
          aria-describedby={descId}
          rows={rows}
          className={cn(
            s.inputBase, // reuse your input styles
            "resize-y", // allow vertical resize; or use 'resize-none'
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

export default Textarea;
