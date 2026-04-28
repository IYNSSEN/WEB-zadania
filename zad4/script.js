const themeButton = document.getElementById("themeButton");
const toggleProjectsButton = document.getElementById("toggleProjectsButton");
const projectsSection = document.getElementById("projekty");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("green-theme");
  document.body.classList.toggle("red-theme");
});

toggleProjectsButton.addEventListener("click", function () {
  projectsSection.classList.toggle("hidden");
});