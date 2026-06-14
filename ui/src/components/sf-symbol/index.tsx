import { AccessibleIcon as AccessibleIconPrimitive } from "radix-ui";
import styles from "./styles.module.css";

const sizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
} as const;

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
  size?: keyof typeof sizes;
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
  const px = sizes[size];
  const glyph = (
    <span
      aria-hidden="true"
      className={`${styles.symbol} ${className ?? ""}`}
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
