import React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { TextInput } from "../text-input";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export type ComboboxItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

type ComboboxProps = {
  items: ComboboxItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Shown when the query matches no items. */
  emptyMessage?: string;
  /** Override the default case-insensitive substring match on `label`. */
  filter?: (item: ComboboxItem, query: string) => boolean;
  width?: "fill" | "hug" | number;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
};

const defaultFilter = (item: ComboboxItem, query: string) =>
  item.label.toLowerCase().includes(query.toLowerCase());

export const Combobox = ({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  emptyMessage = "No results",
  filter = defaultFilter,
  width = "hug",
  disabled,
  className = "",
  containerClassName = "",
}: ComboboxProps) => {
  const baseId = React.useId();
  const listId = `${baseId}-list`;
  const optionId = (i: number) => `${baseId}-opt-${i}`;
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;

  const selectedItem = items.find((it) => it.value === currentValue);

  const [inputValue, setInputValue] = React.useState(selectedItem?.label ?? "");
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Reflect external value changes (and selection) back into the text field.
  React.useEffect(() => {
    setInputValue(selectedItem?.label ?? "");
  }, [selectedItem?.label]);

  const query = inputValue.trim();
  // Right after a selection the field holds the selected label — show the full
  // list rather than filtering down to the one already-chosen item.
  const showAll = !!selectedItem && query === selectedItem.label;
  const filtered = showAll ? items : items.filter((it) => filter(it, query));

  const clampedActive = Math.min(activeIndex, Math.max(0, filtered.length - 1));

  const commit = (item: ComboboxItem) => {
    if (item.disabled) return;
    if (!isControlled) setInternalValue(item.value);
    onValueChange?.(item.value);
    setInputValue(item.label);
    setOpen(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      // Discard a partial query — revert to the committed selection's label.
      setInputValue(selectedItem?.label ?? "");
    }
  };

  // Move highlight to the next/previous enabled option.
  const move = (dir: 1 | -1) => {
    if (!filtered.length) return;
    let i = clampedActive;
    for (let step = 0; step < filtered.length; step++) {
      i = (i + dir + filtered.length) % filtered.length;
      if (!filtered[i].disabled) break;
    }
    setActiveIndex(i);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) move(-1);
        break;
      case "Enter":
        if (open && filtered[clampedActive]) {
          e.preventDefault();
          commit(filtered[clampedActive]);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          handleOpenChange(false);
        }
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(filtered.length - 1);
        }
        break;
    }
  };

  const chevron = (
    <button
      type="button"
      className={styles.toggle}
      aria-label={open ? "Close" : "Open"}
      tabIndex={-1}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => handleOpenChange(!open)}
    >
      <SFSymbol symbol="􀆈" size="sm" />
    </button>
  );

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Anchor asChild>
        <div
          ref={anchorRef}
          className={`${styles.anchor} ${containerClassName}`}
          data-width={typeof width === "number" ? "number" : width}
        >
          <TextInput
            width={width}
            disabled={disabled}
            placeholder={placeholder}
            value={inputValue}
            className={className}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open ? optionId(clampedActive) : undefined}
            onChange={(e) => {
              setInputValue(e.target.value);
              setActiveIndex(0);
              if (!open) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setOpen(true)}
            suffixSlot={chevron}
          />
        </div>
      </PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          collisionPadding={12}
          className={styles.content}
          // Keep focus in the input so typing/arrow-nav continues uninterrupted.
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          // The input/toggle live outside the content, so clicking or focusing
          // them would otherwise trip the dismiss layer and close immediately.
          onInteractOutside={(e) => {
            const target = e.detail.originalEvent.target as Node | null;
            if (target && anchorRef.current?.contains(target)) {
              e.preventDefault();
            }
          }}
        >
          <div role="listbox" id={listId} className={styles.list}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <Text as="span" size="sm" color="tertiary">
                  {emptyMessage}
                </Text>
              </div>
            ) : (
              filtered.map((item, i) => {
                const selected = item.value === currentValue;
                return (
                  <div
                    key={item.value}
                    id={optionId(i)}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={item.disabled || undefined}
                    data-active={i === clampedActive || undefined}
                    data-selected={selected || undefined}
                    data-disabled={item.disabled || undefined}
                    className={styles.option}
                    onPointerMove={() => !item.disabled && setActiveIndex(i)}
                    onClick={() => commit(item)}
                  >
                    <span className={styles.indicator} aria-hidden="true">
                      {selected && <SFSymbol symbol="✓" size="sm" />}
                    </span>
                    <Text as="span" size="sm" color="inherit">
                      {item.label}
                    </Text>
                  </div>
                );
              })
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
