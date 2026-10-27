/**
 * Mise en forme des horaires d'ouverture et calcul de l'etat "ouvert / ferme".
 *
 * Tout part de `siteConfig.sections.hours.schedule`, defini dans `data/site.ts`.
 */
import { labels, t } from "@/lib/labels";
import type { DaySchedule, TimeRange, Weekday } from "@/types/site";

/** Ordre d'affichage, du lundi au dimanche. */
export const WEEK_ORDER: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

/** Libelles francais des jours. */
export const DAY_LABELS: Record<Weekday, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

/** Equivalents schema.org, utilises par le JSON-LD. */
const SCHEMA_DAYS: Record<Weekday, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/** Convertit "09:30" en minutes depuis minuit. */
function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/** Formate "09:00" en "9h00" et "14:30" en "14h30". */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  return `${Number(hours)}h${minutes ?? "00"}`;
}

/** Formate un creneau : "9h00 - 13h00". */
export function formatRange(range: TimeRange): string {
  return `${formatTime(range.open)} - ${formatTime(range.close)}`;
}

/**
 * Texte affiche pour une journee :
 * la note personnalisee si elle existe, sinon les creneaux, sinon "Fermé".
 */
export function formatDay(day: DaySchedule): string {
  if (day.ranges.length === 0) return day.note || labels.closed;
  const ranges = day.ranges.map(formatRange).join(" · ");
  return day.note ? `${ranges} (${day.note})` : ranges;
}

/**
 * Version compacte pour les espaces etroits (pied de page) :
 * "9h00-13h00, 14h00-19h00".
 */
export function formatDayCompact(day: DaySchedule): string {
  if (day.ranges.length === 0) return labels.closed;
  return day.ranges
    .map((range) => `${formatTime(range.open)}-${formatTime(range.close)}`)
    .join(", ");
}

/** Trie les horaires dans l'ordre de la semaine, quelle que soit la saisie. */
export function sortSchedule(schedule: DaySchedule[]): DaySchedule[] {
  return [...schedule].sort(
    (a, b) => WEEK_ORDER.indexOf(a.day) - WEEK_ORDER.indexOf(b.day),
  );
}

export interface OpenState {
  /** L'etablissement est-il ouvert a l'instant present ? */
  isOpen: boolean;
  /** Libelle pret a afficher ("Ouvert · ferme à 19h00", "Fermé · ouvre lundi à 9h00"). */
  label: string;
}

/**
 * Calcule l'etat d'ouverture a un instant donne.
 *
 * @param schedule  Horaires de la semaine.
 * @param timezone  Fuseau IANA (ex : "Europe/Paris"). Sans valeur, le fuseau
 *                  du navigateur est utilise.
 * @param now       Date de reference (injectable pour les tests).
 *
 * Note : cette fonction doit etre appelee cote client uniquement
 * (voir `components/ui/OpenStatus.tsx`), sinon le rendu serveur et le rendu
 * navigateur peuvent differer.
 */
export function getOpenState(
  schedule: DaySchedule[],
  timezone?: string,
  now: Date = new Date(),
): OpenState {
  const { weekdayIndex, minutes } = getLocalTime(now, timezone);
  const today = WEEK_ORDER[weekdayIndex];
  const todaySchedule = schedule.find((day) => day.day === today);

  // 1. Un creneau est-il en cours ?
  const current = todaySchedule?.ranges.find(
    (range) => minutes >= toMinutes(range.open) && minutes < toMinutes(range.close),
  );
  if (current) {
    return {
      isOpen: true,
      label: t(labels.openNow, { time: formatTime(current.close) }),
    };
  }

  // 2. Sinon, on cherche la prochaine ouverture sur les sept jours suivants.
  for (let offset = 0; offset < 8; offset += 1) {
    const index = (weekdayIndex + offset) % 7;
    const day = schedule.find((entry) => entry.day === WEEK_ORDER[index]);
    if (!day) continue;

    const next = day.ranges.find(
      (range) => offset > 0 || toMinutes(range.open) > minutes,
    );
    if (!next) continue;

    const time = formatTime(next.open);
    const when =
      offset === 0
        ? t(labels.opensAt, { time })
        : offset === 1
          ? t(labels.opensTomorrow, { time })
          : t(labels.opensOnDay, {
              day: DAY_LABELS[WEEK_ORDER[index]].toLowerCase(),
              time,
            });
    return { isOpen: false, label: t(labels.closedNow, { when }) };
  }

  return { isOpen: false, label: labels.closed };
}

/** Jour de la semaine et minutes ecoulees, dans le fuseau demande. */
function getLocalTime(
  date: Date,
  timezone?: string,
): { weekdayIndex: number; minutes: number } {
  try {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
    const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
    const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
    const index = WEEK_ORDER.findIndex(
      (day) => day.toLowerCase() === weekday.toLowerCase(),
    );
    return {
      // Intl renvoie dimanche = 0 cote Date : on se replace sur lundi = 0.
      weekdayIndex: index === -1 ? (date.getDay() + 6) % 7 : index,
      minutes: hour * 60 + minute,
    };
  } catch {
    // Fuseau invalide : on retombe sur l'heure locale du navigateur.
    return {
      weekdayIndex: (date.getDay() + 6) % 7,
      minutes: date.getHours() * 60 + date.getMinutes(),
    };
  }
}

/** Horaires au format schema.org, pour le JSON-LD `openingHoursSpecification`. */
export function toOpeningHoursSpecification(schedule: DaySchedule[]) {
  return schedule.flatMap((day) =>
    day.ranges.map((range) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[day.day]}`,
      opens: range.open,
      closes: range.close,
    })),
  );
}
