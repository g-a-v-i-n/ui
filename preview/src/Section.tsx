import React from 'react';
import { Text } from 'ui/components/text';

/* layout="column" stacks the body (children stretch full width — content
   that shouldn't fill sets its own width); gap overrides the 16px default
   so sections keep their tighter spacing. */
export function Section({
  title,
  layout = 'row',
  gap,
  children,
}: {
  title: string;
  layout?: 'row' | 'column';
  gap?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <Text
        as="h2"
        size="sm"
        weight="semibold"
        transform="uppercase"
        color="secondary"
        className="section-title"
      >
        {title}
      </Text>
      <div
        className={layout === 'column' ? 'section-body section-body-column' : 'section-body'}
        style={gap !== undefined ? { gap } : undefined}
      >
        {children}
      </div>
    </section>
  );
}
