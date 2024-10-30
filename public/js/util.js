function displayOverlayImage(
  overlayDiv,
  overlay,
  imgSrc,
  photos,
  overlayClass
) {
  console.log(imgSrc);
  overlay.innerHTML = "";
  photos.forEach((photo) => {
    const markup = ` <img class="imgC" id=
      "${photo}" src="${photo}" alt="">`;
    overlay.insertAdjacentHTML("beforeend", markup);
  });
  overlayDiv.style.display = "flex";
  const target = document.getElementById(imgSrc);
  console.log(target);
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => {
    target.style.opacity = 0.5;
    setTimeout(() => {
      target.style.opacity = 1;
    }, 500);
  }, 700);
}
