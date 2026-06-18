import { useState } from 'react';
import { Button } from 'ui/components/button';
import { Switch } from 'ui/components/switch';
import { TextInput } from 'ui/components/text-input';
import { TextArea } from 'ui/components/text-area';
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormSubmit,
} from 'ui/components/form';
import { Label } from 'ui/components/label';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'ui/components/select';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function FormSection() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('developer');
  const [formBio, setFormBio] = useState('');
  const [formNotify, setFormNotify] = useState(true);

  return (
    <Section title="Form">
      <FormRoot
        className={styles.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField name="name">
          <FormLabel>Full name</FormLabel>
          <FormControl>
            <TextInput
              width="fill"
              required
              placeholder="Ada Lovelace"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </FormControl>
          <FormMessage match="valueMissing">Please enter your name.</FormMessage>
        </FormField>

        <FormField name="email">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <TextInput
              width="fill"
              type="email"
              required
              placeholder="you@example.com"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </FormControl>
          <FormMessage match="valueMissing">Please enter your email.</FormMessage>
          <FormMessage match="typeMismatch">Please enter a valid email.</FormMessage>
        </FormField>

        <FormField name="role">
          <FormLabel>Role</FormLabel>
          <SelectRoot value={formRole} onValueChange={setFormRole}>
            <SelectTrigger aria-label="Role" className={styles.selectTrigger}>
              <SelectValue placeholder="Select a role…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="manager">Product manager</SelectItem>
            </SelectContent>
          </SelectRoot>
        </FormField>

        <FormField name="bio">
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <TextArea
              autoResize
              rows={3}
              maxRows={6}
              placeholder="Tell us a little about yourself…"
              value={formBio}
              onChange={(e) => setFormBio(e.target.value)}
            />
          </FormControl>
        </FormField>

        <div className={styles.notifyRow}>
          <Label htmlFor="form-notify">Email notifications</Label>
          <Switch id="form-notify" checked={formNotify} onCheckedChange={setFormNotify} />
        </div>

        <div className={styles.actions}>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
          <FormSubmit>
            <Button>Create account</Button>
          </FormSubmit>
        </div>
      </FormRoot>
    </Section>
  );
}
