const url =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3";

const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector(".search-input");
const regionSelect = document.querySelector(".region-select");

let allCountries = [];

fetch(url)
  .then((response) => response.json())
  .then((countryData) => {
    allCountries = countryData;
    renderCountries(allCountries);
  });

function renderCountries(countries) {
  cardContainer.innerHTML = "";

  if (!countries.length) {
    cardContainer.innerHTML = "<p>No countries found.</p>";
    return;
  }

  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("card");

    countryCard.innerHTML = `
      <img src="${country.flags?.svg}" alt="">
      <div class="text-content">
        <h2>${country.name?.common}</h2>
        <div class="details">
          <p>Population:&nbsp;<span>${country.population.toLocaleString()}</span></p>
          <p>Region:&nbsp;<span>${country.region}</span></p>
          <p>Capital:&nbsp;<span>${country.capital?.[0] ?? "N/A"}</span></p>
        </div>
      </div>
    `;

    countryCard.addEventListener("click", () => {
      window.location.href = `country.html?code=${country.cca3}`;
    });

    cardContainer.append(countryCard);
  });
}

function applyFilters() {
  const searchQuery = searchInput.value.toLowerCase().trim();
  const selectedRegion = regionSelect.value;

  let filteredCountries = allCountries;

  if (selectedRegion !== "All") {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === selectedRegion
    );
  }

  if (searchQuery) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery)
    );
  }

  renderCountries(filteredCountries);
}

searchInput.addEventListener("input", applyFilters);
regionSelect.addEventListener("change", applyFilters);

const toggle = document.querySelector(".theme-toggle");
const icon = toggle.querySelector("i");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  icon.classList.replace("fa-moon", "fa-sun");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});
