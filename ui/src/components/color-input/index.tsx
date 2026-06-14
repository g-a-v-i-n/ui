import React from "react";
import { HexColorPicker } from "react-colorful";

import { TextInput } from "../text-input";
import { PopoverRoot, PopoverAnchor, PopoverContent } from "../popover";
import styles from "./styles.module.css";

type ColorInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "value" | "defaultValue" | "onChange" | "width"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  width?: "fill" | "hug" | number;
  variant?: "default" | "toolbar";
  containerClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
};

const HEX_RE = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const isValidHex = (s: string) => HEX_RE.test(s.trim());
const withHash = (s: string) => (s.startsWith("#") ? s : `#${s}`);

export const ColorInput = ({
  value,
  defaultValue = "#000000",
  onValueChange,
  width = "hug",
  variant = "default",
  className = "",
  containerClassName = "",
  onClick,
  ref,
  ...props
}: ColorInputProps) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? (value as string) : internal;

  const commit = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  // The field keeps its own text buffer so partial/invalid edits (e.g. "#ff")
  // don't fight the committed color or the swatch.
  const [text, setText] = React.useState(current);
  React.useEffect(() => setText(current), [current]);

  const [open, setOpen] = React.useState(false);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setText(raw);
    if (isValidHex(raw)) commit(withHash(raw).toLowerCase());
  };

  // What the picker and swatch render: the live text if it's a valid hex,
  // otherwise the last committed color.
  const color = isValidHex(text) ? withHash(text.trim()) : current;

  return (
    <PopoverRoot open={open} onOpenChange={setOpen}>
      <PopoverAnchor>
        <TextInput
          {...props}
          ref={ref}
          width={width}
          variant={variant}
          value={text}
          onChange={handleText}
          onClick={(e) => {
            setOpen(true);
            onClick?.(e);
          }}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
          className={className}
          containerClassName={containerClassName}
          prefixSlot={
            <span
              className={styles.swatch}
              style={{ background: color }}
              onClick={() => setOpen(true)}
            />
          }
        />
      </PopoverAnchor>
      <PopoverContent
        className={styles.content}
        // Keep focus in the input so the user can keep typing while picking.
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <HexColorPicker color={color} onChange={commit} />
      </PopoverContent>
    </PopoverRoot>
  );
};
