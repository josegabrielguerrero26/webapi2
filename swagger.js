const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API documentation',
    description: 'MongoDb with contacts'
  },
  host: 'l06.onrender.com', // host: 'l06.onrender.com'
  schemes: ['https'] //schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);