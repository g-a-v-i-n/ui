import { Text } from 'ui/components/text';
import { Hero } from './Hero';
import { PropsTables } from './PropsTable';
import type { Page } from './registry';
import styles from './docs.module.css';

export function ComponentPage({ page }: { page: Page }) {
  const { doc, Examples } = page;
  return (
    <article className={styles.page}>
      <header className={styles.pageHeader}>
        <Text as="h1" size="2xl" weight="semibold">
          {page.name}
        </Text>
        {doc?.description && (
          <Text as="p" size="md" color="secondary">
            {doc.description}
          </Text>
        )}
      </header>

      {/* Keyed by slug so control state resets when navigating between pages. */}
      {doc && <Hero key={page.slug} doc={doc} />}

      {Examples && (
        <section className={styles.section}>
          {doc && (
            <Text as="h2" size="lg" weight="semibold">
              Examples
            </Text>
          )}
          <div className={styles.examples}>
            <Examples />
          </div>
        </section>
      )}

      {doc && (
        <section className={styles.section}>
          <Text as="h2" size="lg" weight="semibold">
            Props
          </Text>
          <PropsTables modules={doc.modules ?? [page.slug]} only={doc.propsFor} />
        </section>
      )}
    </article>
  );
}
