import { useState } from 'react';
import { Theme } from 'ui/components/theme';
import { TooltipProvider } from 'ui/components/tooltip';
import { ToastProvider, ToastViewport } from 'ui/components/toast';

import { TextSection } from './sections/Text';
import { SFSymbolSection } from './sections/SFSymbol';
import { ButtonSection } from './sections/Button';
import { CheckboxSection } from './sections/Checkbox';
import { SwitchSection } from './sections/Switch';
import { RadioSection } from './sections/Radio';
import { ToggleGroupSection } from './sections/ToggleGroup';
import { TagSection } from './sections/Tag';
import { MiddleDotSection } from './sections/MiddleDot';
import { PieChartSection } from './sections/PieChart';
import { TextInputSection } from './sections/TextInput';
import { TextAreaSection } from './sections/TextArea';
import { PasswordInputSection } from './sections/PasswordInput';
import { OTPInputSection } from './sections/OTPInput';
import { CalloutSection } from './sections/Callout';
import { TooltipSection } from './sections/Tooltip';
import { DialogSection } from './sections/Dialog';
import { DrawerSection } from './sections/Drawer';
import { MenuPrimitivesSection } from './sections/MenuPrimitives';
import { ContextMenuSection } from './sections/ContextMenu';
import { DropdownMenuSection } from './sections/DropdownMenu';
import { LabelSection } from './sections/Label';
import { ToggleSection } from './sections/Toggle';
import { ToolbarSection } from './sections/Toolbar';
import { TabsSection } from './sections/Tabs';
import { AccordionSection } from './sections/Accordion';
import { CollapsibleSection } from './sections/Collapsible';
import { SelectSection } from './sections/Select';
import { ComboboxSection } from './sections/Combobox';
import { SliderSection } from './sections/Slider';
import { SpinnerSection } from './sections/Spinner';
import { ProgressSection } from './sections/Progress';
import { AvatarSection } from './sections/Avatar';
import { TableSection } from './sections/Table';
import { SeparatorSection } from './sections/Separator';
import { CardSection } from './sections/Card';
import { CarouselSection } from './sections/Carousel';
import { ScrollAreaSection } from './sections/ScrollArea';
import { IconSwapSection } from './sections/IconSwap';
import { GradientMaskSection } from './sections/GradientMask';
import { PopoverSection } from './sections/Popover';
import { HoverCardSection } from './sections/HoverCard';
import { AlertDialogSection } from './sections/AlertDialog';
import { FullscreenModalSection } from './sections/FullscreenModal';
import { MenubarSection } from './sections/Menubar';
import { NavigationMenuSection } from './sections/NavigationMenu';
import { ToastSection } from './sections/Toast';
import { SidebarSection } from './sections/Sidebar';
import { SplitPaneSection } from './sections/SplitPane';
import { AspectRatioSection } from './sections/AspectRatio';
import { FormSection } from './sections/Form';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

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

            <TextSection />
            <SFSymbolSection />
            <ButtonSection />
            <CheckboxSection />
            <SwitchSection />
            <RadioSection />
            <ToggleGroupSection />
            <TagSection />
            <MiddleDotSection />
            <PieChartSection />
            <TextInputSection />
            <TextAreaSection />
            <PasswordInputSection />
            <OTPInputSection />
            <CalloutSection />
            <TooltipSection />
            <DialogSection />
            <DrawerSection />
            <MenuPrimitivesSection />
            <ContextMenuSection />
            <DropdownMenuSection />
            <LabelSection />
            <ToggleSection />
            <ToolbarSection />
            <TabsSection />
            <AccordionSection />
            <CollapsibleSection />
            <SelectSection />
            <ComboboxSection />
            <SliderSection />
            <SpinnerSection />
            <ProgressSection />
            <AvatarSection />
            <TableSection />
            <SeparatorSection />
            <CardSection />
            <CarouselSection />
            <ScrollAreaSection />
            <IconSwapSection />
            <GradientMaskSection />
            <PopoverSection />
            <HoverCardSection />
            <AlertDialogSection />
            <FullscreenModalSection />
            <MenubarSection />
            <NavigationMenuSection />
            <ToastSection />
            <SidebarSection />
            <SplitPaneSection />
            <AspectRatioSection />
            <FormSection />
          </main>
          <ToastViewport />
        </ToastProvider>
      </TooltipProvider>
    </Theme>
  );
}

export default App;
