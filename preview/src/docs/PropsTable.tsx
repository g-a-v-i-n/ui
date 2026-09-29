import {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from 'ui/components/table';
import { Tag } from 'ui/components/tag';
import { Text } from 'ui/components/text';
import propsData from '../generated/props.json';
import styles from './docs.module.css';

type PropDoc = {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
};

type ComponentProps = {
  description?: string;
  props: PropDoc[];
  acceptsHtmlAttributes: boolean;
};

const data: Record<string, Record<string, ComponentProps>> = propsData;

export function PropsTables({ modules, only }: { modules: string[]; only?: string[] }) {
  const missing = modules.filter((module) => !data[module]);
  if (missing.length > 0) {
    return (
      <Text as="p" size="sm" color="tertiary">
        No props were generated for <code>ui/components/{missing.join(', ')}</code>. Run{' '}
        <code>pnpm generate-docs-props</code>.
      </Text>
    );
  }
  const entries = modules.flatMap((module) =>
    Object.entries(data[module] ?? {}).map(([name, component]) => ({ name, component }))
  );
  const shown = only ? only.flatMap((name) => entries.filter((e) => e.name === name)) : entries;
  return (
    <div className={styles.propsList}>
      {shown.map(({ name, component }) => (
        <PropsTable key={name} name={name} component={component} />
      ))}
    </div>
  );
}

function PropsTable({ name, component }: { name: string; component: ComponentProps }) {
  return (
    <div className={styles.propsTable}>
      <div className={styles.propsHeading}>
        <Text as="h3" size="md" weight="semibold">
          {name}
        </Text>
        {component.description && (
          <Text as="p" size="sm" color="secondary">
            {component.description}
          </Text>
        )}
      </div>
      {component.props.length > 0 ? (
        <div className={styles.tableWrap}>
          <TableRoot>
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {component.props.map((prop) => (
                <TableRow key={prop.name}>
                  <TableCell>
                    <span className={styles.propName}>
                      <Text as="code" size="sm" mono weight="medium">
                        {prop.name}
                      </Text>
                      {prop.required && (
                        <Tag variant="blue" secondary>
                          required
                        </Tag>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Text as="code" size="xs" mono color="secondary" className={styles.propType}>
                      {prop.type}
                    </Text>
                  </TableCell>
                  <TableCell>
                    {prop.default ? (
                      <Text as="code" size="xs" mono color="secondary">
                        {prop.default}
                      </Text>
                    ) : (
                      <Text as="span" size="sm" color="tertiary">
                        —
                      </Text>
                    )}
                  </TableCell>
                  <TableCell className={styles.propDescription}>
                    {prop.description ?? ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableRoot>
        </div>
      ) : (
        <Text as="p" size="sm" color="tertiary">
          No props of its own.
        </Text>
      )}
      {component.acceptsHtmlAttributes && (
        <Text as="p" size="xs" color="tertiary">
          Also accepts the native attributes of the element it renders.
        </Text>
      )}
    </div>
  );
}
