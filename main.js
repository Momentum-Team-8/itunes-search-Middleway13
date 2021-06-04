// 1. Build a form that has an `<input>` where a user can type in the name of a band or an artist.
// 2. When the user types their search term and presses the submit button (or presses Enter), make the search request to the API.
// 3. When the API returns a response, use the results to display a listing of songs related to the search term.
// 4. When a user clicks a song in your listing, the song should play in an `<audio>` tag that you've also added to the page.


const url = 'https://proxy-itunes-api.glitch.me/search?term='

// varibles that grab elements by id# from DOM
const form = document.getElementById('form')

const inputSearch = document.getElementById('search-input')

const searchOutput = document.getElementById('search-output')

// listens for the submit button to be clicked before search can begin
form.addEventListener ('submit', event => {
    event.preventDefault()
    searchRequest()
    
})

// function that makes a pre-defined search request from API
function searchRequest() {
    const search = inputSearch.value

// *Shot out to Roan, he helped me develop and fully understand the below portions of code;
// precisley the simplified fetch url solution and the render functions 
    fetch (url + `${search}` + '&limit=13&entity=song')
    .then (resp => resp.json())
    .then(data =>  { 
        console.log(data)
        for (let x of data.results) {
            renderSongList(x)
        }
    })
    
}

// function that renders the object data to output on the front-end
function renderSongList (data) {
    const results = document.createElement("li")
    results.id = data.trackId
    renderSongBody(results, data) 
    searchOutput.appendChild(results)
}

// function that pulls in specific object data 
//and connects individual data values to corresponding DOM elements
//then renders the object data to the designated HTML nodes
function renderSongBody (results, data) {
    const title = document.createElement('p')
    const bandName = document.createElement('p')
    const preview = document.createElement('audio')
    const sample = document.createElement('source')
    
    preview.controls = true
    sample.src = data.previewUrl
    title.innerHTML = data.trackName
    bandName.innerHTML = data.artistName
    preview.appendChild(sample)
    results.appendChild(title)
    results.appendChild(bandName)
    results.appendChild(preview)
}