import {
  Activity,
  Apple,
  ArrowRight,
  ArrowUpRight,
  Award,
  Baby,
  BicepsFlexed,
  BookOpen,
  Brain,
  Calendar,
  CalendarCheck,
  Carrot,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Clock,
  Compass,
  Droplet,
  Dumbbell,
  Fish,
  Flame,
  Flower2,
  Footprints,
  Handshake,
  Heart,
  HeartPulse,
  Leaf,
  type LucideIcon,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  NotebookPen,
  Phone,
  Plus,
  Quote,
  Salad,
  Scale,
  Send,
  Shield,
  Smile,
  Soup,
  Sparkles,
  Sprout,
  Star,
  Stethoscope,
  Sun,
  Target,
  TrendingUp,
  Users,
  Utensils,
  Video,
  Wheat,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types/site";

/**
 * Registre d'icones du template.
 *
 * Les icones sont designees par leur NOM dans `data/site.ts` (`icon: "leaf"`),
 * jamais importees dans les composants de section : le client peut donc changer
 * une icone sans toucher au code.
 *
 * Deux sources :
 *  - Lucide React pour l'interface et les pictogrammes metier ;
 *  - des traces maison pour les reseaux sociaux, Lucide ne distribuant plus
 *    les logos de marques.
 *
 * Ajouter une icone : l'importer ci-dessus, l'ajouter au registre, puis
 * completer le type `IconName` dans `types/site.ts`.
 */
const LUCIDE_ICONS: Partial<Record<IconName, LucideIcon>> = {
  // Interface
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  check: Check,
  "check-circle": CircleCheck,
  menu: Menu,
  close: X,
  plus: Plus,
  minus: Minus,
  quote: Quote,
  star: Star,
  sparkles: Sparkles,
  // Contact
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  clock: Clock,
  calendar: Calendar,
  "calendar-check": CalendarCheck,
  send: Send,
  message: MessageCircle,
  // Nutrition
  leaf: Leaf,
  sprout: Sprout,
  salad: Salad,
  soup: Soup,
  utensils: Utensils,
  apple: Apple,
  carrot: Carrot,
  wheat: Wheat,
  fish: Fish,
  flame: Flame,
  droplet: Droplet,
  moon: Moon,
  sun: Sun,
  // Accompagnement
  heart: Heart,
  "heart-pulse": HeartPulse,
  activity: Activity,
  scale: Scale,
  dumbbell: Dumbbell,
  biceps: BicepsFlexed,
  flower: Flower2,
  baby: Baby,
  brain: Brain,
  stethoscope: Stethoscope,
  clipboard: ClipboardList,
  notebook: NotebookPen,
  "trending-up": TrendingUp,
  compass: Compass,
  target: Target,
  shield: Shield,
  users: Users,
  handshake: Handshake,
  award: Award,
  book: BookOpen,
  video: Video,
  smile: Smile,
  footprints: Footprints,
};

/** Traces des reseaux sociaux, dessines dans le meme style que Lucide. */
const BRAND_PATHS: Partial<Record<IconName, React.ReactNode>> = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <path d="M17.6 6.4h.01" />
    </>
  ),
  facebook: (
    <path d="M15.5 3.5h-2.2a3.8 3.8 0 0 0-3.8 3.8v2.4H7.2v3.2h2.3V21h3.3v-8.1h2.4l.5-3.2h-2.9V7.6c0-.5.4-.9.9-.9h1.8V3.5Z" />
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
      <path d="M7.3 10.4V17M7.3 7.2h.01" />
      <path d="M11.6 17v-6.6M11.6 13.2c0-1.6 1-2.6 2.5-2.6s2.4 1 2.4 2.6V17" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5.5" width="20" height="13" rx="4.5" />
      <path d="m10.2 9.4 5 2.6-5 2.6V9.4Z" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14.2 3.5V15a4.2 4.2 0 1 1-3.4-4.1" />
      <path d="M14.2 6.6c.9 1.8 2.5 2.9 4.6 3" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.2 20.8 4.8 16.5a8.2 8.2 0 1 1 3.2 3.1l-4.8 1.2Z" />
      <path d="M9 9c.3 2.4 2.4 4.5 4.8 4.8l1-1.3 1.9.9-.3 1.7c-3 .5-7.2-3.6-6.7-6.7l1.7-.3.9 1.9L9 9Z" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M9.4 20.4c-.5-1.8 0-3.7.4-5.5.5-2.1 1.1-4.5 3-4.5 1.3 0 2 1.1 2 2.3 0 1.5-.9 3.6-1.5 5.6" />
      <path d="M9.5 14.9c-1-.6-1.6-1.9-1.6-3.4a4.6 4.6 0 0 1 4.8-4.6c2.7 0 4.6 1.8 4.6 4.2 0 2.7-1.7 4.9-4.1 4.9-.8 0-1.5-.4-1.9-1" />
    </>
  ),
  twitter: <path d="M4 4l16 16M20 4 4 20" />,
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.2 1.2" />
      <path d="M14 10a4 4 0 0 0-5.7 0L5.5 12.8a4 4 0 0 0 5.7 5.7l1.2-1.2" />
    </>
  ),
};

export interface IconProps {
  /** Nom de l'icone, tel qu'il est saisi dans `data/site.ts`. */
  name: IconName;
  /** Taille en pixels (largeur et hauteur). */
  size?: number;
  /** Epaisseur du trait. 1.5 par defaut : plus fin, plus elegant. */
  strokeWidth?: number;
  className?: string;
}

/**
 * Affiche une icone du registre.
 * L'icone herite de la couleur du texte parent (`currentColor`).
 */
export function Icon({ name, size = 20, strokeWidth = 1.5, className }: IconProps) {
  const LucideGlyph = LUCIDE_ICONS[name];

  if (LucideGlyph) {
    return (
      <LucideGlyph
        size={size}
        strokeWidth={strokeWidth}
        aria-hidden="true"
        focusable="false"
        className={cn("shrink-0", className)}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      {BRAND_PATHS[name] ?? BRAND_PATHS.link}
    </svg>
  );
}

export default Icon;
