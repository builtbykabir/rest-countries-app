const countryDetailCard = document.querySelector(".country-detail-container");
const params = new URLSearchParams(window.location.search);
const countryCode = params.get("code");
if (!countryCode) {
  window.location.href = "index.html";
}

function goBack() {
  if (document.referrer.includes(window.location.origin)) {
    history.back();
  } else {
    window.location.href = "/";
  }
}

fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
  .then((res) => res.json())
  .then((data) => {
    const country = data[0];

    const nativeName =
      Object.values(country?.name?.nativeName ?? {})[0]?.common ?? "—";

    const currencies = Object.values(country?.currencies ?? {})
      .map((c) => c.name)
      .join(", ");

    const languages = Object.values(country?.languages ?? {}).join(", ");

    const bordersHTML = (country?.borders ?? [])
      .map(
        (b) => `
    <li>
      <a href="country.html?code=${b}" style="text-decoration: none; color: inherit;">
        <span class="border-item">${b}</span>
      </a>
    </li>
  `
      )
      .join("");

    countryDetailCard.innerHTML = `
  <div class="country-flag">
    <img 
      src="${country?.flags?.svg}" 
      alt="${country?.flags?.alt ?? country?.name?.common}" 
    />
  </div>

  <div class="country-info">
    <div class="country-name">
      <h2>${country?.name?.common}</h2>
    </div>

    <ul id="country-details">
      <li>Native Name:&nbsp;<span>${nativeName}</span></li>
      <li>Population:&nbsp;<span>${country?.population?.toLocaleString()}</span></li>
      <li>Region:&nbsp;<span>${country?.region}</span></li>
      <li>Sub-Region:&nbsp;<span>${country?.subregion}</span></li>
      <li>Capital:&nbsp;<span>${country?.capital?.join(", ")}</span></li>
      <li>Top Level Domain:&nbsp;<span>${country?.tld?.[0]}</span></li>
      <li>Currencies:&nbsp;<span>${currencies}</span></li>
      <li>Languages:&nbsp;<span>${languages}</span></li>
    </ul>

    <div class="border-countries">
      <p>Border Countries:&nbsp;</p>
      ${
        country?.borders && country.borders.length > 0
          ? `<ul>${bordersHTML}</ul>`
          : `<span>None</span>`
      }
    </div>
  </div>
`;
  });

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
