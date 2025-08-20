// NumberInput.tsx
"use client";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { cn, stylesFor } from "@utils";
import type { Mode } from "@types";

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onValueChange?: (value: number | null) => void;
  debounceMs?: number;
  integerOnly?: boolean;
  clamp?: boolean;
  clampOnBlur?: boolean;
  label?: string;
  description?: string;
  containerClassName?: string;
  mode?: Mode;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      id,
      onValueChange,
      debounceMs = 100,
      integerOnly = false,
      clamp = true,
      clampOnBlur = true,
      label,
      description,
      className,
      containerClassName,
      disabled,
      value: controlledValue,
      defaultValue,
      min,
      max,
      mode = "dark",
      onChange: nativeOnChange,
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

    // ---- helpers -------------------------------------------------------------
    const parse = useCallback(
      (str: string): number | null => {
        if (str.trim() === "") return null;
        const cleaned = integerOnly
          ? str.replace(/(?!^)-|[^\d-]/g, "") // integers only, allow one leading '-'
          : str.replace(/[^\d.-]/g, ""); // decimals ok
        if (cleaned === "-" || cleaned === "." || cleaned === "-.") return null;

        let n = Number(cleaned);
        if (!Number.isFinite(n)) return null;
        if (integerOnly) n = Math.trunc(n);
        if (clamp) {
          if (typeof min === "number" && n < min) n = min;
          if (typeof max === "number" && n > max) n = max;
        }
        return n;
      },
      [integerOnly, clamp, min, max]
    );

    // Debounce timer
    const tRef = useRef<number | null>(null);
    const scheduleEmit = useCallback(
      (nextRaw: string) => {
        if (!onValueChange) return;
        if (tRef.current) window.clearTimeout(tRef.current);
        tRef.current = window.setTimeout(() => {
          onValueChange(parse(nextRaw));
        }, Math.max(0, debounceMs)) as unknown as number;
      },
      [debounceMs, onValueChange, parse]
    );

    // ---- event handlers ------------------------------------------------------
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let next = e.target.value;

        if (integerOnly) {
          next = next.replace(/(?!^)-|[^\d-]/g, "");
        }

        if (!isControlled) setInternal(next); // update local when uncontrolled
        nativeOnChange?.(e); // always forward native event
        scheduleEmit(next); // <- emit (debounced) for both modes
      },
      [integerOnly, isControlled, nativeOnChange, scheduleEmit]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (!clampOnBlur) return;
        const p = parse(e.currentTarget.value);
        if (!isControlled) setInternal(p === null ? "" : String(p));
        // also push clamped value upstream immediately
        onValueChange?.(p);
      },
      [clampOnBlur, isControlled, onValueChange, parse]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowed = [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End",
          "Tab",
        ];
        if (allowed.includes(e.key)) return;

        if (e.key === "-") {
          const el = e.currentTarget;
          if (el.selectionStart !== 0 || el.value.includes("-"))
            e.preventDefault();
          return;
        }

        if (integerOnly && (e.key === "." || e.key.toLowerCase() === "e")) {
          e.preventDefault();
          return;
        }

        if (!/^\d$/.test(e.key)) {
          if (!(e.key === "." && !integerOnly)) e.preventDefault();
        }
      },
      [integerOnly]
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
          type="text" // keep text for partial states like '-' and '.'
          inputMode={integerOnly ? "numeric" : "decimal"}
          disabled={disabled}
          value={raw}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-describedby={descId}
          className={cn(s.inputBase, disabled && s.disabled, className)}
          min={min as any}
          max={max as any}
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

export default NumberInput;

/*
USAGE

<NumberInput
  label="Quantity"
  description="1–100"
  min={1}
  max={100}
  integerOnly
  clamp
  mode="light"
  onValueChange={(n) => console.log("value:", n)}
/>

// Controlled
const [qty, setQty] = useState<number | null>(10);
<NumberInput
  label="Qty"
  value={qty ?? ""}
  min={0}
  max={999}
  onValueChange={setQty}
  mode="dark"
/>
*/
