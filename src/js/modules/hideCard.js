export default function hideCard(e) {
  e.stopPropagation();
  const cards = document.querySelectorAll('.card');
  const itemID = e.target.dataset.item;
  let i= 0;

  cards.forEach(card => {
    if (itemID !== `card-item-${i}` && itemID !== `card-item` && itemID !== 'card-item-search') {
      card.className = 'card shadow pt-3 pb-4 px-4 visually-hidden';

      console.log('hide card');
    };
    i++;
  })

}