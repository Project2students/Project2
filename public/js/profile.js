const saveButton = document.querySelector(".save");
const uploadBtn = document.querySelector(".form-control-file");
uploadBtn.innerHTML = "Upload";
const imageName = document.querySelector(".profileImg").getAttribute("src");
const imageValue = document.querySelector(".profileImg").getAttribute("value");
saveButton.addEventListener("click", (e) => {
  e.preventDefault;
});
