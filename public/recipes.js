const searchForm = document.querySelector('form');
const searchResultdiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '42f5c3b5';
const APP_key = 'b1822162989f37abedae2ab9e9587084'
const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    // console.log(searchQuery)
    fetchAPI();
})

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits)
    console.log(data);
}

function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result =>{
        //creating HTML item for each loop of array
        generatedHTML += 
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="" />
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
    searchResultdiv.innerHTML = generatedHTML;
}