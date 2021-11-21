export default function showCard(e) {
  const cardId = e.target.dataset.stationid;
  const card = document.querySelector(`[data-id="${cardId}"]`);
  card.className = 'card shadow pt-3 pb-4 px-4';
};


//# sourceMappingURL=showCard.js.map
