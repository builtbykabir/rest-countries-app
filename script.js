const url =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3";
const cardContainer = document.querySelector(".card-container");

fetch(url)
  .then((response) => response.json())
  .then((countryData) => {
    countryData.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("card");
      countryCard.innerHTML = `
                    <img src="${country?.flags?.svg}" alt="">
                    <div class="text-content">
                    <h2>${country?.name?.common}</h2>
                    <div class="details">
                    <p>Population:&nbsp;<span>${country?.population}</span></p>
                    <p>Region:&nbsp;<span>${country?.region}</span></p>
                    <p>Capital:&nbsp;<span>${country?.capital[0]}</span></p>
                    </div>
                    </div>
                    `;
      countryCard.addEventListener("click", () => {
        window.location.href = `country.html?code=${country.cca3}`;
      });
      cardContainer.append(countryCard);
    });
  });

// {
//     "flags": {
//         "png": "https://flagcdn.com/w320/ag.png",
//         "svg": "https://flagcdn.com/ag.svg",
//         "alt": "The flag of Antigua and Barbuda has a red field with an inverted isosceles triangle based on the top edge and spanning the height of the field. This triangle has three horizontal bands of black, light blue and white, with the light blue band half the height of the two other bands. The top half of a golden-yellow sun is situated in the lower two-third of the black band to depict a rising sun."
//     },
//     "name": {
//         "common": "Antigua and Barbuda",
//         "official": "Antigua and Barbuda",
//         "nativeName": {
//             "eng": {
//                 "official": "Antigua and Barbuda",
//                 "common": "Antigua and Barbuda"
//             }
//         }
//     },
//     "cca3": "ATG",
//     "capital": [
//         "Saint John's"
//     ],
//     "region": "Americas",
//     "population": 103603
// }
