import { useLayoutEffect, useRef, useState } from 'react';
import { Text } from 'ui/components/text';
import { useResolvedTheme } from 'ui/components/theme';
import { Section } from '../../Section';
import styles from './styles.module.css';

/* The two tiers from ui/src/css: the semantic roles components read
   (color.css) and the raw scales they are built from (scales.css). Swatches
   paint with var(), so they follow the theme, gray tone and nested scopes
   like any component; the value beside a role is read back from the
   computed style so it updates with the mode. */

const ROLES: { title: string; note?: string; tokens: string[] }[] = [
  {
    title: 'Surfaces',
    note: 'The page, floating surfaces, and the modal fill.',
    tokens: ['bg-base', 'bg-elevated', 'bg-elevated-hover', 'bg-modal', 'border-elevated', 'bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-quaternary'],
  },
  {
    title: 'Washes',
    note: 'Translucent fills that read the same on any surface.',
    tokens: ['bg-hover-subtle', 'bg-hover', 'bg-selected', 'bg-pressed', 'bg-disabled', 'bg-tint', 'bg-track', 'bg-indicator', 'bg-indicator-hover'],
  },
  {
    title: 'Controls',
    note: 'Raised controls: the resting fill and its state washes.',
    tokens: ['bg-control', 'bg-control-hover', 'bg-control-active', 'bg-control-destructive-hover', 'bg-control-destructive-active'],
  },
  {
    title: 'Inverse',
    tokens: ['bg-inverse', 'bg-inverse-hover', 'bg-inverse-active', 'fg-inverse'],
  },
  {
    title: 'Text',
    tokens: ['fg-primary', 'fg-secondary', 'fg-tertiary', 'fg-quaternary', 'fg-disabled'],
  },
  {
    title: 'Borders',
    note: 'Dividers, then the three hairline tiers shadow.css turns into rims.',
    tokens: ['border-faint', 'border-subtle', 'border', 'border-strong', 'border-emphasis'],
  },
  {
    title: 'Accent',
    tokens: ['accent', 'accent-strong', 'accent-text', 'accent-tint', 'accent-border', 'accent-soft'],
  },
  { title: 'Success', tokens: ['success', 'success-strong', 'success-text', 'success-tint', 'success-border'] },
  { title: 'Warning', tokens: ['warning', 'warning-strong', 'warning-text', 'warning-tint', 'warning-border'] },
  {
    title: 'Danger',
    tokens: ['danger', 'danger-strong', 'danger-text', 'danger-tint', 'danger-border', 'danger-border-subtle', 'danger-border-strong'],
  },
  {
    title: 'Focus and highlight',
    tokens: ['focus-ring-color', 'highlight', 'highlight-active', 'scrim'],
  },
];

const SCALES = [
  'gray', 'mauve', 'slate', 'sage', 'olive', 'sand',
  'blue', 'teal', 'grass', 'lime', 'amber', 'tomato', 'red', 'crimson', 'pink', 'purple', 'violet',
];
const FIXED = ['black', 'white'];
const STEPS = Array.from({ length: 12 }, (_, index) => index + 1);

export function ColorSection() {
  return (
    <Section title="Color" layout="column" gap={32}>
      <Group title="Roles" note="What components read. Every token here is a light-dark() pair or an alias of one, declared in ui/src/css/color.css.">
        <div className={styles.roleGroups}>
          {ROLES.map((group) => (
            <div key={group.title} className={styles.roleGroup}>
              <Text as="h3" size="sm" weight="medium">
                {group.title}
              </Text>
              {group.note && (
                <Text as="p" size="xs" color="tertiary">
                  {group.note}
                </Text>
              )}
              <div className={styles.roles}>
                {group.tokens.map((token) => (
                  <Role key={token} token={token} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Group>

      <Group title="Scales" note="The raw steps the roles are built from, generated from @radix-ui/colors into ui/src/css/scales.css. Components never read these directly. Each scale has a solid and an alpha ramp; the tinted grays swap in for --gray-* through data-gray.">
        <div className={styles.scales}>
          {SCALES.map((name) => (
            <Scale key={name} name={name} />
          ))}
          {FIXED.map((name) => (
            <Scale key={name} name={name} alphaOnly />
          ))}
        </div>
      </Group>
    </Section>
  );
}

function Group({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div className={styles.group}>
      <Text as="h2" size="lg" weight="semibold">
        {title}
      </Text>
      <Text as="p" size="sm" color="secondary" className={styles.groupNote}>
        {note}
      </Text>
      {children}
    </div>
  );
}

/* A role swatch with its name and the color it currently resolves to. */
function Role({ token }: { token: string }) {
  const swatch = useRef<HTMLSpanElement>(null);
  const theme = useResolvedTheme();
  const [value, setValue] = useState('');
  useLayoutEffect(() => {
    if (swatch.current) setValue(getComputedStyle(swatch.current).backgroundColor);
  }, [theme, token]);
  return (
    <div className={styles.role}>
      <span ref={swatch} className={styles.roleSwatch} style={{ background: `var(--${token})` }} />
      <div className={styles.roleText}>
        <Text as="code" size="xs" mono truncate>
          --{token}
        </Text>
        <Text as="span" size="xs" color="tertiary" mono truncate>
          {value}
        </Text>
      </div>
    </div>
  );
}

function Scale({ name, alphaOnly = false }: { name: string; alphaOnly?: boolean }) {
  return (
    <div className={styles.scale}>
      <Text as="div" size="sm" color="secondary" className={styles.scaleTitle}>
        {name}
      </Text>
      <div className={styles.ramps}>
        {!alphaOnly && <Ramp prefix={`${name}-`} />}
        <Ramp prefix={`${name}-a`} alpha />
      </div>
    </div>
  );
}

function Ramp({ prefix, alpha = false }: { prefix: string; alpha?: boolean }) {
  return (
    <div className={styles.ramp} data-alpha={alpha || undefined}>
      {STEPS.map((step) => (
        <div key={step} className={styles.cell}>
          <span
            className={styles.swatch}
            // SAFETY: custom properties are valid inline styles but missing from CSSProperties.
            style={{ '--swatch': `var(--${prefix}${step})` } as React.CSSProperties}
          />
          <Text as="code" size="xs" mono color="tertiary" className={styles.label}>
            {alpha ? `a${step}` : step}
          </Text>
        </div>
      ))}
    </div>
  );
}
