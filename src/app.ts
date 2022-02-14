import express, {Request, Response} from 'express'
import { json, urlencoded } from 'body-parser'
import Joi from 'joi'
import indexRoutes from './routes/index'

const app = express()
const port = process.env.PORT || 3000

interface country {
    id:number,
    name:string
}

const countries:country[] = [
    {id:1, name:'Albania'},
    {id:2, name:'Burundi'},
    {id:3, name:'Chipre'},
    {id:4, name:'Dinamarca'}
]

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(indexRoutes)

app.get('/', (req:Request, res:Response) => {
    res.send('Hello world from Express')
})

app.get('/api/countries', (req, res) => {
    res.send(countries);
})

app.get('/api/countries/:name/:population', (req, res) => {
    res.send(req.params);
})

app.get('/api/countries/:id', (req, res) => {
    let country = existsCountry(req.params.id)
    if (!country) {
        res.status(404).send(`country doesn't exists`)
        return
    }
    res.send(country)
})

app.post('/api/countries', (req, res) => {

    const {error, value} = validarCountry(req.body.name)

    if (!error){
        const country = {
            id: countries.length + 1,
            name: value.name
        }
        console.log(country)
        countries.push(country)
        res.send(countries)
    } else {
        res.status(400).send(error.details[0].message)
    }
})

app.put('/api/countries/:id', (req, res) => {
    let country = existsCountry(req.params.id)
    if (!country) {
        res.status(404).send(`country doesn't exists`)
        return
    }

    const {error, value} = validarCountry(req.body.name)
    
    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }
    country.name = value.name
    res.send(country)
})

app.delete('/api/countries/:id', (req, res) => {
    let country = existsCountry(req.params.id)
    if (!country) {
        res.status(404).send(`country doesn't exists`)
        return
    }
    const index = countries.indexOf(country)
    countries.splice(index, 1)
    res.send(countries)
})

app.listen(port, () => {
    console.log(`Server is runnning on port ${port} ...`)
})

function existsCountry(id:string) {
    return countries.find(c => c.id === parseInt(id))
}

function validarCountry(name:string) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    
    return schema.validate({ name });
}
