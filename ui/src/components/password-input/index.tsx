import React from "react";
import { TextInput } from "../text-input";
import styles from "./styles.module.css";

// Self-masked password field. Native type=password renders UA-defined bullets
// that CSS can't restyle, so to show asterisks we hold the real value and feed
// the input a masked string (type=text). This trades away password-manager
// autofill for control over the mask glyph.
const MASK = "*";

type PasswordInputProps = Omit<
  React.ComponentProps<typeof TextInput>,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ref?: React.Ref<HTMLInputElement>;
};

// Recover the real value after the browser edited the masked string. The masked
// string is all MASK chars, so a leading/trailing run of MASK in `displayed` is
// unchanged text; the middle is freshly typed/pasted real characters.
const reconstruct = (oldReal: string, displayed: string) => {
  const oldMask = MASK.repeat(oldReal.length);
  const max = Math.min(oldMask.length, displayed.length);

  let p = 0;
  while (p < max && oldMask[p] === displayed[p]) p++;

  let s = 0;
  while (
    s < max - p &&
    oldMask[oldMask.length - 1 - s] === displayed[displayed.length - 1 - s]
  ) {
    s++;
  }

  const inserted = displayed.slice(p, displayed.length - s);
  return oldReal.slice(0, p) + inserted + oldReal.slice(oldReal.length - s);
};

export const PasswordInput = ({
  value,
  defaultValue,
  onValueChange,
  suffixSlot,
  autoComplete = "off",
  autoCapitalize = "off",
  autoCorrect = "off",
  spellCheck = false,
  ref,
  ...props
}: PasswordInputProps) => {
  const [visible, setVisible] = React.useState(false);

  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const real = isControlled ? value : internal;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const caretRef = React.useRef<number | null>(null);

  // Restore the caret after React rewrites the controlled value to the mask —
  // the edited and masked strings are the same length, so the index is valid.
  React.useLayoutEffect(() => {
    if (caretRef.current != null && inputRef.current) {
      inputRef.current.setSelectionRange(caretRef.current, caretRef.current);
      caretRef.current = null;
    }
  });

  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.RefObject<HTMLInputElement | null>).current = node;
  };

  const display = visible ? real : MASK.repeat(real.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typed = e.target.value;
    caretRef.current = e.target.selectionStart;
    const next = visible ? typed : reconstruct(real, typed);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const toggle = (
    <button
      type="button"
      className={styles.toggle}
      aria-label={visible ? "Hide password" : "Show password"}
      aria-pressed={visible}
      // Keep focus on the input rather than stealing it on mousedown.
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => setVisible((v) => !v)}
    >
      {visible ? "Hide" : "Show"}
    </button>
  );

  return (
    <TextInput
      {...props}
      className={props.className + ' ' + styles.input}
      ref={setRefs}
      type="text"
      value={display}
      onChange={handleChange}
      autoComplete={autoComplete}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      spellCheck={spellCheck}
      suffixSlot={
        suffixSlot ? (
          <span className={styles.suffixGroup}>
            {suffixSlot}
            {toggle}
          </span>
        ) : (
          toggle
        )
      }
    />
  );
};
