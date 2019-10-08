//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const path = require('path');
const app = express();
app.use("/", express.static(path.join(__dirname, "dist/lab9")));
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies',{ useNewUrlParser: true }, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);//7
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/inc4',actors.increAge);//extra
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);


app.delete('/actors/:id1/:id2',actors.deleteMovie);//3
app.delete('/actors',actors.deleteActor);//2
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);//8
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

app.delete('/movies/ayear/:data',movies.deletebefore);

app.delete('/movies/:id',movies.deleteOne);//1
app.delete('/movies/:id1/:id2',movies.deleteActor);//4
app.post('/movies/:id/actors',movies.addActor);//5
app.get('/movies/:year1/:year2',movies.getBetween)//6


