export default function toggleCover(e) {
  e.preventDefault();
  const cover = document.querySelector('.cover');

  if (e.target.alt === 'a kangaroo logo') {
    cover.className = 'class cover d-flex';
  } else {
    cover.className = 'class cover d-flex visually-hidden';
  }
}