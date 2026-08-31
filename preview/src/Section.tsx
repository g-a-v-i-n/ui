import React from 'react';
import { Text } from 'ui/components/text';

export function Section({
  title,
  children,
}: {
  title: string;
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
      <div className="section-body">{children}</div>
    </section>
  );
}
