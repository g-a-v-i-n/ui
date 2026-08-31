import { useState } from 'react';
import { Toggle } from 'ui/components/toggle';
import { Text } from 'ui/components/text';
import { Section } from '../../Section';
import styles from './styles.module.css';

// ?inline gives the raw CSS text without injecting it into the page — the
// custom scales reuse the stock Radix var names (--gray-*, --tomato-*,
// --blue-*), so loading them normally would override the app-wide theme.
import grayCss from '../../../../ui/src/css/custom/gray.css?inline';
import tomatoCss from '../../../../ui/src/css/custom/tomato.css?inline';
import blueCss from '../../../../ui/src/css/custom/blue.css?inline';
import limeCss from '../../../../ui/src/css/custom/lime.css?inline';
import amberCss from '../../../../ui/src/css/custom/amber.css?inline';

const SCALES = [
  { title: 'gray', css: grayCss },
  { title: 'tomato', css: tomatoCss },
  { title: 'blue', css: blueCss },
  { title: 'lime', css: limeCss },
  { title: 'amber', css: amberCss },
];

type Var = { name: string; value: string };

function parseVars(css: string): Var[] {
  return Array.from(css.matchAll(/(--[\w-]+):\s*([^;]+);/g), (match) => ({
    name: match[1],
    value: match[2].trim(),
  }));
}

// The generated files hold a light (:root) and a dark (.dark) block with the
// same var names; parse each rule block separately so they don't collide.
function parseBlock(css: string, mode: 'light' | 'dark'): Var[] {
  const blocks = Array.from(css.matchAll(/([^{}]+)\{([^}]+)\}/g));
  const block = blocks.find(([, selector]) =>
    mode === 'dark' ? selector.includes('.dark') : selector.includes(':root')
  );
  return block ? parseVars(block[2]) : [];
}

// Pair each solid step with its alpha counterpart (--blue-3 ↔ --blue-a3) so the
// alpha swatch can render directly below its solid.
function pairSteps(vars: Var[]) {
  const step = (name: string) => Number(/(\d+)$/.exec(name)?.[1]);
  const alphas = new Map(
    vars.filter((v) => /-a\d+$/.test(v.name)).map((v) => [step(v.name), v])
  );
  return vars
    .filter((v) => !/-a\d+$/.test(v.name))
    .map((v) => ({ step: step(v.name), solid: v, alpha: alphas.get(step(v.name)) }));
}

export function CustomColorsSection() {
  const scales = SCALES.flatMap(({ title, css }) => {
    const dark = pairSteps(parseBlock(css, 'dark'));
    return [
      { title, steps: pairSteps(parseBlock(css, 'light')) },
      ...(dark.length ? [{ title: `${title} dark`, steps: dark }] : []),
    ];
  });
  const [grid, setGrid] = useState(false);
  return (
    <Section title="Custom colors (css/custom)">
      {/* .section-body is a wrapping row flex; this full-width column container
          keeps each color group on its own row, one after the other. */}
      <div className={styles.root}>
      <div className={styles.controls}>
        <Toggle pressed={grid} onPressedChange={setGrid}>
          Grid
        </Toggle>
      </div>
      {grid ? (
        <div className={styles.grid}>
          {scales.map(({ title, steps }) => (
            <div key={title}>
              <div className={styles.gridRow}>
                {steps.map(({ solid }) => (
                  <span
                    key={solid.name}
                    className={styles.gridCell}
                    style={{ background: solid.value }}
                    title={`${solid.name}: ${solid.value}`}
                  />
                ))}
              </div>
              <div className={styles.gridRow}>
                {steps.map(({ solid, alpha }) =>
                  alpha ? (
                    <span
                      key={alpha.name}
                      className={`${styles.gridCell} ${styles.checker}`}
                      title={`${alpha.name}: ${alpha.value}`}
                    >
                      <span
                        className={styles.swatchFill}
                        style={{ background: alpha.value }}
                      />
                    </span>
                  ) : (
                    <span key={`${solid.name}-spacer`} className={styles.gridCell} />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        scales.map(({ title, steps }) => (
          <div key={title} className={styles.row}>
            <Text as="div" size="sm" weight="semibold" color="secondary">
              {title}
            </Text>
            <div className={styles.scaleRows}>
              <div className={styles.stepsRow}>
                {steps.map(({ solid }) => (
                  <span
                    key={solid.name}
                    className={styles.swatch}
                    style={{ background: solid.value }}
                    title={`${solid.name}: ${solid.value}`}
                  />
                ))}
              </div>
              <div className={styles.stepsRow}>
                {steps.map(({ solid, alpha }) =>
                  alpha ? (
                    <span
                      key={alpha.name}
                      className={`${styles.swatch} ${styles.checker}`}
                      title={`${alpha.name}: ${alpha.value}`}
                    >
                      <span
                        className={styles.swatchFill}
                        style={{ background: alpha.value }}
                      />
                    </span>
                  ) : (
                    <span key={`${solid.name}-spacer`} />
                  )
                )}
              </div>
              <div className={styles.stepsRow}>
                {steps.map(({ step, solid }) => (
                  <Text
                    as="code"
                    size="xs"
                    mono
                    key={solid.name}
                    className={styles.label}
                  >
                    {step}
                  </Text>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
      </div>
    </Section>
  );
}
