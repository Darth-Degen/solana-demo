// Select.tsx — native <select>, controlled/uncontrolled
"use client";
import React, {
  forwardRef,
  SelectHTMLAttributes,
  useCallback,
  useId,
  useState,
} from "react";
import { cn, stylesFor } from "@utils";
import type { Mode, SelectOption } from "@types";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  /** Value-only callback */
  onValueChange?: (v: string) => void;
  /** Also expose native onChange if caller wants the event */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  label?: string;
  description?: string;
  containerClassName?: string;
  className?: string;
  disabled?: boolean;
  mode?: Mode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    id,
    options,
    placeholder,
    value: controlled,
    defaultValue,
    onValueChange,
    onChange: nativeOnChange,
    label,
    description,
    containerClassName,
    className,
    disabled,
    mode = "dark",
    ...rest
  },
  ref
) {
  const s = stylesFor(mode);
  const autoId = useId();
  const selectId = id ?? autoId;
  const descId = description ? `${selectId}-desc` : undefined;

  const isControlled = controlled !== undefined;
  const [internal, setInternal] = useState<string>(defaultValue ?? "");
  const val = isControlled ? controlled ?? "" : internal;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const next = e.target.value;
      if (!isControlled) setInternal(next);
      // ✅ emit immediately so controlled parents update
      onValueChange?.(next);
      // ✅ still forward the real event if consumer wants it
      nativeOnChange?.(e);
    },
    [isControlled, onValueChange, nativeOnChange]
  );

  const isDark = mode === "dark";
  const chevron = (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={cn(
        "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4",
        isDark ? "fill-template-white/70" : "fill-template-black/70"
      )}
    >
      <path d="M5.5 7.5a1 1 0 0 1 1.4 0L10 10.1l3.1-2.6a1 1 0 1 1 1.3 1.5l-3.8 3.2a1 1 0 0 1-1.3 0L5.5 9a1 1 0 0 1 0-1.5z" />
    </svg>
  );

  return (
    <div
      className={cn(
        "inline-flex w-full max-w-sm flex-col gap-1",
        containerClassName
      )}
    >
      {label ? (
        <label htmlFor={selectId} className={s.label}>
          {label}
        </label>
      ) : null}

      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          value={val}
          onChange={handleChange}
          aria-describedby={descId}
          className={cn(
            s.inputBase,
            "appearance-none pr-8", // space for chevron
            disabled && s.disabled,
            className
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        {chevron}
      </div>

      {description ? (
        <p id={descId} className={s.description}>
          {description}
        </p>
      ) : null}
    </div>
  );
});

export default Select;

/* 
  <Select
    label="Country"
    placeholder="Select a country"
    options={countries}
    value={data.country}
    onValueChange={(v) => set("country", v)}
    mode={mode}
    required
  />
*/
