# Checklist de livraison client

À parcourir avant chaque mise en ligne. Tout se passe dans `data/site.ts`
et `public/images/`.

## 1. Identité

- [ ] `company.name`, `company.tagline`, `company.description`
- [ ] `company.legalName`, `company.legalId` (SIRET)
- [ ] `company.professionalId` : ADELI, RPPS, n° d'ordre selon la profession
- [ ] `company.vatNumber` **ou** mention de franchise dans `legal.extraSections`,
      selon le régime réel du client
- [ ] `company.foundedYear`, `company.profession`

## 2. Coordonnées

- [ ] **Remplacer le numéro de démonstration.** Le template est livré avec un
      numéro de la plage réservée à la fiction (`0X 99 00 XX XX`) : il a
      l'apparence d'un vrai numéro mais ne sonne nulle part. Ne jamais
      inventer un numéro dans une plage réelle, il appartient à quelqu'un.
- [ ] **Remplacer le SIRET et l'identifiant professionnel** de démonstration
      par ceux du client (`company.legalId`, `company.professionalId`)
- [ ] `contact.phone` au format international (`+33…`) et `contact.phoneDisplay`
- [ ] `contact.email`
- [ ] Adresse complète, `countryCode` et `coordinates` (GPS) pour le SEO local
- [ ] `contact.mapEmbedUrl` (ou vide pour masquer la carte)
- [ ] `contact.bookingUrl` si prise de rendez-vous externe
- [ ] `contact.formEndpoint` **et test d'un envoi réel du formulaire**

## 3. Charte

- [ ] `theme.colors` : palette du client, contraste vérifié sur les boutons
- [ ] `theme.typography` : polices cohérentes avec la marque
- [ ] `theme.radius`, `theme.overlayOpacity`

## 4. Images

- [ ] Logo clair et logo sur fond sombre
- [ ] Hero (2400 × 1600), portrait (1200 × 1500), méthode, bannière CTA
- [ ] Trois visuels d'articles du journal
- [ ] Image de partage social (1200 × 630)
- [ ] Tous les `alt` rédigés (accessibilité et référencement)
- [ ] Visuels de substitution SVG retirés de `public/images/`
- [ ] Cadrage du hero vérifié (`images.hero.position`) : le texte occupe le bas gauche

## 5. Fraîcheur du contenu

- [ ] Dates des articles du journal récentes
- [ ] `legal.updatedAt` à jour
- [ ] Bandeau d'annonce (`navigation.announcement`) encore d'actualité —
      c'est le premier élément périssable d'un site vitrine
- [ ] Liens de réseaux sociaux pointant vers les vrais profils
- [ ] `footer.credits` : nom et site de votre agence

## 6. Contenu

- [ ] Hero : titre, `titleHighlight` bien contenu dans le titre, badge, boutons
- [ ] À propos : paragraphes, trois valeurs, signature
- [ ] Prestations : intitulés, tarifs, durées, prestation mise en avant
- [ ] Méthode : étapes, durées annoncées et réellement tenues
- [ ] Résultats : statistiques justifiables, témoignages **autorisés par écrit**
- [ ] Journal : trois articles, avec liens vers de vraies pages
- [ ] FAQ : questions réellement posées par les patients
- [ ] Horaires : créneaux exacts, pauses, jours fermés
- [ ] `sectionOrder` : sections utiles uniquement

## 7. Référencement

- [ ] `seo.siteUrl` = domaine final
- [ ] `seo.title` (≤ 60 caractères) et `seo.description` (≤ 160 caractères)
- [ ] `seo.businessType` adapté au métier (schema.org)
- [ ] `seo.aggregateRating` : note et nombre d'avis **réels et vérifiables**,
      cohérents avec ce qui est affiché en page (exigence Google)
- [ ] `seo.googleSiteVerification` si Search Console est utilisée
- [ ] **`seo.noIndex` repassé à `false`**

## 8. Pages légales

- [ ] `legal.host` : hébergeur réel du site
- [ ] `legal.publicationDirector`
- [ ] Mentions légales et politique de confidentialité relues par le client

## 9. Contenu sensible

- [ ] Mention de transparence présente sous les témoignages (`results.disclaimer`)
- [ ] Aucune promesse de résultat chiffré garanti
- [ ] Accord écrit des patients cités, prénoms modifiés si demandé
- [ ] Aucune allégation de santé relevant du médical

## 10. Vérifications finales

- [ ] `npm run typecheck` sans erreur
- [ ] `npm run lint` sans erreur
- [ ] `npm run build` sans erreur
- [ ] Affichage vérifié sur mobile, tablette et grand écran
- [ ] Navigation au clavier complète (menu, accordéon, formulaire)
- [ ] Rendu vérifié avec « réduire les animations » activé
- [ ] Liens `tel:`, `mailto:` et « Itinéraire » testés
- [ ] `NEXT_PUBLIC_SITE_URL` défini sur l'hébergement
- [ ] `footer.credits` : crédit de l'agence à jour
