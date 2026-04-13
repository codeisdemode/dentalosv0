const topbar = document.querySelector("[data-topbar]");
const visualPanel = document.querySelector(".visual-panel");
const appearItems = document.querySelectorAll("[data-appear]");
const heroAppearItems = document.querySelectorAll('[data-appear="hero"]');
const featureItems = document.querySelectorAll("[data-feature-key]");
const featureCardTitle = document.querySelector("[data-feature-card-title]");
const featureCardBody = document.querySelector("[data-feature-card-body]");
const featureChatName = document.querySelector("[data-feature-chat-name]");
const featureChatStatus = document.querySelector("[data-feature-chat-status]");
const featureChatMessages = document.querySelectorAll("[data-feature-chat-message]");
const practiceItems = document.querySelectorAll("[data-practice-key]");
const practicePanelTitle = document.querySelector("[data-practice-panel-title]");
const practicePoints = document.querySelectorAll("[data-practice-point-index]");
const setupTabs = document.querySelectorAll("[data-setup-key]");
const setupPreview = document.querySelector("[data-setup-preview]");
const prototypeSlider = document.querySelector("[data-prototype-slider]");
const prototypeTrack = document.querySelector("[data-prototype-track]");
const prototypePrev = document.querySelector("[data-prototype-prev]");
const prototypeNext = document.querySelector("[data-prototype-next]");
const prototypeDots = document.querySelectorAll("[data-prototype-dot]");

document.documentElement.classList.add("motion-ready");

const revealElement = (element, delay = 0) => {
  if (!element || element.classList.contains("is-visible")) {
    return;
  }

  if (delay > 0) {
    element.style.transitionDelay = `${delay}ms`;
  }

  window.setTimeout(() => {
    element.classList.add("is-visible");
  }, 24);
};

if (heroAppearItems.length > 0) {
  const orderedHeroItems = [...heroAppearItems].sort((a, b) => {
    return Number(a.dataset.appearOrder ?? 0) - Number(b.dataset.appearOrder ?? 0);
  });

  window.addEventListener(
    "load",
    () => {
      orderedHeroItems.forEach((item, index) => {
        revealElement(item, index * 90);
      });
    },
    { once: true }
  );
}

const scrollAppearItems = [...appearItems].filter((item) => item.dataset.appear !== "hero");

if (scrollAppearItems.length > 0 && "IntersectionObserver" in window) {
  const appearObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        revealElement(entry.target);
        appearObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  scrollAppearItems.forEach((item) => {
    appearObserver.observe(item);
  });
} else {
  scrollAppearItems.forEach((item) => {
    revealElement(item);
  });
}

const featureStates = {
  reachability: {
    title: "24/7 Bereikbaarheid",
    body:
      "DentalOS neemt inkomende telefoontjes aan, plant afspraken in, verzet consulten, verwerkt terugbelverzoeken en escaleert alleen wanneer een medewerker echt nodig is.",
    chat: {
      name: "DentalOS Assistent",
      status: "Online en automatisch actief",
      messages: [
        { role: "incoming", text: "Hoi, kan ik mijn controle van morgen verzetten?" },
        {
          role: "outgoing",
          text: "Natuurlijk. Ik zie donderdag om 14:20 of vrijdag om 09:10. Wat past beter?",
        },
        { role: "incoming", text: "Donderdag 14:20 is goed." },
        {
          role: "outgoing",
          text: "Gelukt. Ik heb de afspraak verplaatst.",
        },
      ],
    },
  },
  whatsapp: {
    title: "WhatsApp Herinneringen",
    body:
      "Verstuur bevestigingen, herinneringen en follow-ups automatisch via WhatsApp, zodat patienten sneller reageren en minder afspraken tussen wal en schip vallen.",
    chat: {
      name: "WhatsApp Herinneringen",
      status: "Bevestigingen en reminders actief",
      messages: [
        {
          role: "outgoing",
          text: "Goedemiddag, even een herinnering: uw afspraak is morgen om 09:30 bij DentalOS Tandzorg.",
        },
        { role: "incoming", text: "Dankjewel, ik ben erbij." },
        {
          role: "outgoing",
          text: "Perfect. Als er toch iets wijzigt, kunt u hier direct reageren.",
        },
      ],
    },
  },
  recall: {
    title: "Recall Management",
    body:
      "Plan periodieke recalls en follow-ups automatisch in, verstuur uitnodigingen op het juiste moment en houd patienten actief in behandeling zonder handmatige opvolging.",
    chat: {
      name: "Recall Flow",
      status: "Periodieke opvolging actief",
      messages: [
        {
          role: "outgoing",
          text: "Goedemiddag, het is tijd om uw halfjaarlijkse controle opnieuw in te plannen. Schikt volgende week dinsdag 11:40 of donderdag 15:10?",
        },
        { role: "incoming", text: "Dinsdag 11:40 graag." },
        {
          role: "outgoing",
          text: "Afspraak staat vast. De bevestiging en herinnering zijn meteen ingepland.",
        },
      ],
    },
  },
  no_show: {
    title: "No-show Opvolging",
    body:
      "Na een gemiste afspraak stuurt DentalOS direct een herboeklink, volgt reacties automatisch op en helpt het vrijgevallen tijd weer op te vullen.",
    chat: {
      name: "No-show Opvolging",
      status: "Herboekflow automatisch gestart",
      messages: [
        {
          role: "outgoing",
          text: "We hebben u vandaag gemist. Schikt vrijdag om 08:50 als nieuw moment?",
        },
        { role: "incoming", text: "Ja, vrijdag 08:50 is goed." },
        {
          role: "outgoing",
          text: "In orde. Uw afspraak is direct opnieuw ingepland.",
        },
      ],
    },
  },
  callback: {
    title: "Callback Agent",
    body:
      "Wanneer terugbellen nodig is, registreert DentalOS het verzoek, zet de juiste context klaar en laat alleen de relevante callbacks bij je team landen.",
    chat: {
      name: "Callback Assistent",
      status: "Terugbelverzoeken verzameld",
      messages: [
        {
          role: "incoming",
          text: "Kunt u mij vandaag terugbellen over mijn behandelvoorstel?",
        },
        {
          role: "outgoing",
          text: "Natuurlijk. Wat is een goed moment vandaag?",
        },
        { role: "incoming", text: "Na 16:00 graag." },
        {
          role: "outgoing",
          text: "In orde. Ik zet het terugbelverzoek direct door.",
        },
      ],
    },
  },
  escalations: {
    title: "Slimme Escalaties",
    body:
      "Spoed, uitzonderingen en complexe vragen worden automatisch herkend en direct doorgestuurd naar een medewerker, terwijl standaardverkeer autonoom blijft lopen.",
    chat: {
      name: "Escalatie Detectie",
      status: "Uitzonderingen worden gefilterd",
      messages: [
        { role: "incoming", text: "Mijn kroon is losgeraakt en ik heb pijn bij het kauwen." },
        {
          role: "outgoing",
          text: "Dank voor uw bericht. Dit lijkt spoed, ik zet het direct door naar de praktijk.",
        },
        { role: "incoming", text: "Prima, ik ben bereikbaar op dit nummer." },
        {
          role: "outgoing",
          text: "De melding is met prioriteit doorgestuurd. U wordt zo snel mogelijk gebeld.",
        },
      ],
    },
  },
  bookings: {
    title: "Online Boekingen",
    body:
      "Nieuwe boekingen worden automatisch verwerkt met de juiste behandelduur, timing en intakeflow, zodat afspraken direct goed in de agenda terechtkomen.",
    chat: {
      name: "Boekingsflow",
      status: "Nieuwe aanvragen worden verwerkt",
      messages: [
        {
          role: "incoming",
          text: "Hoi, ik ben een nieuwe patiënt en wil graag een afspraak inplannen.",
        },
        {
          role: "outgoing",
          text: "Dat kan. Ik heb maandag 10:30 of woensdag 13:50 beschikbaar voor een eerste consult.",
        },
        { role: "incoming", text: "Woensdag 13:50 graag." },
        {
          role: "outgoing",
          text: "Ingepland. Ik stuur direct de intakevragen en afspraakbevestiging mee.",
        },
      ],
    },
  },
};

const practiceStates = {
  pre_visit: {
    title: "Voor het bezoek",
    points: [
      "Afspraken worden direct bevestigd zonder tussenkomst van de balie.",
      "Intake en medische vragen worden automatisch verstuurd en ingevuld.",
      "Herinneringen en updates worden automatisch verzonden naar de patient.",
    ],
  },
  during_day: {
    title: "Tijdens de dag",
    points: [
      "Telefoon, WhatsApp en online boekingen worden automatisch afgehandeld terwijl de agenda doorloopt.",
      "Annuleringen en no-shows leiden direct tot herplanning of een bericht naar de wachtlijst.",
      "Uitzonderingen worden met context doorgestuurd, zodat het team alleen hoeft in te grijpen waar nodig.",
    ],
  },
  after_visit: {
    title: "Na het bezoek",
    points: [
      "Gespreksnotities en actiepunten worden direct aan het dossier toegevoegd.",
      "Recalls, follow-ups en terugbelverzoeken worden automatisch ingepland en verstuurd.",
      "Openstaande facturen of declaraties worden opgevolgd zonder extra administratief werk.",
    ],
  },
  planning: {
    title: "Planning & agenda",
    points: [
      "Open plekken worden automatisch gevuld op basis van beschikbaarheid, wachttijd en behandeltype.",
      "Wachtlijstpatienten worden direct benaderd zodra een annulering ruimte vrijmaakt.",
      "Behandelduur, timing en agendaregels worden automatisch toegepast voordat een afspraak wordt vastgezet.",
    ],
  },
  communication: {
    title: "Communicatie",
    points: [
      "WhatsApp-bevestigingen, herinneringen en follow-ups lopen automatisch zonder baliehandeling.",
      "De telefonische assistent neemt oproepen aan, verwerkt callbacks en plant waar mogelijk direct in.",
      "No-show opvolging en escalaties verlopen automatisch, inclusief herboeklink of overdracht naar een medewerker.",
    ],
  },
  claims: {
    title: "Declaraties",
    points: [
      "Declaratiebatches worden automatisch voorbereid en ingediend op de juiste momenten.",
      "Uitzonderingen en afwijzingen worden gesignaleerd voordat ze onnodig tijd van het team vragen.",
      "Koppelingen met VECOZO, Infomedics, Twinfield en Exact Online houden administratie en facturatie synchroon.",
    ],
  },
  documentation: {
    title: "Dossier & documentatie",
    points: [
      "Gesprekken met patienten worden automatisch vastgelegd en samengevat in het juiste dossier.",
      "Klinische notities en herkende acties worden realtime omgezet naar bruikbare documentatie.",
      "Verwijsbrieven en samenvattingen van inkomende oproepen worden zonder overtikken toegevoegd.",
    ],
  },
};

if (topbar && visualPanel) {
  let ticking = false;

  const syncTopbarState = () => {
    const visualTop = visualPanel.getBoundingClientRect().top;
    const navBottom = topbar.getBoundingClientRect().bottom;
    const shouldFloat = window.scrollY > 24 && visualTop <= navBottom + 84;

    topbar.classList.toggle("topbar--floating", shouldFloat);
    ticking = false;
  };

  const requestSync = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(syncTopbarState);
  };

  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
  window.addEventListener("load", requestSync);

  requestSync();
}

if (featureItems.length > 0 && featureCardTitle && featureCardBody) {
  const syncFeatureState = (key) => {
    const nextState = featureStates[key];

    if (!nextState) {
      return;
    }

    featureItems.forEach((item) => {
      const isActive = item.dataset.featureKey === key;
      item.classList.toggle("feature-nav__item--active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    featureCardTitle.textContent = nextState.title;
    featureCardBody.textContent = nextState.body;

    if (nextState.chat && featureChatName && featureChatStatus && featureChatMessages.length > 0) {
      featureChatName.textContent = nextState.chat.name;
      featureChatStatus.textContent = nextState.chat.status;

      featureChatMessages.forEach((message, index) => {
        const nextMessage = nextState.chat.messages[index];

        if (!nextMessage || !nextMessage.text) {
          message.textContent = "";
          message.hidden = true;
          return;
        }

        message.hidden = false;
        message.textContent = nextMessage.text;
        message.classList.toggle("feature-chat-message--incoming", nextMessage.role === "incoming");
        message.classList.toggle("feature-chat-message--outgoing", nextMessage.role === "outgoing");
      });
    }
  };

  featureItems.forEach((item) => {
    item.addEventListener("click", () => {
      syncFeatureState(item.dataset.featureKey);
    });
  });
}

if (practiceItems.length > 0 && practicePanelTitle && practicePoints.length > 0) {
  const syncPracticeState = (key) => {
    const nextState = practiceStates[key];

    if (!nextState) {
      return;
    }

    practiceItems.forEach((item) => {
      const isActive = item.dataset.practiceKey === key;
      item.classList.toggle("practice-tabs__item--active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    practicePanelTitle.textContent = nextState.title;

    practicePoints.forEach((point, index) => {
      point.textContent = nextState.points[index] ?? "";
    });
  };

  practiceItems.forEach((item) => {
    item.addEventListener("click", () => {
      syncPracticeState(item.dataset.practiceKey);
    });
  });
}

if (setupTabs.length > 0 && setupPreview) {
  const syncSetupState = (key) => {
    const nextTab = [...setupTabs].find((item) => item.dataset.setupKey === key);

    if (!nextTab) {
      return;
    }

    setupTabs.forEach((item) => {
      const isActive = item.dataset.setupKey === key;
      item.classList.toggle("setup-tab--active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    setupPreview.dataset.setupStage = key;
  };

  setupTabs.forEach((item) => {
    item.addEventListener("click", () => {
      syncSetupState(item.dataset.setupKey);
    });
  });
}

if (prototypeSlider && prototypeTrack && prototypeDots.length > 0) {
  const totalSlides = prototypeDots.length;
  let currentSlide = 0;

  const syncPrototypeSlider = (nextIndex) => {
    const boundedIndex = Math.max(0, Math.min(totalSlides - 1, nextIndex));
    currentSlide = boundedIndex;

    prototypeTrack.style.setProperty("--prototype-index", String(currentSlide));

    prototypeDots.forEach((dot) => {
      const isActive = Number(dot.dataset.prototypeDot) === currentSlide;
      dot.classList.toggle("is-active", isActive);
    });

    if (prototypePrev) {
      prototypePrev.disabled = currentSlide === 0;
    }

    if (prototypeNext) {
      prototypeNext.disabled = currentSlide === totalSlides - 1;
    }
  };

  if (prototypePrev) {
    prototypePrev.addEventListener("click", () => {
      syncPrototypeSlider(currentSlide - 1);
    });
  }

  if (prototypeNext) {
    prototypeNext.addEventListener("click", () => {
      syncPrototypeSlider(currentSlide + 1);
    });
  }

  prototypeDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      syncPrototypeSlider(Number(dot.dataset.prototypeDot));
    });
  });

  syncPrototypeSlider(0);
}

// ============================================
// ACCORDION FUNCTIONALITY
// ============================================
const accordionItems = document.querySelectorAll(".accordion-item");

if (accordionItems.length > 0) {
  accordionItems.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    
    if (trigger) {
      trigger.addEventListener("click", () => {
        const isExpanded = item.dataset.expanded === "true";
        
        // Close all other items
        accordionItems.forEach((otherItem) => {
          otherItem.dataset.expanded = "false";
        });
        
        // Toggle current item
        item.dataset.expanded = isExpanded ? "false" : "true";
      });
    }
  });
}
