const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.set('view engine', 'ejs')

// Middleware
app.use(express.static('public'))
app.use(bodyParser.json())

app.listen(3000, function() {
    console.log('listening on 3000')
})

connectionString = 'mongodb+srv://destiny:destiny98@cluster0.ip5jqg9.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/index.html')
        const cursor = db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs', {quotes: results})
        })
        .catch(error => console.error(error))
        

    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
        // console.log(req.body)
    })

    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate (
            {name: 'Node'},
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            {
                upsert: true
            }
        )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            { name: req.body.name }
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json(`Deleted first quote`)
        })
        .catch(error => console.error(error))
    })
})




