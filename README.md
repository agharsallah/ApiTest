# Google QPX API

it's a node.js rest api that wraps the Express QPX flights api

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

need to have node.js installed

### Installing

you need to get api key from node 

```
https://console.developers.google.com/projectselector/apis/api/qpxExpress/overview
```

put the apiKey value in config.js --> 'apikey here' 

install dependencies
```
npm install
```
launch the server
```
node server.js
```
go to 'postman' or the browser to test the request
```
localhost:3000/api/travel?start_date=2016-04-11&return_date=2016-05-12&adult_passengers=1&origin=CMN&destination=SFO&max_stops=1&max_price=2000&max_price_currency=USD
```

you will get 200 success ! 


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
1.0
