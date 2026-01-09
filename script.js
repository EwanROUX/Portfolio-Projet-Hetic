document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("skill-search");
  const skillsSection = document.getElementById("skills");
  const skillCards = document.querySelectorAll(".skill-card p");

  // Stocker le contenu original pour pouvoir réinitialiser le surlignage
  const originalContents = Array.from(skillCards).map((p) => p.innerHTML);

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const searchTerm = searchInput.value.trim().toLowerCase();

      // 1. Réinitialiser le texte (enlever les anciens surlignages)
      skillCards.forEach((p, index) => {
        p.innerHTML = originalContents[index];
      });

      if (searchTerm === "") return;

      let found = false;

      // 2. Chercher le mot dans les paragraphes de compétences
      skillCards.forEach((p) => {
        const text = p.textContent;
        const lowerText = text.toLowerCase();

        if (lowerText.includes(searchTerm)) {
          // Créer l'effet de surlignage avec un RegExp
          const regex = new RegExp(`(${searchTerm})`, "gi");
          p.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
          
          found = true;
          
          // 3. Faire défiler jusqu'à la carte trouvée
          p.closest(".skill-card").scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });

      // 4. Si rien n'est trouvé, on peut vider "l'input"
      if (!found) {
        console.log("Aucune compétence correspondante.");
      }
    }
  });
});
