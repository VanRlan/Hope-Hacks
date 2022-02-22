const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const APP_ID = '42f5c3b5';
const APP_key = 'b1822162989f37abedae2ab9e9587084';
const edamamApiUrl = 'https://api.edamam.com/';


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/recipes', (req, res) => {
    res.render('recipes')
});

app.get('/contact', (req, res) => {
    res.render('hopecontact')
});

app.get('/recipe', (req, response) => {
    let searchQuery = req.query.q;
    const queryString = `${edamamApiUrl}search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`;
    
    request(queryString, function(err,res,body) {
        if(err){
            console.log(`Error: ${err}`)
        } else {
            // console.log(`Body: ${body}`);

            const recipeRes = JSON.parse(body);
            const { hits } = recipeRes;
            response.send({ hits : hits });
            
        }
    })
});

const port = 5000
app.listen(port, ()=>{
    console.log(`This server is running on http://localhost:${port}`)
})