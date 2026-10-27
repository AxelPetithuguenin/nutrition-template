"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";
import { mailtoHref } from "@/lib/contact";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Formulaire de contact.
 *
 * Deux modes, selon `contact.formEndpoint` dans `data/site.ts` :
 *  - endpoint renseigne (Formspree, Web3Forms, Basin, n8n...) : envoi en JSON ;
 *  - endpoint vide : ouverture du logiciel de messagerie avec un e-mail
 *    pre-rempli, pour qu'un site livre sans backend reste fonctionnel.
 *
 * Les libelles, le message de succes et la mention RGPD viennent tous de la
 * configuration : aucun texte n'est ecrit ici.
 */
export function ContactForm() {
  const { contact, sections, company } = siteConfig;
  const form = sections.contact.form;
  const [status, setStatus] = useState<Status>("idle");

  // Sans textes de formulaire dans la configuration, rien n'est affiche.
  if (!form) return null;

  /**
   * Champs sans contour lateral : seul un filet inferieur separe la saisie,
   * qui s'epaissit et se teinte a la mise au point. Plus sobre qu'une boite
   * complete, et plus proche d'un formulaire de papeterie que d'un formulaire
   * d'administration.
   */
  const inputClass =
    "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-ink transition-colors duration-500 " +
    "placeholder:text-muted/50 focus:border-primary focus:ring-0 focus:outline-none";

  const labelClass = "eyebrow text-muted/80";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);

    // Piege a robots : champ invisible qui doit rester vide.
    if (data.get("company_website")) return;

    const payload = Object.fromEntries(data.entries());

    // --- Mode sans backend : e-mail pre-rempli --------------------------
    if (!contact.formEndpoint) {
      const body = [
        `Nom : ${payload.name ?? ""}`,
        `E-mail : ${payload.email ?? ""}`,
        `Téléphone : ${payload.phone ?? ""}`,
        payload.subject ? `Motif : ${payload.subject}` : "",
        "",
        String(payload.message ?? ""),
      ]
        .filter(Boolean)
        .join("\n");

      window.location.href = mailtoHref(contact.email, {
        subject: `${company.name} — demande de ${payload.name ?? "contact"}`,
        body,
      });
      setStatus("success");
      formElement.reset();
      return;
    }

    // --- Mode avec endpoint --------------------------------------------
    setStatus("sending");
    try {
      const response = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Réponse ${response.status}`);

      setStatus("success");
      formElement.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="name" className={labelClass}>
            {form.nameLabel} <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className={labelClass}>
            {form.emailLabel} <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="phone" className={labelClass}>
            {form.phoneLabel}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </div>

        {form.subjects && form.subjects.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <label htmlFor="subject" className={labelClass}>
              {form.subjectLabel ?? labels.subjectFallback}
            </label>
            <select id="subject" name="subject" defaultValue="" className={inputClass}>
              <option value="" disabled>
                {labels.selectPlaceholder}
              </option>
              {form.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="message" className={labelClass}>
          {form.messageLabel} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={cn(inputClass, "resize-y")}
        />
      </div>

      {/* Champ piege : masque aux humains, rempli par les robots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Ne pas remplir</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group/btn mt-2 inline-flex cursor-pointer items-center justify-center gap-2.5 self-start rounded-full bg-primary px-9 py-4 font-medium text-on-primary shadow-card transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-primary-dark hover:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
      >
        {status === "sending" ? labels.sending : form.submitLabel}
        <Icon
          name="arrow-right"
          size={16}
          className="-mr-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
        />
      </button>

      {/* Messages d'etat, annonces aux lecteurs d'ecran. */}
      <p aria-live="polite" className="sr-only">
        {status === "success" ? form.successMessage : status === "error" ? form.errorMessage : ""}
      </p>

      {status === "success" && (
        <p className="flex items-start gap-3 rounded-theme bg-primary-light p-5 text-sm leading-relaxed text-primary-dark">
          <Icon name="check-circle" size={18} className="mt-0.5 shrink-0" />
          {form.successMessage}
        </p>
      )}

      {status === "error" && (
        <p className="flex items-start gap-3 rounded-theme bg-accent/12 p-5 text-sm leading-relaxed text-ink">
          <Icon name="close" size={18} className="mt-0.5 shrink-0" />
          {form.errorMessage}
        </p>
      )}

      {form.consentText && (
        <p className="text-xs leading-relaxed text-muted/90">{form.consentText}</p>
      )}
    </form>
  );
}

export default ContactForm;
