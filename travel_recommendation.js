const resultsContainer = document.getElementById("results");

// Fetch the JSON data once
let travelData = {};
fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log("Data loaded:", travelData);
  })
  .catch(err => console.error(err));

function search() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  resultsContainer.innerHTML = ""; // clear previous results

  if (!keyword) return;

  // BEACHES
  if (keyword.includes("beach")) {
    travelData.beaches.forEach(place => {
      resultsContainer.innerHTML += createCard(place.name, place.imageUrl, place.description);
    });
  }

  // TEMPLES
  if (keyword.includes("temple")) {
    travelData.temples.forEach(place => {
      resultsContainer.innerHTML += createCard(place.name, place.imageUrl, place.description);
    });
  }

  // COUNTRIES
  if (keyword.includes("country")) {
    travelData.countries.forEach(country => {
      country.cities.forEach(city => {
        resultsContainer.innerHTML += createCard(city.name, city.imageUrl, city.description);
      });
    });
  }

  // Optional: if keyword matches a country name directly
  travelData.countries.forEach(country => {
    if (country.name.toLowerCase().includes(keyword)) {
      country.cities.forEach(city => {
        resultsContainer.innerHTML += createCard(city.name, city.imageUrl, city.description);
      });
    }
  });
}

function clearResults() {
  resultsContainer.innerHTML = "";
  document.getElementById("searchInput").value = "";
}

// Helper function to create HTML for a result card
function createCard(name, imageUrl, description) {
  return `
    <div class="card">
      <img src="${imageUrl}" alt="${name}">
      <h3>${name}</h3>
      <p>${description}</p>
    </div>
  `;
}
