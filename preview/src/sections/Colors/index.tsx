import { useEffect, useState } from 'react';
import { Section } from '../../Section';
import styles from './styles.module.css';

const FAMILY_ORDER = [
  'gray',
  'black',
  'white',
  'red',
  'amber',
  'tomato',
  'purple',
  'teal',
  'blue',
  'pink',
  'crimson',
  'grass',
  'orange',
];

// Walk a rule list (incl. nested @media/@supports and @import sheets) collecting
// every custom-property name that is set anywhere.
function collectFromRules(rules: CSSRuleList, names: Set<string>) {
  for (const rule of Array.from(rules)) {
    const style = (rule as CSSStyleRule).style;
    if (style) {
      for (let i = 0; i < style.length; i++) {
        const prop = style[i];
        if (prop.startsWith('--')) names.add(prop);
      }
    }
    const nested = (rule as CSSGroupingRule).cssRules;
    if (nested) collectFromRules(nested, names);
    const imported = (rule as CSSImportRule).styleSheet;
    if (imported) {
      try {
        collectFromRules(imported.cssRules, names);
      } catch {
        /* cross-origin sheet — skip */
      }
    }
  }
}

// All custom properties whose resolved value is a color (drops sizes, durations,
// shadows, gradients, etc.), sorted so families group together.
function collectColorVars(): string[] {
  const names = new Set<string>();
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      if (sheet.cssRules) collectFromRules(sheet.cssRules, names);
    } catch {
      /* cross-origin sheet — skip */
    }
  }
  const root = getComputedStyle(document.documentElement);
  return Array.from(names)
    .filter((name) => {
      const value = root.getPropertyValue(name).trim();
      return value.length > 0 && CSS.supports('color', value);
    })
    .sort(compareColorVars);
}

function compareColorVars(a: string, b: string) {
  const parsedA = parseColorVar(a);
  const parsedB = parseColorVar(b);

  if (parsedA.familyOrder !== parsedB.familyOrder) {
    return parsedA.familyOrder - parsedB.familyOrder;
  }
  if (parsedA.family !== parsedB.family) {
    return parsedA.family.localeCompare(parsedB.family);
  }
  if (parsedA.alpha !== parsedB.alpha) {
    return Number(parsedA.alpha) - Number(parsedB.alpha);
  }
  if (parsedA.step !== parsedB.step) {
    return parsedA.step - parsedB.step;
  }
  return a.localeCompare(b);
}

function parseColorVar(name: string) {
  const [, raw = name] = /^--(.+)$/.exec(name) ?? [];
  const match = /^(.*?)-(a?)(\d+)$/.exec(raw);

  if (!match) {
    return {
      family: raw,
      familyOrder: Number.POSITIVE_INFINITY,
      alpha: false,
      step: Number.POSITIVE_INFINITY,
    };
  }

  const family = match[1];
  const familyOrder = FAMILY_ORDER.includes(family)
    ? FAMILY_ORDER.indexOf(family)
    : Number.POSITIVE_INFINITY;

  return {
    family,
    familyOrder,
    alpha: match[2] === 'a',
    step: Number(match[3]),
  };
}

export function ColorsSection() {
  const [names] = useState<string[]>(() =>
    typeof document === 'undefined' ? [] : collectColorVars()
  );
  // Bumped when the theme class changes so resolved values re-read.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => setTick((t) => t + 1));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const root =
    typeof window !== 'undefined'
      ? getComputedStyle(document.documentElement)
      : null;
  void tick; // re-read resolved values on theme change

  return (
    <Section title={`Colors (${names.length})`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.swatchCol}>Swatch</th>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name}>
              <td>
                <span className={styles.swatch}>
                  <span
                    className={styles.swatchColor}
                    style={{ background: `var(${name})` }}
                  />
                </span>
              </td>
              <td>
                <code className={styles.name}>{name}</code>
              </td>
              <td className={styles.value}>
                {root?.getPropertyValue(name).trim()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
