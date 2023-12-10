require('dotenv').config();
const request = require('request');

exports.myExternalAdapter = (req, res) => {
  const url = 'https://api.predicthq.com/v1/events/?category=disasters';

  const header = {
    authorization: process.env.ACCESS_TOKEN,
  };

  const requestData = {
    'active.gte': req.body['active.gte'],
    'active.lte': req.body['active.lte'],
  };

  const options = {
    url: url,
    headers: header,
    qs: requestData,
    json: true,
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      const errorData = {
        jobRunID: req.body.id,
        status: 'errored',
        error: body,
      };
      res.status(response.statusCode).send(errorData);
    } else {
      const relevant = body.results.map((result) => result.country);

      const returnData = {
        data: relevant,
      };
      res.status(response.statusCode).send(returnData);
    }
  });
};
