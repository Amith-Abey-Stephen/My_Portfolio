import { Calendar, Globe, Users, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const communityIntro = {
  eyebrow: "Community Leadership",
  heading: "Empowering the next generation of builders.",
  body: "As CEO of Inovus Labs IEDC, I led innovation-driven technical initiatives, hackathons, and startup programs under the Kerala Startup Mission — focusing on a culture of building, mentoring students, and organising international technical events.",
};

export const stats: Stat[] = [
  { value: "3+", label: "Years of Hacktoberfest", icon: Calendar },
  { value: "75+", label: "Open source contributions", icon: Globe },
  { value: "30+", label: "Students mentored", icon: Users },
  { value: "10+", label: "Hackathons organised", icon: Trophy },
];
