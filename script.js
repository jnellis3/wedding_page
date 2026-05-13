(function () {
  const tabs = Array.from(document.querySelectorAll(".tab-button"));
  const sections = Array.from(document.querySelectorAll(".content-section"));
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector("#guest-search");
  const resultsList = document.querySelector("#results-list");
  const resultsStatus = document.querySelector("#results-status");
  const guests = Array.isArray(window.WEDDING_GUESTS) ? window.WEDDING_GUESTS : [];

  function normalize(value) {
    return value.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
  }

  function setActiveSection(targetId) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === targetId;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    sections.forEach((section) => {
      const isActive = section.id === targetId;
      section.classList.toggle("is-active", isActive);
      section.hidden = !isActive;
    });

    if (targetId === "seating") {
      window.setTimeout(() => searchInput.focus(), 80);
    }
  }

  function renderResults(matches, query) {
    resultsList.replaceChildren();

    if (!query) {
      resultsStatus.textContent = "Start typing to look up your table.";
      return;
    }

    if (matches.length === 0) {
      resultsStatus.textContent = "No match yet. Try first and last name, or ask a coordinator.";
      return;
    }

    resultsStatus.textContent = matches.length === 1 ? "1 guest found." : `${matches.length} guests found.`;

    const fragment = document.createDocumentFragment();
    matches.forEach((guest) => {
      const card = document.createElement("article");
      card.className = "result-card";

      const copy = document.createElement("div");
      const name = document.createElement("h3");
      const party = document.createElement("p");
      name.textContent = guest.name;
      party.textContent = guest.party ? `${guest.party} party` : "Wedding guest";
      copy.append(name, party);

      const badge = document.createElement("div");
      badge.className = "table-badge";
      const badgeLabel = document.createElement("span");
      badgeLabel.textContent = "Table";
      const badgeValue = document.createTextNode(guest.table);
      badge.append(badgeLabel, badgeValue);

      card.append(copy, badge);
      fragment.append(card);
    });

    resultsList.append(fragment);
  }

  function findGuests(query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) {
      return [];
    }

    const queryParts = normalizedQuery.split(" ");
    return guests
      .filter((guest) => {
        const normalizedName = normalize(guest.name);
        return queryParts.every((part) => normalizedName.includes(part));
      })
      .slice(0, 8);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveSection(tab.dataset.target));
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    renderResults(findGuests(query), normalize(query));
  });

  renderResults([], "");
})();
