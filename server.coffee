require 'coffee-script/register'

express = require 'express'
morgan = require 'morgan'
bodyParser = require 'body-parser'
methodOverride = require 'method-override'
app = express()

mongoose = require 'mongoose'

mongoose.connect 'LOCATION_TO_MONGO_DB'

# app.configure ->
#     # sets the static files to /public
#     app.use express.static __dirname + '/public'
#     app.use express.logger 'dev'
#     app.use express.bodyParser()
#     app.use express.methodOverride()

app.use express.static __dirname + '/public'
app.use morgan 'dev'
app.use bodyParser()
app.use methodOverride()

Link = mongoose.model 'Link',
    title: String,
    url: String


# Routes
# get all links
app.get '/api/links', (req, res) ->
    Link.find (err, links) ->
        if err
            res.rend err
        res.json links
# create link and send back all links after creation
app.post '/api/links', (req, res) ->
    Link.create
        title   : req.body.title
        url     : req.body.url
        done    : false
        (err, link) ->
            if err
                res.send err

            Link.find (err, links) ->
                if err
                    res.send err
                res.json links

app.delete '/api/links/:link_id', (req, res) ->
    Link.remove
        _id: req.params.link_id
        (err, link) ->
            if err
                res.send err
            # get and return all links
            Link.find (err, links) ->
                if err
                    res.send err
                res.json links


# application
app.get '*', (req, res) ->
    res.sendfile './public/index.html'

app.listen 8080
console.log "App listening on port 8080"