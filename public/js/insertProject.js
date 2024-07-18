"use strict";

const form = document.querySelector(".admin-login");
const contentDiv = document.querySelector(".content-div-admin");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  try {
    const admin = (
      await axios({
        method: "GET",
        url: "/auth",
      })
    ).data.data[0];
    const formData = new FormData(form);

    // if (!
    //   (formData.get("username") === admin.adminName &&
    //   formData.get("password") === admin.adminPassword)
    // ) {
    //   throw new Error("Incorrect username or password")
    // }

    console.log("Authenticated");

    const markup = `
    <form class="form form-project-data">
      <div class="form__group"><label class="form__label" for="">Project Name</label><input class="form__input" id="name" type="text" value="" required="required" name="projectName" /></div>
      <div class="form__group ma-bt-md"><label class="form__label" for="">client Name</label><input class="form__input" id="email" type="text" value="" required="required" name="clientName" /></div>
      <div class="form__group ma-bt-md"><label class="form__label" for="">Project description</label><input class="form__input" id="email" type="text" value="" required="required" name="projectDescription" /></div>
      <div class="form__group ma-bt-md"><label class="form__label" for="">Location</label><input class="form__input" id="text" type="text" value="" required="required" name="location" /></div>
      <div class="form__group ma-bt-md"><label class="form__label" for="">Duration</label><input class="form__input" id="text" type="text" value="" required="required" name="duration" /></div>
      <div class="form__group ma-bt-md"><label class="form__label" for="">Type of service</label><input class="form__input" id="text" type="text" value="" required="required" name="service" /></div>
      <div class="form__group form__photo-upload"><img class="form__user-photo" src="" alt="User photo" /><input class="form__upload" type="file" id="photo" name="imageCover" /><label for="photo">Choose Cover image </label></div>
      <div class="form__group form__photo-upload"><img class="form__user-photo" src="" alt="User photo" /><input class="form__upload" type="file" id="photo" name="photos" multiple /><label for="photo">Choose photos </label></div>
      <div class="form__group right"><button class="btn btn-upload btn--small btn--green">Upload</button></div>
    </form>
    `;

    contentDiv.innerHTML = "";
    contentDiv.insertAdjacentHTML("afterbegin", markup);

    const uploadDataForm = document.querySelector(".form-project-data");
    const btnUpload = document.querySelector(".btn-upload");
    uploadDataForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      btnUpload.textContent = "Uploading...";
      const projectDataForm = new FormData(this);
      const res = await axios({
        method: "POST",
        url: "/api/v1/project",
        data: projectDataForm,
      });
    });
    btnUpload.textContent = "Upload";
  } catch (error) {
    console.log(error);
    btnUpload.textContent = error.message || "Error";
  }
});
