const express = require('express')
const app = express()

app.use(express.json())

let notas = [
    {
        "id": 1,
        "contenido": "Tengo que estudiar Node.js",
        "date": "2019-05-30T17:30:31.098Z",
        "importante": true
    },
    {
        "id": 2,
        "contenido": "Tengo que estudiar SQL",
        "date": "2019-05-30T18:39:34.0912Z",
        "importante": false
    },
    {
        "id": 3,
        "contenido": "Tengo que estudiar JS",
        "date": "2019-05-30T19:20.14.298Z",
        "importante": true
    }
]

// Nos devuelve un Hola mundo cuando accedemos localhost:5000
app.get('/', (request, response) => {
    response.send('<h1>Hola Mundo</h1>')
})

// Nos devuelve un JSON con nuestras notas cuando accedemos a localhost:5000
app.get('/api/notas', (request, response) => {
    response.json(notas)
})

// Nos devuelve el id del JSON con nuestras notas cuando accedemos a localhost:5000
app.get('/api/notas/:id', (request, response) => {
    const id = Number(request.params.id)
    const nota = notas.find(nota => nota.id === id)
    if (nota) {
        response.json(nota)
    } else {
        response.status(404).end()
    }
})

// Eliminamos el ID de las notas
app.delete('/api/notas/:id', (request, response) => {
    const id = Number(request.params.id)
    notas = notas.filter(nota => nota.id !== id)
    response.status(204).end()
})

// Generamos una nueva nota
app.post('/api/notas', (request, response) => {

    const nota = request.body

    if (!nota && !nota.contenido) {
        return response.status(400).json({
            error: 'nota.contenido no se encuentra'
        })
    }

    const ids = notas.map(nota => nota.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        contenido: nota.contenido,
        importante: typeof nota.importante !== 'undefined' ? nota.importante : false,
        date: new Date().toISOString()
    }

    // notas = notas.concat(newNote)
    notas = [...notas, newNote]
    response.status(201).json(newNote) 


})

// Creamos el servidor y el puerto 5000
const PORT = 5000
app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);
})