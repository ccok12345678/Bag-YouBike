export default function hideCard(e) {
  e.stopPropagation();
  const cards = document.querySelectorAll('.card');
  let i= 0;

  cards.forEach(card => {
    if (e.target.dataset.item !== `card-item-${i}` && e.target.dataset.item !== `card-item`) {
      card.className = 'card shadow pt-3 pb-4 px-4 visually-hidden';
    };
    i++;
  })

}