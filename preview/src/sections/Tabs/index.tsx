import { Text } from 'ui/components/text';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from 'ui/components/tabs';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function TabsSection() {
  return (
    <Section title="Tabs">
      <TabsRoot defaultValue="account" className={styles.tabs}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Text size="sm" color="secondary">
            Manage your account details and profile information.
          </Text>
        </TabsContent>
        <TabsContent value="password">
          <Text size="sm" color="secondary">
            Change your password and security settings.
          </Text>
        </TabsContent>
      </TabsRoot>
    </Section>
  );
}
