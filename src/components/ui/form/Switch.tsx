// Switch.tsx — Light/dark Mode
"use client";
import React, {
  forwardRef,
  useCallback,
  useId,
  useState,
  ButtonHTMLAttributes,
} from "react";
import { cn, stylesFor } from "@utils";
import { Mode } from "@types";

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  label?: string;
  description?: string;
  containerClassName?: string;
  className?: string;
  disabled?: boolean;
  mode?: Mode; // "dark" | "light"
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    id,
    checked: controlledChecked,
    defaultChecked,
    onCheckedChange,
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
  const isControlled = controlledChecked !== undefined;
  const [uncontrolled, setUncontrolled] = useState<boolean>(!!defaultChecked);
  const isOn = isControlled ? !!controlledChecked : uncontrolled;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descId = description ? `${inputId}-desc` : undefined;
  const isDark = mode === "dark";

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  }, [disabled, isOn, isControlled, onCheckedChange]);

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

      <div className="flex items-center gap-2">
        <button
          id={inputId}
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isOn}
          aria-describedby={descId}
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            // track
            "relative inline-flex h-6 w-10 transition-colors focus:outline-none focus:ring-offset-0 rounded-full",
            isOn
              ? isDark
                ? "bg-template-yellow"
                : "bg-template-yellow"
              : isDark
              ? "bg-white/20"
              : "bg-black/10",
            disabled && s.disabled,
            className
          )}
          {...rest}
        >
          {/* thumb */}
          <span
            className={cn(
              "pointer-events-none inline-block h-5 w-5 translate-x-0.5 rounded-full transform transition self-center",
              isDark ? "bg-template-black" : "bg-template-white",
              isOn && "translate-x-[1.15rem]" // 22px
            )}
          />
        </button>

        {description ? (
          <p id={descId} className={s.description}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
});

export default Switch;
