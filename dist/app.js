"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const joi_1 = __importDefault(require("joi"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const countries = [
    { id: 1, name: 'Albania' },
    { id: 2, name: 'Burundi' },
    { id: 3, name: 'Chipre' },
    { id: 4, name: 'Dinamarca' }
];
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use(index_1.default);
app.get('/', (req, res) => {
    res.send('Hello world from Express');
});
app.get('/api/countries', (req, res) => {
    res.send(countries);
});
app.get('/api/countries/:name/:population', (req, res) => {
    res.send(req.params);
});
app.get('/api/countries/:id', (req, res) => {
    let country = existsCountry(req.params.id);
    if (!country) {
        res.status(404).send(`country doesn't exists`);
        return;
    }
    res.send(country);
});
app.post('/api/countries', (req, res) => {
    const { error, value } = validarCountry(req.body.name);
    if (!error) {
        const country = {
            id: countries.length + 1,
            name: value.name
        };
        console.log(country);
        countries.push(country);
        res.send(countries);
    }
    else {
        res.status(400).send(error.details[0].message);
    }
});
app.put('/api/countries/:id', (req, res) => {
    let country = existsCountry(req.params.id);
    if (!country) {
        res.status(404).send(`country doesn't exists`);
        return;
    }
    const { error, value } = validarCountry(req.body.name);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    country.name = value.name;
    res.send(country);
});
app.delete('/api/countries/:id', (req, res) => {
    let country = existsCountry(req.params.id);
    if (!country) {
        res.status(404).send(`country doesn't exists`);
        return;
    }
    const index = countries.indexOf(country);
    countries.splice(index, 1);
    res.send(countries);
});
app.listen(port, () => {
    console.log(`Server is runnning on port ${port} ...`);
});
function existsCountry(id) {
    return countries.find(c => c.id === parseInt(id));
}
function validarCountry(name) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required()
    });
    return schema.validate({ name });
}
