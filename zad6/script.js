const themeButton = document.getElementById("themeButton");
const toggleProjectsButton = document.getElementById("toggleProjectsButton");
const projectsSection = document.getElementById("projekty");

const contactForm = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

const skillsList = document.getElementById("skillsList");
const projectsList = document.getElementById("projectsList");
const experienceList = document.getElementById("experienceList");
const jsonStatus = document.getElementById("jsonStatus");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("green-theme");
  document.body.classList.toggle("red-theme");
});

toggleProjectsButton.addEventListener("click", function () {
  projectsSection.classList.toggle("hidden");
});

fetch("data.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Nie udało się pobrać pliku data.json");
    }
    return response.json();
  })
  .then(function (data) {
    jsonStatus.textContent = "Dane zostały poprawnie wczytane z pliku data.json.";

    skillsList.innerHTML = "";
    projectsList.innerHTML = "";
    experienceList.innerHTML = "";

    data.skills.forEach(function (skill) {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    data.projects.forEach(function (project) {
      const li = document.createElement("li");
      li.textContent = project;
      projectsList.appendChild(li);
    });

    data.experience.forEach(function (item) {
      const article = document.createElement("article");
      article.classList.add("dynamic-item");

      const title = document.createElement("h3");
      title.textContent = item.title;

      const description = document.createElement("p");
      description.textContent = item.description;

      article.appendChild(title);
      article.appendChild(description);
      experienceList.appendChild(article);
    });
  })
  .catch(function (error) {
    console.error("Błąd podczas pobierania danych:", error);
    jsonStatus.textContent = "Nie udało się wczytać danych z JSON. Uruchom stronę przez GitHub Pages albo Live Server.";
  });

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  successMessage.textContent = "";

  let isValid = true;

  const nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (firstName.value.trim() === "") {
    firstNameError.textContent = "Pole imię jest wymagane.";
    isValid = false;
  } else if (!nameRegex.test(firstName.value.trim())) {
    firstNameError.textContent = "Imię nie może zawierać cyfr ani znaków specjalnych.";
    isValid = false;
  }

  if (lastName.value.trim() === "") {
    lastNameError.textContent = "Pole nazwisko jest wymagane.";
    isValid = false;
  } else if (!nameRegex.test(lastName.value.trim())) {
    lastNameError.textContent = "Nazwisko nie może zawierać cyfr ani znaków specjalnych.";
    isValid = false;
  }

  if (email.value.trim() === "") {
    emailError.textContent = "Pole e-mail jest wymagane.";
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Podaj poprawny adres e-mail.";
    isValid = false;
  }

  if (message.value.trim() === "") {
    messageError.textContent = "Pole wiadomość jest wymagane.";
    isValid = false;
  }

  if (isValid) {
    successMessage.textContent = "Formularz został poprawnie wypełniony. Dane nie są wysyłane na backend.";
    contactForm.reset();
  }
});