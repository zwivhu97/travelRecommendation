let data = [];

// FETCH DATA
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(result => {
    data = result;
    console.log(data); // confirm it loads
  });

// SEARCH FUNCTION
function search() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";

  // BEACHES
  if (input.includes("beach")) {
    data.beaches.forEach(place => {
      displayCard(place.name, place.imageUrl, place.description);
    });
  }

  // TEMPLES
  else if (input.includes("temple")) {
    data.temples.forEach(place => {
      displayCard(place.name, place.imageUrl, place.description);
    });
  }

  // COUNTRIES (IMPORTANT PART ✅)
  else if (input.includes("country")) {
    data.countries.forEach(country => {
      country.cities.forEach(city => {
        displayCard(city.name, city.imageUrl, city.description);
      });
    });
  }

  else {
    resultsDiv.innerHTML = "<p>No results found</p>";
  }
}

// DISPLAY FUNCTION (Reusable)
function displayCard(name, image, description) {
  const resultsDiv = document.getElementById('results');

  const card = `
    <div class="card">
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p>${description}</p>
    </div>
  `;

  resultsDiv.innerHTML += card;
}

// CLEAR BUTTON
function clearResults() {
  document.getElementById('results').innerHTML = "";
  document.getElementById('searchInput').value = "";
}