import { Text } from 'ui/components/text';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from 'ui/components/tabs';
import { Section } from '../../Section';

export function TabsSection() {
  return (
    <Section title="Tabs">
      <TabsRoot defaultValue="account" style={{ width: 360 }}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Text size="md" color="secondary">
            Manage your account details and profile information.
          </Text>
        </TabsContent>
        <TabsContent value="password">
          <Text size="md" color="secondary">
            Change your password and security settings.
          </Text>
        </TabsContent>
      </TabsRoot>
    </Section>
  );
}
