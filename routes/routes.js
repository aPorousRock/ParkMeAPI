const express = require('express');
const router = express.Router();
const executeImpalaQuery = require('../impala/query-processor');
const executeSolrQuery = require('../solr/query-processor');

router.get('/', function(req, res){
  res.status(200).json({"status": "Running", "Server": "Impala"});
});

router.get('/impala/executeQuery', function(req, res) {
  if (req.query.query == "" || req.query.query == undefined){
    return res.status(400).json({"Error": "No query field specified"});
  }

  executeImpalaQuery(req.query.query, function (err, results) {
    if(err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(results);
    }
  });

});

router.get('/solr/executeQuery', function(req, res) {
  if (req.query.query == "" || req.query.query == undefined){
    return res.status(400).json({"Error": "No query field specified"});
  }

  executeSolrQuery(req.query.query, function (err, results) {
    if(err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(results);
    }
  });

});

module.exports = router;
