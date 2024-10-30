"use strict";

const divSidebar = document.querySelector(".div-sidebar-content");
const divCategoryContent = document.querySelector(".div-content-category");
const divCarouselOverlay = document.querySelector(".div-carousel-overlay");
const contentDiv = document.querySelector(".overlay-content");

const carouselOverlayDiv = document.querySelector(".div-carousel-overlay");
const carouselBlur = document.querySelector(".carousel-overlay-blur");
const carouselOverlay = document.querySelector(".overlay-content");

const loadList = async function () {
  const data = (
    await axios({
      method: "GET",
      url: "/api/v1/category/",
    })
  ).data.data;

  divSidebar.innerHTML = "";

  data.forEach((d, i) => {
    let subMarkup = "";
    d.subCategories.forEach((sc, i) => {
      subMarkup += `<p class="sub-category" data-category="${d._id}">${sc}</p>`;
    });

    const mainMarkup = `
    <div class="div-category">
    <!-- Main Category-->
    <div class="div-main-category">
        <p class="main-category">${i + 1}. ${d._id}</p>
        <ion-icon class="btn-sub-cat-slide" name="chevron-down-outline"></ion-icon>
    </div><!-- Sub Categories-->
    <div class="div-sub-categories hide-cate">
        <div class="sub-categories-wrapper">
          ${subMarkup}
        </div>
    </div>
  </div>
    `;
    divSidebar.insertAdjacentHTML("beforeend", mainMarkup);
  });

  buttonControl();
};

const displayCategory = function (data, time) {
  let imgMarkup = "";

  data.forEach((d, i) => {
    imgMarkup += `<div class="div-image-category"><img class="image-category" src="${d.imagePath}" alt="category image" /></div>`;
  });

  console.log(imgMarkup);
  const mainMarkup = `
  <div class="div-display-category-title">
    <p class="display-category-title animate-card-left">${data[0].imgCategory} &gt; ${data[0].imgType}</p>
  </div>
  <div class="div-category-content">
    <div class="category-content-wrapper">
        <div class="category-gallery">
            ${imgMarkup}
        </div>
    </div>
  </div>
  `;

  divCategoryContent.innerHTML = "";
  divCategoryContent.insertAdjacentHTML("afterbegin", mainMarkup);

  setTimeout(
    () =>
      swipeObserver.observe(document.querySelector(".display-category-title")),
    time
  );

  const imgCategory = document.querySelectorAll(".image-category");
  const imgArray = data.map((d, i) => d.imagePath);
  imgCategory.forEach((img, i) => {
    img.addEventListener("click", function () {
      console.log(imgArray[i]);
      displayOverlayImage(
        divCarouselOverlay,
        contentDiv,
        img.src,
        imgArray,
        "categoryImages"
      );
    });
  });
};

// manage overlay content

const btnClose = document.querySelector(".btn-close-carousel");
const btnScrollLeft = document.querySelector(".scroll-left");
const btnScrollRight = document.querySelector(".scroll-right");

[carouselBlur, btnClose].forEach((btn) =>
  btn.addEventListener("click", function () {
    carouselOverlayDiv.style.display = "none";
  })
);

btnScrollLeft.addEventListener("click", function () {
  contentDiv.scrollBy({ left: -200, behavior: "smooth" });
});

btnScrollRight.addEventListener("click", function () {
  contentDiv.scrollBy({ left: 200, behavior: "smooth" });
});

const buttonControl = function () {
  // 1. Selecting buttons
  const subCatBtn = document.querySelectorAll(".btn-sub-cat-slide");
  const categoryBtn = document.querySelectorAll(".sub-category");

  // 2. Adding eventListener to the arrow btns and making it work
  subCatBtn.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const subDiv = btn.parentElement.parentElement.querySelector(
        ".div-sub-categories"
      );
      const contentDiv = subDiv.querySelector(".sub-categories-wrapper");
      subDiv.classList.toggle("hide-cate");
      if (subDiv.classList.contains("hide-cate")) {
        contentDiv.style.transform = "translateY(-110%)";

        this.style.transform = `rotate(0deg)`;
      } else {
        contentDiv.style.transform = "translateY(0)";
        this.style.transform = `rotate(180deg)`;
      }
    });
  });

  // 3. Btn category
  categoryBtn.forEach((cBtn, i) => {
    cBtn.addEventListener("click", async function (e) {
      const data = (
        await axios({
          method: "GET",
          url: `/api/v1/category/${cBtn.textContent}`,
        })
      ).data.data;
      displayCategory(data, 0);
      cBtn.style.backgroundColor = "#77665a";
      categoryBtn.forEach((btn, i) => {
        if (btn !== cBtn) {
          btn.style.backgroundColor = "";
        }
      });
    });
  });
};

(async function () {})();

window.addEventListener("load", async function () {
  loadList();
  // const data = (
  //   await axios({
  //     method: "GET",
  //     url: "/api/v1/category/Kitchen",
  //   })
  // ).data.data;
  // displayCategory(data, 2000);
});

/* -------------------------------------------------------------------------- */
/*                                Media Queries                               */
/* -------------------------------------------------------------------------- */
const btnCollapse = document.querySelector(".btn-collapse");
const divSidebarContent = document.querySelector(".div-sidebar-content");
let flag = false;

btnCollapse.addEventListener("click", function (e) {
  flag = !flag;
  if (flag) {
    divSidebarContent.style.display = "block";
    divSidebarContent.style.transform = "translateY(0)";
    this.style.transform = `rotate(180deg)`;
  } else {
    divSidebarContent.style.display = "none";
    divSidebarContent.style.transform = "translateY(-100%)";
    this.style.transform = `rotate(0deg)`;
  }
});
