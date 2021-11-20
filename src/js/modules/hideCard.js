export default function hideCard(e) {
  e.stopPropagation();
  const cards = document.querySelectorAll('.card');
  const itemID = e.target.dataset.stationid;
  let cardID;
  cards.forEach(card => {
    if (itemID !== card.getAttribute('data-id')) {
      card.className = 'card shadow pt-3 pb-4 px-4 visually-hidden';

      console.log('hide card');
    };

  })

}