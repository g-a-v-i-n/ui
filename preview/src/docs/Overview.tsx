import { Link } from 'ui/components/link';
import { Text } from 'ui/components/text';
import { groups, type Page } from './registry';
import { useLinkProps } from './navigation';
import styles from './docs.module.css';

function PageLink({ page }: { page: Page }) {
  const { href, onClick } = useLinkProps(page.path);
  return (
    <Text as="span" size="sm">
      <Link href={href} onClick={onClick}>
        {page.name}
      </Link>
    </Text>
  );
}

export function Overview() {
  return (
    <article className={styles.page}>
      <header className={styles.pageHeader}>
        <Text as="h1" size="2xl" weight="semibold">
          UI
        </Text>
        <Text as="p" size="md" color="secondary">
          Every component in the library, with a live example you can configure and a table of
          its props. Pick a component from the sidebar or the lists below.
        </Text>
      </header>
      {groups.map((group) => (
        <section key={group.group} className={styles.section}>
          <Text as="h2" size="lg" weight="semibold">
            {group.label}
          </Text>
          <div className={styles.linkGrid}>
            {group.pages.map((page) => (
              <PageLink key={page.path} page={page} />
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
