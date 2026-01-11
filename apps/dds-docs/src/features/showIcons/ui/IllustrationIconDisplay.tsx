"use client";

import {
  BarChart, Bullseye, ConvenienceStore, CookedRice,
  CreditCard, Dgit, FullMoonFace, Globe, Handshake,
  LoudSpeaker, MusicalNote, Schedule, School, SchoolBus,
  Smile, Tent, Trophy
} from "@dds-web/iconography/illustration";

const IllustrationIconDisplay = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 my-6">
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <BarChart />
    <span className="text-xs text-text-tertiary">BarChart</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <Bullseye />
    <span className="text-xs text-text-tertiary">Bullseye</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <ConvenienceStore />
    <span className="text-xs text-text-tertiary text-center">ConvenienceStore</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <CookedRice />
    <span className="text-xs text-text-tertiary">CookedRice</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <CreditCard />
    <span className="text-xs text-text-tertiary">CreditCard</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <Dgit />
    <span className="text-xs text-text-tertiary">Dgit</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <FullMoonFace />
    <span className="text-xs text-text-tertiary">FullMoonFace</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <Globe />
    <span className="text-xs text-text-tertiary">Globe</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <Handshake />
    <span className="text-xs text-text-tertiary">HandShake</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <LoudSpeaker />
    <span className="text-xs text-text-tertiary">LoudSpeaker</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <MusicalNote />
    <span className="text-xs text-text-tertiary">MusicalNote</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <Schedule />
    <span className="text-xs text-text-tertiary">Schedule</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <School />
    <span className="text-xs text-text-tertiary">School</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <SchoolBus />
    <span className="text-xs text-text-tertiary">SchoolBus</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <Smile />
    <span className="text-xs text-text-tertiary">Smile</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <Tent />
    <span className="text-xs text-text-tertiary">Tent</span>
  </div>
  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-normal hover:bg-fill-primary transition-colors">
    <Trophy />
    <span className="text-xs text-text-tertiary">Trophy</span>
  </div>
</div>

  )
}

export default IllustrationIconDisplay