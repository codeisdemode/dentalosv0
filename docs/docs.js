const docLinks = document.querySelectorAll("[data-doc-link]");

if (docLinks.length > 0 && "IntersectionObserver" in window) {
  const sectionsById = new Map();

  docLinks.forEach((link) => {
    const href = link.getAttribute("href") ?? "";
    const id = href.startsWith("#") ? href.slice(1) : "";

    if (!id) {
      return;
    }

    const section = document.getElementById(id);

    if (section) {
      sectionsById.set(id, section);
    }
  });

  const updateActive = (id) => {
    docLinks.forEach((link) => {
      const href = link.getAttribute("href") ?? "";
      const isActive = href === `#${id}`;
      link.classList.toggle("is-active", isActive);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      let closest = null;

      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        if (!closest || entry.intersectionRatio > closest.intersectionRatio) {
          closest = entry;
        }
      });

      if (closest && closest.target.id) {
        updateActive(closest.target.id);
      }
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sectionsById.forEach((section) => {
    observer.observe(section);
  });

  const initialId = window.location.hash.slice(1);

  if (initialId && sectionsById.has(initialId)) {
    updateActive(initialId);
  } else {
    const firstLink = docLinks[0];
    const firstHref = firstLink?.getAttribute("href") ?? "";

    if (firstHref.startsWith("#")) {
      updateActive(firstHref.slice(1));
    }
  }
}
