"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Bus,
  Calendar,
  Chart,
  Chat,
  Checkmark,
  CheckmarkCircleFill,
  CheckmarkCircleLine,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Close,
  Crown,
  DoorOpen,
  ExclamationmarkCircle,
  Eye,
  EyeSlash,
  File,
  ForkAndKnife,
  Gear,
  Home,
  Link,
  MagnifyingGlass,
  Megaphone,
  Menu,
  MoonPlus,
  Note,
  Pen,
  People,
  Person,
  Photo,
  Plus,
  Trash,
  XmarkCircle,
} from "dodam-design-system/icons/mono";
import { colors } from "dodam-design-system/colors";

const MonoIconDisplay = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 my-6">
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ArrowDown color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ArrowDown</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ArrowLeft color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ArrowLeft</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ArrowRight color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ArrowRight</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ArrowUp color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ArrowUp</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Bell color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Bell</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Bus color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Bus</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Calendar color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Calendar</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Chart color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Chart</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Chat color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Chat</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Checkmark color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Checkmark</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <CheckmarkCircleFill color={colors.text.primary} />
        <span className="text-xs text-text-tertiary text-center">
          CheckmarkCircleFill
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <CheckmarkCircleLine color={colors.text.primary} />
        <span className="text-xs text-text-tertiary text-center">
          CheckmarkCircleLine
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ChevronDown color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ChevronDown</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ChevronLeft color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ChevronLeft</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ChevronRight color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ChevronRight</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ChevronUp color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ChevronUp</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Clock color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Clock</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Close color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Close</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Crown color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Crown</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <DoorOpen color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">DoorOpen</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ExclamationmarkCircle color={colors.text.primary} />
        <span className="text-xs text-text-tertiary text-center">
          ExclamationmarkCircle
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Eye color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Eye</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <EyeSlash color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">EyeSlash</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <File color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">File</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <ForkAndKnife color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">ForkAndKnife</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Gear color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Gear</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Home color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Home</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Link color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Link</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <MagnifyingGlass color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">MagnifyingGlass</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Megaphone color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Megaphone</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Menu color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Menu</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <MoonPlus color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">MoonPlus</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Note color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Note</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Pen color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Pen</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <People color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">People</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Person color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Person</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Photo color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Photo</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Plus color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Plus</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <Trash color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">Trash</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
        <XmarkCircle color={colors.text.primary} />
        <span className="text-xs text-text-tertiary">XmarkCircle</span>
      </div>
    </div>
  );
};

export default MonoIconDisplay;
