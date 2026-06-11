import { useState } from 'react';
import { SFSymbol } from 'ui/components/sf-symbol';
import { Text } from 'ui/components/text';
import { Theme } from 'ui/components/theme';
import { Button } from 'ui/components/button';
import { Checkbox } from 'ui/components/checkbox';
import { CheckboxRow } from 'ui/components/checkbox-row';
import { Switch } from 'ui/components/switch';
import { Radio } from 'ui/components/radio';
import { RadioGroup } from 'ui/components/radio-group';
import { ToggleGroup, ToggleGroupItem } from 'ui/components/toggle-group';
import { MiddleDot } from 'ui/components/middle-dot';
import { PieChart } from 'ui/components/pie-chart';
import { Tag } from 'ui/components/tag';
import { TextInput } from 'ui/components/text-input';
import { Tooltip, TooltipProvider } from 'ui/components/tooltip';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'ui/components/dialog';
import {
  MenuContainer,
  MenuItem,
  MenuDivider,
  MenuLabel,
  MenuTitle,
  MenuList,
  MenuListItem,
} from 'ui/components/menu-primitives';
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from 'ui/components/context-menu';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from 'ui/components/dropdown-menu';
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'ui/components/accordion';
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from 'ui/components/alert-dialog';
import { AspectRatio } from 'ui/components/aspect-ratio';
import { Avatar, AvatarRoot, AvatarImage, AvatarFallback } from 'ui/components/avatar';
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from 'ui/components/collapsible';
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormSubmit,
} from 'ui/components/form';
import {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
} from 'ui/components/hover-card';
import { GradientMask } from 'ui/components/gradient-mask';
import { Label } from 'ui/components/label';
import { Link } from 'ui/components/link';
import {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from 'ui/components/menubar';
import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from 'ui/components/navigation-menu';
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from 'ui/components/popover';
import { Progress } from 'ui/components/progress';
import { ScrollArea } from 'ui/components/scroll-area';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from 'ui/components/select';
import { Separator } from 'ui/components/separator';
import { SplitPane, SplitPanePane } from 'ui/components/split-pane';
import { Spinner } from 'ui/components/spinner';
import { Slider } from 'ui/components/slider';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarSeparator,
  SidebarCollapsibleSection,
} from 'ui/components/sidebar';
import {
  TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from 'ui/components/table';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from 'ui/components/tabs';
import {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from 'ui/components/toast';
import { Toggle } from 'ui/components/toggle';
import {
  ToolbarRoot,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  ToolbarSplitButton,
} from 'ui/components/toolbar';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  const [cbA, setCbA] = useState(false);
  const [cbB, setCbB] = useState(true);
  const [rowChecked, setRowChecked] = useState(false);

  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(true);

  const [radioValue, setRadioValue] = useState('medium');

  const [toggleAlign, setToggleAlign] = useState('left');
  const [toggleView, setToggleView] = useState('grid');

  const [piePercent, setPiePercent] = useState(25);
  const [inputDefault, setInputDefault] = useState('Hello');
  const [inputFill, setInputFill] = useState('');
  const [inputToolbar, setInputToolbar] = useState('Untitled');

  const [showToolbar, setShowToolbar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [radio, setRadio] = useState('medium');

  const [selectValue, setSelectValue] = useState('apple');
  const [sliderValue, setSliderValue] = useState([40]);
  const [progressValue, setProgressValue] = useState(60);
  const [toastOpen, setToastOpen] = useState(false);
  const [menubarChecks, setMenubarChecks] = useState(true);
  const [toolbarMarks, setToolbarMarks] = useState<string[]>(['bold']);
  const [sidebarItem, setSidebarItem] = useState('inbox');

  return (
    <Theme theme={theme} setResolvedTheme={setResolvedTheme}>
      <TooltipProvider delayDuration={200}>
      <ToastProvider swipeDirection="right">
      <main className="page">
        <header className="page-header">
          <h1>UI component preview</h1>
          <label className="theme-picker">
            Theme
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
            >
              <option value="light">light</option>
              <option value="dark">dark</option>
              <option value="system">system</option>
            </select>
            <span className="resolved">(resolved: {resolvedTheme})</span>
          </label>
        </header>

        <Section title="Text">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <Text as="h1" size="2xl" weight="semibold">
              Heading 2xl semibold
            </Text>
            <Text as="h2" size="xl" weight="semibold">
              Heading xl semibold
            </Text>
            <Text as="h3" size="lg" weight="medium">
              Heading lg medium
            </Text>
            <Text size="md">Body md regular — the quick brown fox jumps over the lazy dog.</Text>
            <Text size="sm" color="secondary">
              Body sm secondary — supporting text.
            </Text>
            <Text size="xs" color="tertiary">
              Caption xs tertiary — fine print.
            </Text>
            <Text as="label" size="sm" weight="medium">
              Inline label
            </Text>
            <div style={{ width: 200, border: '1px dashed var(--gray-7, #ccc)', padding: 8 }}>
              <Text truncate>This text is truncated when it overflows its container</Text>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <Text size="sm" weight="regular">regular</Text>
              <Text size="sm" weight="medium">medium</Text>
              <Text size="sm" weight="semibold">semibold</Text>
              <Text size="sm" weight="bold">bold</Text>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <Text size="sm" color="primary">primary</Text>
              <Text size="sm" color="secondary">secondary</Text>
              <Text size="sm" color="tertiary">tertiary</Text>
              <span style={{ color: 'var(--blue-9)' }}>
                <Text size="sm" color="inherit">inherit (blue parent)</Text>
              </span>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <Text size="sm" transform="uppercase">uppercase</Text>
              <Text size="sm" transform="lowercase">LOWERCASE</Text>
              <Text size="sm" transform="capitalize">capitalize each word</Text>
              <Text size="sm" decoration="underline">underline</Text>
              <Text size="sm" decoration="line-through">line-through</Text>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <Text size="sm" tabularNumbers>
                1111.11 / 0000.00 (tabular)
              </Text>
              <Text size="sm">1111.11 / 0000.00 (proportional)</Text>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <Text as="p" size="sm">as p</Text>
              <Text as="div" size="sm">as div</Text>
              <Text as="h4" size="sm">as h4 (margins reset)</Text>
            </div>
            <Text as="p" size="md">
              Body text with an inline <Link href="#">md link</Link> that inherits its size.
            </Text>
            <Text as="p" size="xs" color="secondary">
              Fine print with an <Link href="#">xs link</Link> inheriting the smaller size.
            </Text>
          </div>
        </Section>

        <Section title="SFSymbol">
          <SFSymbol symbol="a" size="sm" />
          <SFSymbol symbol="b" size="md" />
          <SFSymbol symbol="c" size="lg" />
          <SFSymbol symbol="d" size="xl" />
          <SFSymbol symbol="􀆅" />
          <SFSymbol symbol="􀆊" />
        </Section>

        <Section title="Button">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button prefixSlot={<SFSymbol symbol="✓" size="sm" weight="semibold" />}>
            With prefix
          </Button>
          <Button variant="secondary" suffixSlot={<SFSymbol symbol="􀆊" size="sm" />}>
            With suffix
          </Button>
          <Button
            prefixSlot={<SFSymbol symbol="✓" size="sm" weight="semibold" />}
            suffixSlot={<SFSymbol symbol="􀆊" size="sm" />}
          >
            Both slots
          </Button>
          <Button disabled>Disabled</Button>
          <Button width="square" aria-label="Square icon">
            <SFSymbol symbol="✓" size="sm" weight="semibold" />
          </Button>
          <Button width="square" round aria-label="Round icon">
            <SFSymbol symbol="✓" size="sm" weight="semibold" />
          </Button>
          <Button variant="secondary" round>
            Pill
          </Button>
          <div style={{ width: 320 }}>
            <Button width="fill" suffixSlot={<SFSymbol symbol="􀆊" size="sm" />}>
              Fill width
            </Button>
          </div>
        </Section>

        <Section title="Checkbox">
          <Checkbox id="cb-a" checked={cbA} onCheckedChange={(v) => setCbA(Boolean(v))} />
          <Checkbox id="cb-b" checked={cbB} onCheckedChange={(v) => setCbB(Boolean(v))} />
          <div style={{ minWidth: 240 }}>
            <CheckboxRow
              id="cb-row"
              label="Subscribe to updates"
              checked={rowChecked}
              onCheckedChange={setRowChecked}
            />
          </div>
        </Section>

        <Section title="Switch">
          <Switch checked={switchA} onCheckedChange={setSwitchA} />
          <Switch checked={switchB} onCheckedChange={setSwitchB} />
          <Switch checked disabled />
          <Switch disabled />
        </Section>

        <Section title="Radio">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Radio value="small" id="r-small" />
              <Text size="sm" as="span">Small</Text>
            </label>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Radio value="medium" id="r-medium" />
              <Text size="sm" as="span">Medium</Text>
            </label>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Radio value="large" id="r-large" />
              <Text size="sm" as="span">Large</Text>
            </label>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, opacity: 0.6 }}>
              <Radio value="disabled" id="r-disabled" disabled />
              <Text size="sm" as="span">Disabled</Text>
            </label>
          </RadioGroup>
        </Section>

        <Section title="ToggleGroup">
          <ToggleGroup
            type="single"
            value={toggleAlign}
            onValueChange={(v) => v && setToggleAlign(v)}
          >
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup
            type="single"
            value={toggleView}
            onValueChange={(v) => v && setToggleView(v)}
          >
            <ToggleGroupItem value="grid">
              <SFSymbol symbol="􀏅" size="sm" />
              Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="list">
              <SFSymbol symbol="􀋲" size="sm" />
              List
            </ToggleGroupItem>
          </ToggleGroup>
        </Section>

        <Section title="Tag">
          <Tag>Default</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="error">Error</Tag>
          <Tag>123</Tag>
          <Tag round>Pill</Tag>
          <Tag round variant="success">Pill success</Tag>
          <Tag round>9+</Tag>
        </Section>

        <Section title="MiddleDot">
          <Text size="sm">item one</Text>
          <MiddleDot />
          <Text size="sm">item two</Text>
          <MiddleDot />
          <Text size="sm">item three</Text>
        </Section>

        <Section title="PieChart">
          <PieChart percent={piePercent} />
          <PieChart percent={50} />
          <PieChart percent={75} />
          <PieChart percent={100} />
          <input
            type="range"
            min={0}
            max={100}
            value={piePercent}
            onChange={(e) => setPiePercent(Number(e.target.value))}
          />
        </Section>

        <Section title="TextInput">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <TextInput
              value={inputDefault}
              onChange={(e) => setInputDefault(e.target.value)}
              placeholder="Type something…"
            />
            <TextInput
              width="fill"
              value={inputFill}
              onChange={(e) => setInputFill(e.target.value)}
              placeholder="Fill-width input"
              prefixSlot={<SFSymbol symbol="􀊫" size="sm" />}
            />
            <TextInput
              variant="toolbar"
              value={inputToolbar}
              onChange={(e) => setInputToolbar(e.target.value)}
            />
            <TextInput value="120" width={80} readOnly />
          </div>
        </Section>

        <Section title="Tooltip">
          <Tooltip content="Plain hint">
            <Button variant="secondary">Hover me</Button>
          </Tooltip>
          <Tooltip content={<><strong>Rich</strong> tooltip with <code>code</code> and a <a href="#">link</a></>}>
            <Button variant="secondary">Rich content</Button>
          </Tooltip>
          <Tooltip content="On the right" side="right">
            <Button variant="secondary">Side right</Button>
          </Tooltip>
        </Section>

        <Section title="Dialog">
          <DialogRoot>
            <DialogTrigger>
              <Button variant="secondary">Open dialog</Button>
            </DialogTrigger>
            <DialogContent style={{padding: 32}}>
              <DialogTitle>Confirm action</DialogTitle>
              <DialogDescription>
                This is a dialog rendered from the ui package. Press escape or click outside to
                dismiss.
              </DialogDescription>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Confirm</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </DialogRoot>
        </Section>

        <Section title="Menu primitives">
          <MenuContainer width="md">
            <MenuTitle>Settings</MenuTitle>
            <MenuLabel>Section</MenuLabel>
            <MenuItem prefixSlot={<SFSymbol symbol="✓" />}>Selected item</MenuItem>
            <MenuItem suffixSlot={<span>⌘K</span>}>With shortcut</MenuItem>
            <MenuDivider />
            <MenuList>
              <MenuListItem label="Width" value={120} />
              <MenuListItem label="Height" value={80} />
              <MenuListItem label="Opacity" value="100%" />
            </MenuList>
          </MenuContainer>
        </Section>

        <Section title="Context menu">
          <ContextMenuRoot>
            <ContextMenuTrigger>
              <div className="context-target">Right-click here</div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Cut</ContextMenuItem>
              <ContextMenuItem suffixSlot={<span>⌘C</span>}>Copy</ContextMenuItem>
              <ContextMenuItem suffixSlot={<span>⌘V</span>}>Paste</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger
                  suffixSlot={<SFSymbol symbol="􀆈" style={{ transform: 'rotate(-90deg)' }} />}
                >
                  More
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>Duplicate</ContextMenuItem>
                  <ContextMenuItem>Rename</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuRoot>
        </Section>

        <Section title="Dropdown menu">
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <Button variant="secondary" suffixSlot={<SFSymbol symbol="􀆈" size="sm" />}>
                Open dropdown
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent width="md">
              <DropdownMenuLabel>View</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuCheckboxItem
                  checked={showToolbar}
                  onCheckedChange={(v) => setShowToolbar(Boolean(v))}
                >
                  Show toolbar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showSidebar}
                  onCheckedChange={(v) => setShowSidebar(Boolean(v))}
                >
                  Show sidebar
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Density</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={radio} onValueChange={setRadio}>
                <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem suffixSlot={<span>⌘,</span>}>Settings…</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </Section>
        <Section title="Label">
          <Label htmlFor="label-demo">Notifications</Label>
          <Switch id="label-demo" checked={switchA} onCheckedChange={setSwitchA} />
          <Label color="secondary" weight="regular">
            Secondary regular label
          </Label>
        </Section>

        <Section title="Toggle">
          <Toggle defaultPressed>Bold</Toggle>
          <Toggle>Italic</Toggle>
          <Toggle aria-label="Toggle check">
            <SFSymbol symbol="✓" size="sm" />
          </Toggle>
          <Toggle disabled>Disabled</Toggle>
        </Section>

        <Section title="Toolbar">
          <ToolbarRoot aria-label="Formatting options">
            <ToolbarToggleGroup
              type="multiple"
              value={toolbarMarks}
              onValueChange={setToolbarMarks}
              aria-label="Text formatting"
            >
              <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
              <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
              <ToolbarToggleItem value="strike">Strike</ToolbarToggleItem>
            </ToolbarToggleGroup>
            <ToolbarSeparator />
            <ToolbarButton width="square" aria-label="Search">
              <SFSymbol symbol="􀊫" size="sm" />
            </ToolbarButton>
            <ToolbarButton>Share</ToolbarButton>
            <ToolbarSplitButton
              tooltip="Run"
              prefixSlot={<SFSymbol symbol="􀊄" size="sm" />}
              onClick={() => console.log('run')}
              dropdownContent={
                <>
                  <DropdownMenuItem>Run all</DropdownMenuItem>
                  <DropdownMenuItem>Run selection</DropdownMenuItem>
                  <DropdownMenuItem suffixSlot={<span>⌘R</span>}>Run again</DropdownMenuItem>
                </>
              }
            >
              Run
            </ToolbarSplitButton>
            <ToolbarLink href="#" target="_blank">
              Edited 2h ago
            </ToolbarLink>
          </ToolbarRoot>
        </Section>

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

        <Section title="Accordion">
          <div style={{ width: 360 }}>
            <AccordionRoot type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA disclosure pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It matches the rest of the library out of the box.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It animates open and closed with the shared easing tokens.
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          </div>
        </Section>

        <Section title="Collapsible">
          <CollapsibleRoot style={{ width: 360 }}>
            <CollapsibleTrigger>
              <Button variant="secondary" suffixSlot={<SFSymbol symbol="􀆈" size="sm" />}>
                Toggle details
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div style={{ paddingTop: 8 }}>
                <Text size="sm" color="secondary">
                  Hidden details revealed with a height animation.
                </Text>
              </div>
            </CollapsibleContent>
          </CollapsibleRoot>
        </Section>

        <Section title="Select">
          <SelectRoot value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger aria-label="Fruit">
              <SelectValue placeholder="Pick a fruit…" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="leek" disabled>
                  Leek (out of stock)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectRoot>
          <Text size="sm" color="secondary">
            selected: {selectValue}
          </Text>
        </Section>

        <Section title="Slider">
          <div style={{ width: 240 }}>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
              aria-label="Volume"
            />
          </div>
          <Text size="sm" color="secondary" tabularNumbers>
            {sliderValue[0]}
          </Text>
          <div style={{ width: 240 }}>
            <Slider defaultValue={[20, 80]} max={100} step={1} aria-label="Range" />
          </div>
          <div style={{ width: 240 }}>
            <Slider defaultValue={[50]} disabled aria-label="Disabled" />
          </div>
        </Section>

        <Section title="Spinner">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
          <span style={{ color: 'var(--blue-9)', display: 'inline-flex' }}>
            <Spinner />
          </span>
          <Button disabled prefixSlot={<Spinner size="sm" />}>
            Saving…
          </Button>
          <Button variant="secondary" disabled prefixSlot={<Spinner size="sm" />}>
            Loading
          </Button>
        </Section>

        <Section title="Progress">
          <div style={{ width: 240 }}>
            <Progress value={progressValue} />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={progressValue}
            onChange={(e) => setProgressValue(Number(e.target.value))}
          />
        </Section>

        <Section title="Avatar">
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/80?img=12"
            alt="Avatar"
            fallback="GA"
          />
          <Avatar
            size="md"
            src="https://i.pravatar.cc/80?img=32"
            alt="Avatar"
            fallback="GA"
          />
          <Avatar size="lg" fallback="GA" />
          <AvatarRoot size="lg">
            <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="Avatar" />
            <AvatarFallback>AB</AvatarFallback>
          </AvatarRoot>
        </Section>

        <Section title="Table">
          <div style={{ width: 420 }}>
            <TableRoot>
              <TableCaption>Recent invoices, including a selected row.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INV-0091</TableCell>
                  <TableCell><Tag variant="success">Paid</Tag></TableCell>
                  <TableCell style={{ textAlign: 'right' }}>$1,250.00</TableCell>
                </TableRow>
                <TableRow selected>
                  <TableCell>INV-0092</TableCell>
                  <TableCell><Tag variant="warning">Pending</Tag></TableCell>
                  <TableCell style={{ textAlign: 'right' }}>$320.50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV-0093</TableCell>
                  <TableCell><Tag variant="error">Overdue</Tag></TableCell>
                  <TableCell style={{ textAlign: 'right' }}>$96.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell style={{ textAlign: 'right' }}>$1,666.50</TableCell>
                </TableRow>
              </TableFooter>
            </TableRoot>
          </div>
        </Section>

        <Section title="Separator">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
            <Text size="sm">Above</Text>
            <Separator />
            <Text size="sm">Below</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
            <Text size="sm">Left</Text>
            <Separator orientation="vertical" />
            <Text size="sm">Right</Text>
          </div>
        </Section>

        <Section title="ScrollArea">
          <ScrollArea style={{ width: 220, height: 140, boxShadow: 'var(--shadow-card)', borderRadius: 12 }}>
            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Array.from({ length: 20 }, (_, i) => (
                <Text key={i} size="sm" color="secondary">
                  Scrollable row {i + 1}
                </Text>
              ))}
            </div>
          </ScrollArea>
        </Section>

        <Section title="GradientMask">
          <div
            style={{
              position: 'relative',
              width: 220,
              height: 160,
              overflow: 'hidden',
              borderRadius: 12,
              background: 'var(--bg-secondary)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <GradientMask direction="top" color="var(--bg-secondary)" />
            <GradientMask direction="bottom" color="var(--bg-secondary)" />
            <div
              style={{
                height: '100%',
                overflowY: 'auto',
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <Text key={i} size="sm" color="secondary">
                  Scrollable row {i + 1}
                </Text>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Popover">
          <PopoverRoot>
            <PopoverTrigger>
              <Button variant="secondary">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
                <Text size="sm" weight="medium">
                  Dimensions
                </Text>
                <Text size="sm" color="secondary">
                  Popover content matches the menu surface styling.
                </Text>
              </div>
            </PopoverContent>
          </PopoverRoot>
        </Section>

        <Section title="HoverCard">
          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="secondary">Hover for card</Button>
            </HoverCardTrigger>
            <HoverCardContent width="md">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Avatar size="lg" fallback="UI" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Text size="sm" weight="medium">
                    ui library
                  </Text>
                  <Text size="xs" color="secondary">
                    Radix primitives, styled.
                  </Text>
                </div>
              </div>
            </HoverCardContent>
          </HoverCardRoot>
        </Section>

        <Section title="AlertDialog">
          <AlertDialogRoot>
            <AlertDialogTrigger>
              <Button variant="secondary">Delete file…</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Delete this file?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The file will be permanently removed.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogRoot>
        </Section>

        <Section title="Menubar">
          <MenubarRoot>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent width="sm">
                <MenubarItem suffixSlot={<span>⌘N</span>}>New file</MenubarItem>
                <MenubarItem suffixSlot={<span>⌘O</span>}>Open…</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Export</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>PNG</MenubarItem>
                    <MenubarItem>SVG</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent width="sm">
                <MenubarItem suffixSlot={<span>⌘Z</span>}>Undo</MenubarItem>
                <MenubarItem suffixSlot={<span>⇧⌘Z</span>}>Redo</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent width="sm">
                <MenubarCheckboxItem
                  checked={menubarChecks}
                  onCheckedChange={(v) => setMenubarChecks(Boolean(v))}
                >
                  Show grid
                </MenubarCheckboxItem>
              </MenubarContent>
            </MenubarMenu>
          </MenubarRoot>
        </Section>

        <Section title="NavigationMenu">
          <NavigationMenuRoot>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 200 }}>
                    <NavigationMenuLink href="#">Overview</NavigationMenuLink>
                    <NavigationMenuLink href="#">Changelog</NavigationMenuLink>
                    <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 200 }}>
                    <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
                    <NavigationMenuLink href="#">Community</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Blog</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenuRoot>
        </Section>

        <Section title="Toast">
          <Button variant="secondary" onClick={() => setToastOpen(true)}>
            Show toast
          </Button>
          <ToastRoot open={toastOpen} onOpenChange={setToastOpen} duration={4000}>
            <ToastTitle>File saved</ToastTitle>
            <ToastDescription>Your changes have been saved.</ToastDescription>
            <ToastAction altText="Undo save" asChild>
              <button onClick={() => setToastOpen(false)}>Undo</button>
            </ToastAction>
            <ToastClose />
          </ToastRoot>
        </Section>

        <Section title="Sidebar">
          <div
            style={{
              height: 380,
              display: 'flex',
              boxShadow: 'var(--shadow-card)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <Sidebar>
              <SidebarHeader>
                <Avatar size="sm" fallback="UI" />
                <Text size="sm" weight="medium">
                  Workspace
                </Text>
              </SidebarHeader>
              <SidebarContent>
                <SidebarSection>
                  <SidebarItem
                    active={sidebarItem === 'inbox'}
                    onClick={() => setSidebarItem('inbox')}
                    prefixSlot={<SFSymbol symbol="􀈕" size="sm" />}
                    suffixSlot={<Tag>3</Tag>}
                  >
                    Inbox
                  </SidebarItem>
                  <SidebarItem
                    active={sidebarItem === 'drafts'}
                    onClick={() => setSidebarItem('drafts')}
                    prefixSlot={<SFSymbol symbol="􀈎" size="sm" />}
                  >
                    Drafts
                  </SidebarItem>
                  <SidebarItem
                    active={sidebarItem === 'sent'}
                    onClick={() => setSidebarItem('sent')}
                    prefixSlot={<SFSymbol symbol="􀈟" size="sm" />}
                  >
                    Sent
                  </SidebarItem>
                </SidebarSection>
                <SidebarSection label="Projects">
                  <SidebarItem
                    active={sidebarItem === 'design'}
                    onClick={() => setSidebarItem('design')}
                  >
                    Design system
                  </SidebarItem>
                  <SidebarItem
                    active={sidebarItem === 'website'}
                    onClick={() => setSidebarItem('website')}
                  >
                    Website refresh
                  </SidebarItem>
                  <SidebarItem disabled>Archived project</SidebarItem>
                </SidebarSection>
                <SidebarSeparator />
                <SidebarCollapsibleSection label="Favorites">
                  <SidebarItem
                    active={sidebarItem === 'roadmap'}
                    onClick={() => setSidebarItem('roadmap')}
                  >
                    Roadmap with a very long name that truncates
                  </SidebarItem>
                  <SidebarItem href="#">Link item</SidebarItem>
                </SidebarCollapsibleSection>
              </SidebarContent>
              <SidebarFooter>
                <SidebarItem prefixSlot={<SFSymbol symbol="􀍟" size="sm" />}>
                  Settings
                </SidebarItem>
              </SidebarFooter>
            </Sidebar>
            <div
              style={{
                flex: 1,
                minWidth: 240,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
              }}
            >
              <Text size="sm" color="secondary">
                selected: {sidebarItem}
              </Text>
            </div>
          </div>
        </Section>

        <Section title="SplitPane">
          <div
            style={{
              width: '100%',
              height: 280,
              boxShadow: 'var(--shadow-card)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <SplitPane defaultSizes={[1, 3]}>
              <SplitPanePane minSize={120} snap>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)' }}>
                  <Text size="sm" color="secondary">
                    snaps closed
                  </Text>
                </div>
              </SplitPanePane>
              <SplitPanePane minSize={160}>
                <SplitPane vertical defaultSizes={[2, 1]}>
                  <SplitPanePane minSize={80}>
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
                      <Text size="sm" color="secondary">
                        main
                      </Text>
                    </div>
                  </SplitPanePane>
                  <SplitPanePane minSize={60}>
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)' }}>
                      <Text size="sm" color="secondary">
                        bottom panel
                      </Text>
                    </div>
                  </SplitPanePane>
                </SplitPane>
              </SplitPanePane>
            </SplitPane>
          </div>
        </Section>

        <Section title="AspectRatio">
          <div style={{ width: 240 }}>
            <AspectRatio ratio={16 / 9}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--gray-3)',
                  borderRadius: 12,
                }}
              >
                <Text size="sm" color="secondary">
                  16 : 9
                </Text>
              </div>
            </AspectRatio>
          </div>
        </Section>

        <Section title="Form">
          <FormRoot
            style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <FormField name="email">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <TextInput width="fill" type="email" required placeholder="you@example.com" />
              </FormControl>
              <FormMessage match="valueMissing">Please enter your email.</FormMessage>
              <FormMessage match="typeMismatch">Please enter a valid email.</FormMessage>
            </FormField>
            <div>
              <FormSubmit>
                <Button>Submit</Button>
              </FormSubmit>
            </div>
          </FormRoot>
        </Section>
      </main>
      <ToastViewport />
      </ToastProvider>
      </TooltipProvider>
    </Theme>
  );
}

export default App;
