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
        <div class="form__group">
          <label class="form__label" for="projectName">Project Name</label>
          <input class="form__input" id="projectName" type="text" required name="projectName" />
        </div>
        
        <div class="form__group ma-bt-md">
          <label class="form__label" for="clientName">Client Name</label>
          <input class="form__input" id="clientName" type="text" required name="clientName" />
        </div>
        
        <div class="form__group ma-bt-md">
          <label class="form__label" for="projectDescription">Project Description</label>
          <input class="form__input" id="projectDescription" type="text" required name="projectDescription" />
        </div>
        
        <div class="form__group ma-bt-md">
          <label class="form__label" for="location">Location</label>
          <input class="form__input" id="location" type="text" required name="location" />
        </div>
        
        <div class="form__group ma-bt-md">
          <label class="form__label" for="duration">Duration</label>
          <input class="form__input" id="duration" type="text" required name="duration" />
        </div>
        
        <div class="form__group ma-bt-md">
          <label class="form__label" for="service">Type of Service</label>
          <input class="form__input" id="service" type="text" required name="service" />
        </div>
        
        <div class="form__group form__photo-upload">
          <img class="form__user-photo" src="" alt="Cover image preview" />
          <input class="form__upload" type="file" id="coverImage" name="imageCover" />
          <label for="coverImage">Choose Cover Image</label>
        </div>
        
        <div class="form__group form__photo-upload">
          <img class="form__user-photo" src="" alt="Photos preview" />
          <input class="form__upload" type="file" id="photos" name="photos" multiple />
          <label for="photos">Choose Photos</label>
        </div>
        
        <div class="form__group right">
          <button class="btn btn-upload btn--small btn--green">Upload</button>
        </div>
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
      console.log(this);
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
