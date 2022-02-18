const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const apiKey = `226d7461f922212d18c08571e478a48a
`;

let city = "Chicago"

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
}) 

app.get('/recipes', (req, res) => {
    res.render('recipes')
})

// app.post('/weather', (req, response) => {
//     let city = req.body.city
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    
//     request(url, function(err,res,body) {
//         if(err){
//             console.log(`Error: ${err}`)
//         } else {
//             // console.log(`Body: ${body}`);
    
//             let weather = JSON.parse(body)
    
//             let message = `It is ${weather.main.temp} degrees outside in ${weather.name}`
    
//             response.send(message)
            
//         }
//     })
// });

// request(url, function(err,res,body) {
//     if(err){
//         console.log(`Error: ${err}`)
//     } else {
//         // console.log(`Body: ${body}`);

//         let weather = JSON.parse(body)

//         let message = `It is ${weather.main.temp} degrees outside in ${weather.name}`

//         console.log(message);
//     }
// });


const port = 5000
app.listen(port, ()=>{
    console.log(`This server is running on ${port}`)
})