const express = require('express')
const app = express()
const port = 3000

const joi = reqiure('joi')

app.use(express.json())

const movies = [
{title: 'Harry Potter', imdb: 9, author: 'Tim Cook', id:1},
{title: 'Spider man', imdb: 8, author: 'Jack Ma',id:2},
{title: 'Iron man', imdb: 8.4, author: 'Henry Alison',id:3},
]

app.get('api/movies', (req, res)=>{
    res.send(movies)
})

app.post('/api/create/movie', (req, res)=>{
    let movie = {
title: req.body.title,
imdb: req.body.imdb,
author: req.body.author,
id: movies.length + 1
}


const schema = joi.object({
    title: joi.string().min(3).max(64).required(),
    author: joi.string().min(3).max(64).required(),
    imdb: joi.number().required()
})

 const result = schema.validate(req.body)

if(result.error){
    res.send(result.error.message)
    return
}

    movies.push(movie)

    res.status(201).send('Movie created succesfull')
})

app.listen(port, () => console.log('Serverworking with express with port: ', port))