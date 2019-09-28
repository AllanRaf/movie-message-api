const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const jsonParser = bodyParser.json()

const port = 4000

const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')
const app = express()
app.use(jsonParser)

const Movie = sequelize.define('movie',
    {
        title: Sequelize.TEXT,
        yearOfRelease: Sequelize.INTEGER,
        synopsis: Sequelize.TEXT
})
sequelize.sync()
    .then(() => console.log('Tables created successfully'))
    .catch(err => {
        console.error('Unable to create tables, shutting down...', err);
        process.exit(1);
    })
//Create three initial movie entries
Movie.create({
    title: "Toy Story",
    yearOfRelease: 1996,
    synopsis: "Adventure with toys that come alive"
})
Movie.create({
    title: "Terminator",
    yearOfRelease: 1985,
    synopsis: "Killer robot goes back in time to destroy a target"
})
Movie.create({
    title: "Psycho",
    yearOfRelease: 1960,
    synopsis: "Horror where not things are not all they seem in a hotel"
})
//Create a new movie
app.post('/movies', (req, res, next) =>{
    console.log('req.body is: ', req.body)
    Movie.create(req.body)
    .then(movie => res.status(201).json(movie))
    .catch(next)
})
//Get all movies
app.get('/movies/collections', (req, res, next) => {
    Movie.findAll()
    .then(movies => res.status(201).json(movies))
    .catch(next)
})
//Get one movie using id
app.get('/movies/:id', (req, res, next) => {
    Movie.findByPk(req.params.id)
    .then(movie => {
        if(!movie){
            res.status(404).end()
        }else{
            res.status(201).json(movie)
        }
    })
    .catch(next)
})
//Update one movie using id
app.put('/movies/:id', (req, res, next) => {
    Movie.findByPk(req.params.id)
    .then(
        movie => {if(!movie){
            res.status(404).end()
        }else{
        movie.update(req.body)
        }
    })
    .then(updatedMovie => res.status(201).json(updatedMovie))
    .catch(next)
})
//Delete one movie using id
app.delete('/movies/:id', (req, res, next) => {
    Movie.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(movieDeleted => {
        if(!movieDeleted){
            res.status(404).end()
        }else{
        res.status(200).json(movieDeleted)}
    })
    .catch(next)
})

app.listen(port)

