const conf = require('config');
const request = require('request');

var executeSolrUpdateQuery = function (id, property, propValue, collection, callback) {

  
  const url = "http://bfsolr201.innovate.ibm.com" + ":" + "8983" + "/solr/" + "Alerts6"+"/update?commit=true";


  var formData = [
    {
      "id": id,
      [property]: {
        "set": propValue
      }
    }
  ];

  var options = {
    method: 'POST',
    url: url,
    json: formData,
  }

  request(options, function (err, httpResponse, body) {

    if (err) {
      console.error('error posting json: ', err)

      callback(err, "Error");
    }
    else if (httpResponse.statusCode != "200") {
      callback(null, "Error");
    }
    else {
      callback(null, "Success");
    }
  });
}

module.exports = executeSolrUpdateQuery;
