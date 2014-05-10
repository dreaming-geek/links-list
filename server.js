// Generated by CoffeeScript 1.7.1
(function() {
  var Link, app, bodyParser, express, methodOverride, mongoose, morgan;

  require('coffee-script/register');

  express = require('express');

  morgan = require('morgan');

  bodyParser = require('body-parser');

  methodOverride = require('method-override');

  app = express();

  mongoose = require('mongoose');

  mongoose.connect('LINK_TO_MONGO');

  app.use(express["static"](__dirname + '/public'));

  app.use(morgan('dev'));

  app.use(bodyParser());

  app.use(methodOverride());

  Link = mongoose.model('Link', {
    title: String,
    url: String
  });

  app.get('/api/links', function(req, res) {
    return Link.find(function(err, links) {
      if (err) {
        res.rend(err);
      }
      return res.json(links);
    });
  });

  app.post('/api/links', function(req, res) {
    return Link.create({
      title: req.body.title,
      url: req.body.url,
      done: false
    }, function(err, link) {
      if (err) {
        res.send(err);
      }
      return Link.find(function(err, links) {
        if (err) {
          res.send(err);
        }
        return res.json(links);
      });
    });
  });

  app["delete"]('/api/links/:link_id', function(req, res) {
    return Link.remove({
      _id: req.params.link_id
    }, function(err, link) {
      if (err) {
        res.send(err);
      }
      return Link.find(function(err, links) {
        if (err) {
          res.send(err);
        }
        return res.json(links);
      });
    });
  });

  app.get('*', function(req, res) {
    return res.sendfile('./public/index.html');
  });

  app.listen(process.env.PORT || 8080);

  console.log("App listening on port 8080");

}).call(this);
