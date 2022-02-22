//search form, container, results
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
//search value
let searchQuery = '';
const APP_ID = '42f5c3b5';
const APP_key = 'b1822162989f37abedae2ab9e9587084'
const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;
//backticks for inserting dynamic link ${}

//search form, pass event, and return value of search
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value; 
    // console.log(searchQuery)
    fetchAPI(); //function to fetch api
})

//async function for fetchapi, awaits response and returns in json object
async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`; //&to=20 for 20 results
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits) //function generate passed data for hits/results
    console.log(data);
}

function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = ''; //variable to array for all items on html 
    results.map(result =>{ //map for every result and pass function to make item
        //creating new HTML item for every time pass through array
        generatedHTML += 
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="food" />
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p> 
        <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p> 
        <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
      </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML; //return
}

//Calories tofixed to display wanted # of decimel places
//dietLabel if lengeth is greater than 0, else no data found
