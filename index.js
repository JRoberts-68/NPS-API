const apiKey = 'PPFJhq3eGSp7BNQfY5eSeIcVaPLDS3f3EjvBUHFg';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';



function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}



function displayResults(responseJson){
    $('.resultsList').empty();
    for (let i = 0; i < responseJson.items.length; i++){
        $('.resultsList').append(
            `<li><h3>${responseJson.data[i].fullName}</h3><p>${responseJson.data[i].description}</p>
            <p><a href=${responseJson.data[i].url}</a>Visit This Parks Site</p>
            </li>`
        )};
        $('.results').removeClass('hidden');
};

function getParks(query, maxResults=10){
    
    const params = {
        api_key: apiKey,
        stateCode: query,
        limit: maxResults
    };
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString;

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

function watchForm(){
    $('.js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search').val();
        const maxResults = $('#js-results').val();
        getParks(searchTerm, maxResults);
    });
}

$(watchForm);