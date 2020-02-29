/*Add your key instead*/

const apiKey = '10QWsmcqpqKeaQTPmcegtbD9bl9uOYLlpHgcwSg5';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function displayResults(responseJson){
    console.log(responseJson);
    $("#js-search-results").empty();
    for (let i=0; i < responseJson.data.length; i++){
      $('#js-search-results').append(
        `<li><h3>${responseJson.data[i].name}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
        </li>`
      )
    }
  $('.results').removeClass('hidden');
  }
  

  
  function getNationalParks(query, maxResults=10) {
    const params = {
      stateCode: query,
      limit: maxResults,
      api_key: apiKey,
    }
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;
      console.log(url)
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error').text(`Something went wrong: ${err.message}`);
      });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search').val();
    const maxResults = $('#js-results').val();
    getNationalParks(searchTerm, maxResults);
  });
}
$(watchForm());