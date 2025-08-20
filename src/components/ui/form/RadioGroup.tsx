// RadioGroup.tsx — Light/dark Mode
"use client";
import React, { useId, useState, useCallback, forwardRef } from "react";
import { cn, stylesFor } from "@utils";
import type { Mode } from "@types";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  /** Optional: also expose native onChange from the inputs */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  options: RadioOption[];
  direction?: "row" | "col";
  label?: string;
  description?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  containerClassName?: string;
  className?: string;
  mode?: Mode;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      value: controlled,
      defaultValue,
      onValueChange,
      onChange: nativeOnChange,
      options,
      direction = "col",
      label,
      description,
      name,
      disabled,
      required,
      containerClassName,
      className,
      mode = "dark",
    },
    ref
  ) {
    const s = stylesFor(mode);
    const autoId = useId();
    const groupName = name ?? `rg-${autoId}`;
    const descId = description ? `${groupName}-desc` : undefined;

    const isControlled = controlled !== undefined;
    const [internal, setInternal] = useState<string>(defaultValue ?? "");
    const val = isControlled ? controlled ?? "" : internal;

    const isDark = mode === "dark";

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const next = e.target.value;
        if (!isControlled) setInternal(next);
        onValueChange?.(next); // ✅ emit immediately so parent updates
        nativeOnChange?.(e); // ✅ forward native event if caller wants it
      },
      [disabled, isControlled, onValueChange, nativeOnChange]
    );

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex w-full max-w-sm flex-col gap-1",
          containerClassName
        )}
        role="radiogroup"
        aria-describedby={descId}
      >
        {label ? <div className={s.label}>{label}</div> : null}
        {description ? (
          <p id={descId} className={s.description}>
            {description}
          </p>
        ) : null}

        <div
          className={cn(
            "flex gap-3",
            direction === "row" ? "flex-row" : "flex-col",
            className
          )}
        >
          {options.map((opt) => {
            const id = `${groupName}-${opt.value}`;
            const optDisabled = disabled || opt.disabled;
            return (
              <label
                key={opt.value}
                htmlFor={id}
                className="inline-flex items-start gap-2"
              >
                <input
                  id={id}
                  type="radio"
                  name={groupName}
                  value={opt.value}
                  checked={val === opt.value}
                  onChange={handleChange}
                  disabled={optDisabled}
                  required={required}
                  className={cn(
                    "h-4 w-4",
                    "accent-template-yellow focus:outline-none focus:ring-2 focus:ring-template-yellow",
                    optDisabled && s.disabled
                  )}
                />
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm",
                      isDark ? "text-template-white" : "text-template-black"
                    )}
                  >
                    {opt.label}
                  </span>
                  {opt.description ? (
                    <span className={s.description}>{opt.description}</span>
                  ) : null}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  }
);

export default RadioGroup;
