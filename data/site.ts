import type { SiteConfig } from "@/types/site";

/**
 * ============================================================================
 *                        CONFIGURATION DU SITE CLIENT
 * ============================================================================
 *
 *  >> C'EST LE SEUL FICHIER A MODIFIER POUR LIVRER UN NOUVEAU SITE. <<
 *
 *  Marche a suivre pour un nouveau client :
 *    1. Dupliquer le projet.
 *    2. Remplacer les photos dans `public/images/`.
 *    3. Modifier les valeurs ci-dessous (nom, couleurs, contenus, horaires...).
 *    4. `npm run dev` pour verifier, `npm run build` pour livrer.
 *
 *  Aucun composant ne contient de texte, de couleur ou d'image en dur :
 *  tout remonte d'ici. Le typage (`types/site.ts`) signale immediatement
 *  toute cle manquante ou mal orthographiee.
 *
 *  Astuce : une section se masque en passant `enabled: false`, ou en retirant
 *  son identifiant de `sectionOrder`.
 * ============================================================================
 */
export const siteConfig: SiteConfig = {
  /* ==========================================================================
   *  1. ENTREPRISE
   * ======================================================================== */
  company: {
    name: "Camille Roux",
    legalName: "Camille Roux — Nutrition EI",
    tagline: "Nutrition sur mesure",
    description:
      "Cabinet de nutrition à Bordeaux. Un accompagnement personnalisé, fondé sur la science et mené sans régime restrictif, pour construire une alimentation qui vous ressemble.",
    profession: "Diététicienne-nutritionniste D.E.",
    foundedYear: 2014,
    legalId: "793 486 215 00024",
    // Les actes de dietetique d'un diplome d'Etat sont exoneres de TVA :
    // un cabinet comme celui-ci n'a donc pas de numero intracommunautaire.
    // La mention legale correspondante figure dans `legal.extraSections`.
    professionalId: { label: "Numéro ADELI", value: "33 95 0847 2" },
  },

  /* ==========================================================================
   *  2. COORDONNEES
   * ======================================================================== */
  contact: {
    /*
     * Numero pris dans la plage que l'ARCEP reserve a la fiction
     * (0X 99 00 XX XX) : il a l'apparence d'un numero francais ordinaire,
     * mais ne sonnera jamais chez un particulier. A remplacer par la vraie
     * ligne du client avant la mise en ligne.
     */
    phone: "+33599004682", // format international, sert au lien "tel:"
    phoneDisplay: "05 99 00 46 82", // format lisible affiche a l'ecran
    email: "contact@camilleroux-nutrition.fr",
    address: {
      street: "14 rue Notre-Dame",
      complement: "2e étage, sans ascenseur",
      postalCode: "33000",
      city: "Bordeaux",
      region: "Nouvelle-Aquitaine",
      country: "France",
      countryCode: "FR",
      coordinates: { latitude: 44.8496, longitude: -0.5725 },
    },
    // Laisser vide : le lien d'itineraire est genere depuis l'adresse ci-dessus.
    mapsUrl: "",
    // Carte integree. Coller ici l'URL du `src` de l'iframe Google Maps,
    // ou laisser vide pour masquer la carte.
    mapEmbedUrl:
      "https://www.google.com/maps?q=14+rue+Notre-Dame+33000+Bordeaux&output=embed",
    // Prise de rendez-vous externe (Doctolib, Calendly, Resalib...). Vide = masque.
    bookingUrl: "",
    // Endpoint du formulaire (Formspree, Web3Forms...).
    // Vide = le formulaire ouvre le logiciel de messagerie avec un e-mail pre-rempli.
    formEndpoint: "",
  },

  /* ==========================================================================
   *  3. RESEAUX SOCIAUX  (retirer une entree = retirer l'icone du site)
   * ======================================================================== */
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/camilleroux.nutrition/",
      icon: "instagram",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/camille-roux-nutrition/",
      icon: "linkedin",
    },
  ],

  /* ==========================================================================
   *  4. CHARTE GRAPHIQUE
   *     Ces couleurs alimentent automatiquement tout le site
   *     (boutons, liens, fonds, bordures, pied de page).
   *
   *     Note de direction artistique : le vert sauge est une couleur
   *     d'ambiance, pas une couleur d'action. Pose en aplat sous du texte
   *     blanc, son contraste est insuffisant (environ 2:1). Il habille donc
   *     les fonds et les details, tandis que le vert profond porte les
   *     boutons et les liens.
   * ======================================================================== */
  theme: {
    colors: {
      primary: "#36413E", // vert profond : boutons, liens, titres
      primaryDark: "#28312F", // survol
      primaryLight: "#ECEFE9", // fond teinte tres clair
      secondary: "#A8B59A", // vert sauge : aplats, details
      accent: "#C9A96A", // or discret : reserve aux accents rares
      background: "#F8F6F2", // creme
      surface: "#FDFCFA", // blanc casse : sections alternees
      text: "#2B332F",
      textMuted: "#5F6E66",
      border: "#E6E2D9",
      onPrimary: "#F8F6F2",
      footerBackground: "#36413E",
      footerText: "#EDEFEA",
    },
    typography: {
      heading: "playfair", // inter | poppins | playfair | dm-sans | lora | montserrat | fraunces | outfit
      body: "inter",
    },
    radius: "2xl", // 24 px
    overlayOpacity: 0.42, // voile sur les images de fond (0 a 1)
    animations: true, // apparitions au defilement
  },

  /* ==========================================================================
   *  5. IMAGES   (deposer les fichiers dans `public/images/`)
   *     Toujours renseigner `alt` : accessibilite + referencement.
   * ======================================================================== */
  images: {
    logo: { src: "/images/logo.svg", alt: "Camille Roux, nutrition", width: 190, height: 48 },
    logoLight: {
      src: "/images/logo-light.svg",
      alt: "Camille Roux, nutrition",
      width: 190,
      height: 48,
    },
    hero: {
      src: "/images/hero.jpg",
      alt: "Coupe de bois garnie de pommes, bananes et agrumes, éclairée par une lumière rasante",
      width: 2400,
      height: 1350,
      // Le texte se pose en bas à gauche : on décale le cadrage vers la droite
      // pour que la coupe reste dans le champ sans passer sous les mots.
      position: "60% center",
    },
    about: {
      src: "/images/about.jpg",
      alt: "Portrait de Camille Roux, diététicienne-nutritionniste, assise à son bureau",
      width: 1200,
      height: 1800,
      position: "center 30%",
    },
    ogImage: {
      src: "/images/og.jpg",
      alt: "Camille Roux — nutrition sur mesure à Bordeaux",
      width: 1200,
      height: 630,
    },
    ctaBackground: {
      src: "/images/cta.jpg",
      alt: "",
      width: 2000,
      height: 1333,
      position: "center 60%",
    },
  },

  /* ==========================================================================
   *  6. NAVIGATION
   * ======================================================================== */
  navigation: {
    links: [
      { label: "Accompagnements", href: "#services" },
      { label: "Le cabinet", href: "#about" },
      { label: "La méthode", href: "#method" },
      { label: "Résultats", href: "#results" },
      { label: "Journal", href: "#journal" },
      { label: "Questions", href: "#faq" },
    ],
    cta: { label: "Prendre rendez-vous", href: "#contact", variant: "primary" },
    showPhone: true,
    announcement: {
      text: "Prochaines disponibilités à partir du 10 novembre.",
      link: { label: "Réserver", href: "#contact" },
    },
  },

  /* ==========================================================================
   *  7. REFERENCEMENT
   * ======================================================================== */
  seo: {
    siteUrl: "https://www.camilleroux-nutrition.fr",
    lang: "fr",
    locale: "fr_FR",
    title: "Camille Roux — Diététicienne-nutritionniste à Bordeaux",
    description:
      "Cabinet de nutrition à Bordeaux : perte de poids durable, troubles digestifs, nutrition du sport et nutrition féminine. Accompagnement personnalisé, sans régime restrictif.",
    keywords: [
      "diététicienne Bordeaux",
      "nutritionniste Bordeaux",
      "consultation nutrition",
      "rééquilibrage alimentaire",
      "nutrition du sportif",
      "troubles digestifs",
    ],
    // Type schema.org de l'etablissement : affine le referencement local.
    businessType: "HealthAndBeautyBusiness",
    priceRange: "55-95 EUR",
    // Note affichee dans les resultats Google. A renseigner uniquement avec
    // des avis reels, et cohérente avec la statistique affichee en page.
    aggregateRating: { value: 4.9, count: 142 },
    googleSiteVerification: "",
    noIndex: false,
  },

  /* ==========================================================================
   *  8. ORDRE DES SECTIONS
   *     Reordonner les lignes change l'ordre sur la page.
   *     Supprimer une ligne retire la section (et son lien de menu).
   * ======================================================================== */
  sectionOrder: [
    "hero",
    // Les prestations viennent juste après le hero : leurs cartes débordent
    // sur son fond, et l'offre est visible sans avoir à faire défiler.
    "services",
    "about",
    "method",
    "results",
    "journal",
    "faq",
    "cta",
    "contact",
    // "gallery",      <- galerie photo du cabinet
    // "testimonials", <- avis courts (les temoignages detailles sont dans "results")
    // "hours",        <- horaires en section autonome (ils figurent deja dans "contact")
  ],

  /* ==========================================================================
   *  9. CONTENU DES SECTIONS
   * ======================================================================== */
  sections: {
    /* ---------------------------------------------------------------- HERO */
    hero: {
      enabled: true,
      layout: "decorated", // decorated | fullscreen | split | centered
      eyebrow: "Diététicienne-nutritionniste · Bordeaux",
      title: "Retrouvez une alimentation qui vous ressemble.",
      titleHighlight: "qui vous ressemble", // portion du titre mise en couleur
      subtitle:
        "Pas de régime, pas d'interdits, pas de promesses en trois semaines. Un travail patient sur vos habitudes réelles, pour des changements qui tiennent une fois le suivi terminé.",
      actions: [
        { label: "Prendre rendez-vous", href: "#contact", variant: "primary", icon: "calendar-check" },
        { label: "Découvrir l'accompagnement", href: "#services", variant: "outline" },
      ],
      highlights: [
        { icon: "video", text: "Cabinet ou visioconférence" },
        { icon: "shield", text: "Diplômée d'État" },
      ],
      badge: {
        value: "+500",
        label: "patients accompagnés depuis 2014",
        icon: "users",
      },
      /*
       * Visuels décoratifs de la mise en page `decorated`.
       * Positions en pourcentage : ils suivent la mise en page à toutes les
       * largeurs. Retirer une entrée allège la composition ; `desktopOnly`
       * masque l'élément sur petit écran.
       */
      decorations: [
        {
          src: "/images/deco/raisin.svg",
          top: "9%",
          left: "1%",
          width: "clamp(3.5rem, 12vw, 13rem)",
          rotate: -8,
          delay: 0,
        },
        {
          src: "/images/deco/avocat.svg",
          top: "12%",
          right: "3%",
          width: "clamp(2.75rem, 8.5vw, 9.5rem)",
          rotate: 12,
          delay: 1.2,
        },
        {
          src: "/images/deco/orange.svg",
          bottom: "22%",
          left: "7%",
          width: "clamp(3rem, 7.5vw, 8.5rem)",
          rotate: -6,
          delay: 2.1,
          desktopOnly: true,
        },
        {
          src: "/images/deco/orange-quartier.svg",
          bottom: "17%",
          left: "14%",
          width: "clamp(2rem, 4.5vw, 5rem)",
          rotate: 14,
          delay: 2.8,
          desktopOnly: true,
        },
        {
          src: "/images/deco/branche.svg",
          bottom: "14%",
          right: "3%",
          width: "clamp(3.5rem, 10vw, 11rem)",
          rotate: 8,
          delay: 3.4,
          desktopOnly: true,
        },
      ],
    },

    /* --------------------------------------------------------------- ABOUT */
    about: {
      enabled: true,
      imageSide: "left",
      eyebrow: "Le cabinet",
      title: "Comprendre avant de conseiller",
      subtitle: "Camille Roux, diététicienne-nutritionniste depuis 2014.",
      paragraphs: [
        "J'ai ouvert ce cabinet après huit années passées en service hospitalier, avec une conviction simple : on ne change pas durablement son alimentation en recevant une liste d'aliments autorisés. On la change en comprenant ce que l'on mange, pourquoi on le mange, et ce qui peut réellement bouger dans une semaine ordinaire.",
        "Chaque suivi commence donc par une heure d'écoute : votre histoire, vos contraintes professionnelles, votre budget, vos goûts, ce que vous avez déjà essayé. Le plan vient après, et il s'ajuste à chaque séance. L'objectif n'est jamais la restriction : c'est l'autonomie.",
      ],
      bullets: [
        {
          icon: "compass",
          title: "Approche personnalisée",
          description:
            "Aucun programme type. Ce qui fonctionne pour un cadre en déplacement ne fonctionne pas pour une famille de cinq personnes.",
        },
        {
          icon: "brain",
          title: "Science de la nutrition",
          description:
            "Des recommandations fondées sur les données actuelles, réévaluées chaque année en formation continue.",
        },
        {
          icon: "handshake",
          title: "Bienveillance",
          description:
            "Aucun aliment interdit, aucun jugement, aucune pesée imposée. Vous fixez le rythme, je tiens le cap.",
        },
      ],
      signature: { name: "Camille Roux", role: "Diététicienne-nutritionniste · D.E. Bordeaux" },
      cta: { label: "Échanger avec moi", href: "#contact", variant: "outline" },
      stats: [],
    },

    /* ------------------------------------------------------------ SERVICES */
    services: {
      enabled: true,
      columns: 3,
      // Les cartes remontent sur le fond du hero (maquette de référence).
      overlapPrevious: true,
      eyebrow: "Accompagnements",
      title: "Six parcours, une même méthode",
      subtitle:
        "Consultations au cabinet ou en visioconférence, à l'unité ou en suivi complet. Le premier rendez-vous dure toujours une heure.",
      items: [
        {
          id: "perte-de-poids",
          title: "Perte de poids",
          description:
            "Une perte progressive et tenable, construite sur vos repas réels plutôt que sur un modèle théorique.",
          icon: "trending-up",
          price: "70 €",
          duration: "60 min",
          features: ["Bilan des habitudes", "Objectifs par étapes", "Suivi du poids et des sensations"],
          featured: true,
          badge: "Le plus demandé",
        },
        {
          id: "reequilibrage",
          title: "Rééquilibrage alimentaire",
          description:
            "Retrouver des repas structurés et variés, sans y passer ses soirées ni doubler son budget courses.",
          icon: "salad",
          price: "65 €",
          duration: "60 min",
          features: ["Organisation des repas", "Courses et budget", "Recettes adaptées"],
        },
        {
          id: "sport",
          title: "Sport et performance",
          description:
            "Ajuster les apports autour de l'entraînement et de la compétition, pour la performance comme pour la récupération.",
          icon: "dumbbell",
          price: "80 €",
          duration: "60 min",
          features: ["Nutrition péri-entraînement", "Plan de compétition", "Récupération et sommeil"],
        },
        {
          id: "digestif",
          title: "Troubles digestifs",
          description:
            "Identifier les déclencheurs et réintroduire progressivement, en lien avec votre médecin ou gastro-entérologue.",
          icon: "stethoscope",
          price: "75 €",
          duration: "60 min",
          features: ["Protocole d'éviction encadré", "Réintroduction progressive", "Suivi des symptômes"],
        },
        {
          id: "feminine",
          title: "Nutrition féminine",
          description:
            "Grossesse, post-partum, SOPK, préménopause : accompagner les périodes où les besoins changent vite.",
          icon: "flower",
          price: "75 €",
          duration: "60 min",
          features: ["Besoins spécifiques", "Fatigue et carences", "Suivi rapproché"],
        },
        {
          id: "vegetarienne",
          title: "Nutrition végétarienne",
          description:
            "Couvrir tous les besoins sans produits animaux, en surveillant les points réellement sensibles.",
          icon: "sprout",
          price: "65 €",
          duration: "60 min",
          features: ["Apports en protéines", "Fer, B12, oméga-3", "Menus complets"],
        },
      ],
      cta: { label: "Voir les tarifs et modalités", href: "#faq", variant: "outline" },
    },

    /* -------------------------------------------------------------- METHODE */
    method: {
      enabled: true,
      eyebrow: "La méthode",
      title: "Quatre étapes, aucun raccourci",
      subtitle:
        "Un accompagnement type dure trois à six mois. Voici précisément ce qui se passe, du premier appel à la dernière séance.",
      image: {
        src: "/images/method.jpg",
        alt: "Main écrivant un plan alimentaire sur un carnet, près d'une tasse et d'un bouquet séché",
        width: 1200,
        height: 1800,
        position: "center 40%",
      },
      steps: [
        {
          id: "echange",
          number: "01",
          title: "Premier échange",
          duration: "15 min, par téléphone — offert",
          description:
            "On vérifie ensemble que je suis la bonne personne pour votre situation. Si ce n'est pas le cas, je vous oriente vers un confrère. Aucun engagement à ce stade.",
          icon: "phone",
        },
        {
          id: "bilan",
          number: "02",
          title: "Bilan complet",
          duration: "60 min, au cabinet ou en visio",
          description:
            "Historique, habitudes réelles sur une semaine type, antécédents, analyses si vous en avez, rapport à l'alimentation. C'est la séance la plus longue, et la plus déterminante.",
          icon: "clipboard",
        },
        {
          id: "programme",
          number: "03",
          title: "Programme personnalisé",
          duration: "Remis sous 48 h",
          description:
            "Un document écrit : deux ou trois changements prioritaires, des repères concrets, des recettes, et ce qu'on laisse volontairement de côté pour l'instant.",
          icon: "notebook",
        },
        {
          id: "suivi",
          number: "04",
          title: "Suivi",
          duration: "30 min, toutes les 2 à 4 semaines",
          description:
            "On ajuste. Ce qui a tenu, ce qui n'a pas tenu, et pourquoi. C'est dans cette phase que les habitudes s'installent — et c'est elle qui fait la différence entre un résultat et un résultat durable.",
          icon: "footprints",
        },
      ],
      cta: { label: "Commencer par le premier échange", href: "#contact", variant: "primary" },
    },

    /* ------------------------------------------------------------ RESULTATS */
    results: {
      enabled: true,
      eyebrow: "Résultats",
      title: "Ce que change un accompagnement",
      subtitle:
        "Trois parcours réels, avec l'accord des personnes concernées. Les prénoms ont été modifiés.",
      stats: [
        { value: "+500", label: "patients accompagnés", detail: "depuis l'ouverture en 2014" },
        { value: "87 %", label: "objectif atteint", detail: "sur les suivis menés à terme" },
        { value: "4,9/5", label: "satisfaction", detail: "sur 142 avis vérifiés" },
        { value: "5 mois", label: "durée moyenne", detail: "d'un accompagnement complet" },
      ],
      items: [
        {
          id: "marie",
          name: "Marie D.",
          context: "38 ans, cadre, deux enfants",
          duration: "6 mois",
          before:
            "Repas sautés le midi, grignotage permanent à partir de 17 h, trois régimes abandonnés en cinq ans.",
          after:
            "Trois repas structurés, plus de grignotage compulsif, poids stable depuis la fin du suivi.",
          quote:
            "Pour la première fois, on ne m'a pas donné une liste d'interdits. Camille a construit quelque chose qui tient avec mon travail et mes enfants. J'ai perdu 9 kg sans jamais me sentir privée — et je ne les ai pas repris.",
          metric: { value: "-9 kg", label: "en six mois, sans reprise" },
          rating: 5,
        },
        {
          id: "thomas",
          name: "Thomas R.",
          context: "31 ans, semi-marathonien",
          duration: "4 mois",
          before:
            "Troubles digestifs systématiques en course, fringales le soir, récupération difficile entre deux séances.",
          after:
            "Plus aucun incident digestif en compétition, énergie stable, record personnel amélioré.",
          quote:
            "Mes problèmes digestifs en course ont disparu en six semaines. Le plan d'alimentation avant compétition est clair, testé, et réellement applicable un dimanche matin à 7 h.",
          metric: { value: "-6 min", label: "sur son record au semi" },
          rating: 5,
        },
        {
          id: "sophie",
          name: "Sophie L.",
          context: "34 ans, suivi post-partum",
          duration: "5 mois",
          before:
            "Fatigue persistante, carence en fer, culpabilité à chaque écart alimentaire.",
          after:
            "Bilan sanguin normalisé, énergie retrouvée, rapport apaisé à l'alimentation.",
          quote:
            "Une écoute rare et zéro pression. J'ai surtout appris à comprendre mes besoins plutôt qu'à suivre des règles. C'est la première fois qu'un suivi ne me fait pas culpabiliser.",
          metric: { value: "Ferritine ×3", label: "en cinq mois" },
          rating: 5,
        },
      ],
      disclaimer:
        "Ces témoignages décrivent des parcours individuels. Les résultats en nutrition varient selon l'état de santé, le mode de vie et l'assiduité de chacun : aucun résultat ne peut être garanti.",
      cta: { label: "Prendre rendez-vous", href: "#contact", variant: "primary" },
    },

    /* -------------------------------------------------------------- JOURNAL */
    journal: {
      enabled: true,
      eyebrow: "Journal",
      title: "Recettes et repères",
      subtitle:
        "Des articles courts, écrits au cabinet, à partir des questions qui reviennent le plus souvent.",
      articles: [
        {
          id: "petit-dejeuner",
          title: "Le petit-déjeuner salé, sans complication",
          excerpt:
            "Trois formules tenables en semaine, pour éviter le creux de 11 h sans se lever vingt minutes plus tôt.",
          category: "Recette",
          date: "8 octobre 2026",
          readingTime: "4 min",
          image: {
            src: "/images/journal-1.jpg",
            alt: "Tartine d'avocat et de graines servie sur une assiette, vue de dessus",
            width: 1000,
            height: 645,
          },
          href: "#journal",
        },
        {
          id: "proteines",
          title: "Combien de protéines vous faut-il, vraiment ?",
          excerpt:
            "Ce que disent les recommandations actuelles, et pourquoi le chiffre affiché en salle de sport ne vous concerne probablement pas.",
          category: "Repères",
          date: "17 septembre 2026",
          readingTime: "6 min",
          image: {
            src: "/images/journal-2.jpg",
            alt: "Bol de pois chiches secs sur fond beige, quelques graines alignées devant",
            width: 1000,
            height: 628,
          },
          href: "#journal",
        },
        {
          id: "batch-cooking",
          title: "Batch cooking : deux heures pour cinq dîners",
          excerpt:
            "Une méthode d'organisation du dimanche, avec la liste de courses et l'ordre de cuisson.",
          category: "Organisation",
          date: "26 août 2026",
          readingTime: "5 min",
          image: {
            src: "/images/journal-3.jpg",
            alt: "Bocaux en verre remplis de salades de céréales et de légumes, préparés à l'avance",
            width: 1000,
            height: 750,
          },
          href: "#journal",
        },
      ],
      cta: { label: "Tous les articles", href: "#journal", variant: "outline" },
    },

    /* ----------------------------------------------------------------- FAQ */
    faq: {
      enabled: true,
      eyebrow: "Questions fréquentes",
      title: "Avant de prendre rendez-vous",
      subtitle: "",
      items: [
        {
          id: "ordonnance",
          question: "Faut-il une ordonnance pour consulter ?",
          answer:
            "Non. La consultation d'une diététicienne-nutritionniste est en accès direct, sans prescription médicale préalable.\nSi votre situation le justifie, je travaille en lien avec votre médecin traitant ou votre spécialiste, avec votre accord.",
        },
        {
          id: "remboursement",
          question: "Les consultations sont-elles remboursées ?",
          answer:
            "Elles ne sont pas prises en charge par l'Assurance Maladie. En revanche, de nombreuses mutuelles remboursent tout ou partie des séances, souvent à hauteur de trois à six consultations par an.\nUne facture vous est remise après chaque rendez-vous : il suffit de la transmettre à votre complémentaire.",
        },
        {
          id: "premiere-seance",
          question: "Comment se déroule la première séance ?",
          answer:
            "Elle dure une heure. Nous faisons le point sur vos habitudes réelles, votre santé, votre histoire avec l'alimentation et vos objectifs.\nVous repartez avec deux ou trois changements prioritaires. Le programme écrit vous est envoyé sous 48 heures.",
        },
        {
          id: "distance",
          question: "Proposez-vous des consultations à distance ?",
          answer:
            "Oui, en visioconférence, avec exactement le même déroulé qu'au cabinet. Le lien vous est envoyé après la prise de rendez-vous ; aucun logiciel à installer.",
        },
        {
          id: "duree",
          question: "Combien de séances faut-il prévoir ?",
          answer:
            "La plupart des suivis s'étalent sur trois à six mois, avec un rendez-vous toutes les deux à quatre semaines. Certaines situations se règlent en deux séances, d'autres demandent un accompagnement plus long.\nNous en discutons dès le bilan, et vous restez libre d'arrêter à tout moment.",
        },
        {
          id: "regime",
          question: "Allez-vous me donner un régime à suivre ?",
          answer:
            "Non. Vous ne recevrez ni menu imposé ni liste d'aliments interdits. Nous partons de ce que vous mangez déjà pour l'ajuster progressivement.\nUn plan que vous ne pouvez pas tenir six mois n'a aucun intérêt, et c'est en général la raison pour laquelle les régimes précédents ont échoué.",
        },
        {
          id: "annulation",
          question: "Quelle est la politique d'annulation ?",
          answer:
            "Tout rendez-vous peut être annulé ou déplacé sans frais jusqu'à 24 heures à l'avance. Au-delà, la séance est due, sauf urgence médicale.",
        },
      ],
      aside: {
        title: "Une question qui n'est pas ici ?",
        text: "Écrivez-moi en quelques lignes. Je réponds personnellement, sous 24 heures ouvrées.",
        cta: { label: "Poser ma question", href: "#contact", variant: "primary", icon: "mail" },
      },
    },

    /* ------------------------------------------------------- APPEL A L'ACTION */
    cta: {
      enabled: true,
      title: "Le premier échange ne vous engage à rien.",
      subtitle:
        "Quinze minutes au téléphone pour comprendre votre situation et vous dire honnêtement si je peux vous aider. Si ce n'est pas le cas, je vous oriente vers la bonne personne.",
      actions: [
        { label: "Prendre rendez-vous", href: "#contact", variant: "primary", icon: "calendar-check" },
        { label: "Appeler le cabinet", href: "tel", variant: "outline", icon: "phone" },
      ],
    },

    /* ------------------------------------------------------------- CONTACT */
    contact: {
      enabled: true,
      eyebrow: "Contact",
      title: "Prenons rendez-vous",
      subtitle:
        "Par téléphone, par e-mail ou via le formulaire. Vous recevez une réponse sous 24 heures ouvrées.",
      showForm: true,
      showMap: true,
      showHours: true,
      form: {
        nameLabel: "Nom et prénom",
        emailLabel: "E-mail",
        phoneLabel: "Téléphone",
        subjectLabel: "Motif de la demande",
        subjects: [
          "Premier échange téléphonique",
          "Perte de poids",
          "Rééquilibrage alimentaire",
          "Sport et performance",
          "Troubles digestifs",
          "Nutrition féminine",
          "Autre question",
        ],
        messageLabel: "Votre message",
        submitLabel: "Envoyer ma demande",
        successMessage:
          "Merci, votre message est bien parti. Vous recevez une réponse sous 24 heures ouvrées.",
        errorMessage:
          "L'envoi a échoué. Réessayez dans un instant, ou appelez directement le cabinet.",
        consentText:
          "Les informations transmises servent uniquement à traiter votre demande et ne sont jamais cédées à des tiers.",
      },
    },

    /* ------------------------------------------------------------- HORAIRES
     * Affiches dans la section contact (`contact.showHours`) et dans le
     * JSON-LD. La section autonome reste disponible via `sectionOrder`.
     * ---------------------------------------------------------------------- */
    hours: {
      enabled: true,
      eyebrow: "Horaires",
      title: "Quand me consulter",
      subtitle: "Consultations sur rendez-vous, au cabinet ou en visioconférence.",
      timezone: "Europe/Paris",
      showOpenStatus: true,
      // `ranges: []` signifie fermé. Deux créneaux permettent la pause déjeuner.
      schedule: [
        { day: "monday", ranges: [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "19:00" }] },
        { day: "tuesday", ranges: [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "19:00" }] },
        { day: "wednesday", ranges: [{ open: "09:00", close: "13:00" }] },
        { day: "thursday", ranges: [{ open: "09:00", close: "13:00" }, { open: "14:00", close: "19:00" }] },
        { day: "friday", ranges: [{ open: "09:00", close: "17:00" }] },
        { day: "saturday", ranges: [{ open: "09:00", close: "12:30" }], note: "sur rendez-vous" },
        { day: "sunday", ranges: [] },
      ],
      note: "Cabinet fermé les jours fériés. Annulation sans frais jusqu'à 24 heures avant le rendez-vous.",
    },

    /* -------------------------------------------------- SECTIONS EN RESERVE */
    gallery: {
      enabled: false, // ajouter "gallery" dans `sectionOrder` pour l'activer
      columns: 3,
      eyebrow: "Le cabinet",
      title: "Un lieu calme, en plein centre",
      subtitle: "",
      items: [
        { src: "/images/gallery-1.svg", alt: "Salle de consultation", width: 800, height: 600 },
        { src: "/images/gallery-2.svg", alt: "Espace d'accueil", width: 800, height: 600 },
        { src: "/images/gallery-3.svg", alt: "Atelier cuisine", width: 800, height: 600 },
      ],
    },

    testimonials: {
      enabled: false, // les témoignages détaillés figurent dans la section "results"
      eyebrow: "Témoignages",
      title: "Ils ont retrouvé leur équilibre",
      subtitle: "",
      averageRating: 4.9,
      reviewsUrl: {
        label: "Voir tous les avis Google",
        href: "https://www.google.com/maps/search/?api=1&query=Camille+Roux+nutrition+Bordeaux",
      },
      items: [
        {
          id: "t1",
          name: "Marie D.",
          role: "Accompagnée 6 mois",
          city: "Bordeaux",
          quote:
            "Un accompagnement qui tient compte de ma vie réelle, pas d'un modèle théorique.",
          rating: 5,
          date: "Mars 2026",
        },
      ],
    },
  },

  /* ==========================================================================
   *  10. PAGES LEGALES
   *      Alimentent `/mentions-legales` et `/confidentialite`.
   *      Les textes generes sont des bases a faire valider par le client.
   * ======================================================================== */
  legal: {
    publicationDirector: "Camille Roux",
    host: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
      url: "https://vercel.com",
    },
    updatedAt: "Octobre 2026",
    extraSections: [
      {
        title: "Taxe sur la valeur ajoutée",
        paragraphs: [
          "Les soins dispensés aux personnes par les diététiciens titulaires du diplôme d'État sont exonérés de TVA, en application de l'article 261-4-1° du Code général des impôts.",
          "TVA non applicable. Les factures remises après chaque consultation ne font donc apparaître aucune taxe.",
        ],
      },
      {
        title: "Médiation de la consommation",
        paragraphs: [
          "Conformément à l'article L.612-1 du Code de la consommation, tout client a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige.",
          "Les coordonnées du médiateur retenu par le cabinet sont communiquées sur simple demande.",
        ],
      },
    ],
  },

  /* ==========================================================================
   *  11. LIBELLES D'INTERFACE  (optionnel)
   *      Les textes du template (boutons d'accessibilite, intitules du pied
   *      de page, etat d'ouverture...) sont en francais par defaut.
   *      Renseigner une cle ici pour l'adapter ou traduire le site.
   *      Liste complete : `LabelsConfig` dans types/site.ts.
   * ======================================================================== */
  labels: {
    // Exemples de surcharge :
    // directions: "Voir le plan",
    // openNow: "Ouvert jusqu'à {time}",
  },

  /* ==========================================================================
   *  12. PIED DE PAGE
   * ======================================================================== */
  footer: {
    about:
      "Cabinet de nutrition à Bordeaux. Accompagnement personnalisé, au cabinet ou en visioconférence, sans régime restrictif.",
    showContact: true,
    showHours: false, // les horaires figurent dans la section contact
    columns: [
      {
        title: "Accompagnements",
        links: [
          { label: "Perte de poids", href: "#services" },
          { label: "Rééquilibrage alimentaire", href: "#services" },
          { label: "Sport et performance", href: "#services" },
          { label: "Troubles digestifs", href: "#services" },
        ],
      },
      {
        title: "Le cabinet",
        links: [
          { label: "À propos", href: "#about" },
          { label: "La méthode", href: "#method" },
          { label: "Résultats", href: "#results" },
          { label: "Journal", href: "#journal" },
        ],
      },
    ],
    legalLinks: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
    ],
    // Remplacer par le nom et le site de votre agence.
    credits: { label: "Conception : Studio Vertel", href: "https://studiovertel.fr" },
  },
};

export default siteConfig;
