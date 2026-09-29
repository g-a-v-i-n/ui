import React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

/* The active trigger renders the underline. When the active tab changes, the
   incoming underline glides in from where the outgoing one was (recorded in
   context as it unmounts) with a transform. At rest it's plain CSS anchored
   to its trigger, so any other layout change — the container resizing or
   content reflowing above — moves it instantly instead of animating it. */
const TabsContext = React.createContext<{
  value: string | undefined;
  lastUnderlineRect: React.RefObject<DOMRect | null>;
}>({ value: undefined, lastUnderlineRect: { current: null } });

/* --duration-180 and --ease-out-quad. */
const glide: KeyframeAnimationOptions = {
  duration: 180,
  easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

export const TabsRoot = ({
  className,
  value,
  defaultValue,
  onValueChange,
  children,
  ref,
  ...props
}: TabsPrimitive.TabsProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const lastUnderlineRect = React.useRef<DOMRect | null>(null);

  const currentValue = value ?? internalValue;
  const handleValueChange = (next: string) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <TabsPrimitive.Root
      {...props}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      ref={ref}
      className={cx(styles.root, className)}
    >
      <TabsContext.Provider value={{ value: currentValue, lastUnderlineRect }}>
        {children}
      </TabsContext.Provider>
    </TabsPrimitive.Root>
  );
};

export const TabsList = styled(TabsPrimitive.List, styles.list, "TabsList");

const Underline = ({
  lastRect,
}: {
  lastRect: React.RefObject<DOMRect | null>;
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* At rest the underline spans its trigger, so its own box is the target;
       glide there from the outgoing underline's last on-screen box. */
    const from = lastRect.current;
    const to = el.getBoundingClientRect();
    const animation =
      from && from.width > 0 && to.width > 0
        ? el.animate(
            [
              {
                transform: `translateX(${from.left - to.left}px) scaleX(${from.width / to.width})`,
              },
              { transform: "none" },
            ],
            glide,
          )
        : undefined;

    return () => {
      /* Runs before the node leaves the DOM, so if the tab changed again
         mid-glide this captures where the underline visually is. */
      lastRect.current = el.getBoundingClientRect();
      animation?.cancel();
    };
  }, [lastRect]);

  return <span ref={ref} className={styles.underline} />;
};

export const TabsTrigger = ({
  children,
  value,
  className,
  ref,
  ...props
}: TabsPrimitive.TabsTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx.value === value;

  return (
    <TabsPrimitive.Trigger
      {...props}
      value={value}
      ref={ref}
      className={cx(styles.trigger, className)}
    >
      <Text as="span" size="md" weight="medium">
        {children}
      </Text>
      {isActive && <Underline lastRect={ctx.lastUnderlineRect} />}
    </TabsPrimitive.Trigger>
  );
};

export const TabsContent = styled(TabsPrimitive.Content, styles.content, "TabsContent");
