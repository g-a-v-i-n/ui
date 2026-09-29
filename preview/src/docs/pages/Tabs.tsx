import { Text } from 'ui/components/text';
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'ui/components/tabs';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'Switches between panels of content; the active underline glides between triggers.',
  controls: {
    initial: {
      type: 'select',
      label: 'Initial tab',
      options: ['account', 'password', 'billing'],
      default: 'account',
    },
    activationMode: {
      type: 'segmented',
      label: 'Activation',
      options: ['automatic', 'manual'],
      default: 'automatic',
    },
    disableBilling: { type: 'boolean', label: 'Disable "Billing"', default: false },
    width: { type: 'number', default: 360, min: 240, max: 480, step: 40 },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial tab changes. */
  render: ({ initial, activationMode, disableBilling, width }) => (
    <TabsRoot key={initial} defaultValue={initial} activationMode={activationMode} style={{ width }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing" disabled={disableBilling}>
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
      <TabsContent value="billing">
        <Text size="md" color="secondary">
          Review invoices and update your payment method.
        </Text>
      </TabsContent>
    </TabsRoot>
  ),
});
