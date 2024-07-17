"use strict";
const carouselOverlayDiv = document.querySelector(".div-carousel");
const carouselOverlay = document.querySelector(".overlay-content");
const projectTitle = document.querySelector(".p-header-title");
const projectDesc = document.querySelector(".p-header-para");
const clientName = document.querySelector(".p-client-name");
const clientLocation = document.querySelector(".p-location");
const duration = document.querySelector(".p-duration");
const service = document.querySelector(".p-service");
const projectImageCover = document.querySelector(".p-main-img");
const divProjectGallery = document.querySelector(".div-project-gallery");
const aboutProject = document.querySelector(".p-about-para");

const projectName = location.pathname.split("/")[1];

const getProject = async (e) => {
  const res = await axios({
    method: "GET",
    url: `/api/v1/project/${projectName}`,
  });

  const data = res.data.data[0];

  console.log(data);

  if (!data) {
    window.location.href = "../error";
  }

  projectTitle.textContent = data.projectName;
  projectDesc.textContent = data.projectDescription;
  clientName.textContent = data.clientName;
  clientLocation.textContent = data.location;
  duration.textContent = data.duration;
  service.textContent = data.service;
  projectImageCover.src = `${data.imageCover}`;
  aboutProject.textContent = data.projectDescription;

  divProjectGallery.innerHTML = "";
  data.photos.forEach((img, i) => {
    const markup = `
    <div class="div-project-img"> 
        <img class="project-img" src="${img}" data-count=${i + 1} alt=""/>
    </div>
    `;
    divProjectGallery.insertAdjacentHTML("beforeend", markup);
  });

  const images = document.querySelectorAll(".div-project-img");

  images.forEach((img, i) => {
    img.addEventListener("click", function () {
      const imgSrc = img.children[0].src.split("/");
      console.log(imgSrc[imgSrc.length - 1]);
      accessCarousel(
        carouselOverlayDiv,
        carouselOverlay,
        imgSrc[imgSrc.length - 1],
        data.photos,
        "projectImages"
      );
    });
  });
};

window.addEventListener("load", getProject);
