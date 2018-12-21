const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    require.resolve('./test.proto'),
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(protoDescriptor.test.TestService.service, {
    get: (request, cb) => {
        console.warn('recieved', request);
        cb(null, { response: 'ds'});
    }
  });


server.bind('0.0.0.0:8443', grpc.ServerCredentials.createInsecure())
server.start();
