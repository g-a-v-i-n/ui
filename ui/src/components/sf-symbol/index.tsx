import { AccessibleIcon as AccessibleIconPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { iconSizes, type IconSize } from "../../lib/icon-sizes";

const weights = {
  ultralight: 100,
  thin: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
  black: 900,
} as const;

type SFSymbolProps = {
  symbol: string;
  /** Accessible name, announced by screen readers. Omit for decorative glyphs. */
  label?: string;
  size?: IconSize;
  weight?: keyof typeof weights;
  className?: string;
  style?: React.CSSProperties;
};

export function SFSymbol({
  symbol,
  label,
  size = "md",
  weight = "medium",
  className,
  style,
}: SFSymbolProps) {
  const px = iconSizes[size];
  const glyph = (
    <span
      aria-hidden="true"
      className={cx(styles.symbol, className)}
      style={{
        width: px,
        height: px,
        fontSize: px,
        fontWeight: weights[weight],
        ...style,
      }}
    >
      {symbol}
    </span>
  );

  if (label == null) return glyph;

  return (
    <AccessibleIconPrimitive.Root label={label}>
      {glyph}
    </AccessibleIconPrimitive.Root>
  );
}
