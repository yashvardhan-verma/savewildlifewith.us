const express = require('express');
const body_parser = require('body-parser')
const ejs = require('ejs');
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))


app.get('/', (req, res) => {
	res.render('index')
})

app.get('/elephants', (req, res) => {
	let API = 'https://elephant-api.herokuapp.com/elephants';
	axios.get(API)
	.then(function (response) {
		res.render('elephant', {
			data: response.data})
	})
	.catch(function (error) {
		console.log("error");
	})
})

function sendSMS() {
	const accountSid = process.env.TWILIO_ACCOUNT_SID; 
	const authToken = process.env.TWILIO_AUTH_TOKEN; 
	const client = require('twilio')(accountSid, authToken); 

	client.messages 
	.create({ 
		from: '+13368101826',  
		messagingServiceSid: '',      
		to: '+919897571654' 
	}) 
	.then(message => console.log(message.sid)) 
	.done();
}

app.listen(process.env.PORT, () => console.log('Server started http://localhost:'+process.env.PORT))