let data;

// Fetch JSON data
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    console.log(data); // Confirm data is loaded
  })
  .catch(err => console.error("Error loading JSON:", err));

// Search function
function search() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  // Search beaches
  const beachResults = data.beaches.filter(b => b.name.toLowerCase().includes(input));
  beachResults.forEach(item => resultsDiv.appendChild(createCard(item)));

  // Search temples
  const templeResults = data.temples.filter(t => t.name.toLowerCase().includes(input));
  templeResults.forEach(item => resultsDiv.appendChild(createCard(item)));

  // Search countries and cities
  data.countries.forEach(country => {
    if (country.name.toLowerCase().includes(input)) {
      country.cities.forEach(city => resultsDiv.appendChild(createCard(city)));
    } else {
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(input)) {
          resultsDiv.appendChild(createCard(city));
        }
      });
    }
  });
}

// Clear results
function clearResults() {
  document.getElementById('results').innerHTML = '';
  document.getElementById('searchInput').value = '';
}

// Create a card element
function createCard(item) {
  const div = document.createElement('div');
  div.className = 'card';

  const img = document.createElement('img');
  img.src = item.imageUrl;
  div.appendChild(img);

  const name = document.createElement('h3');
  name.textContent = item.name;
  div.appendChild(name);

  const desc = document.createElement('p');
  desc.textContent = item.description;
  div.appendChild(desc);

  return div;
}