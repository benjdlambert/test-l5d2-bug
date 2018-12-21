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
        console.warn('recieved', request.id);
        cb(null, { response: '1.6.0'});
    }
  });

setTimeout(() => {
    server.bind('0.0.0.0:8443', grpc.ServerCredentials.createInsecure())
    server.start();
}, 4 * 60 * 1000)

const client = new protoDescriptor.test.TestService(
    'downstream:8443',
    grpc.credentials.createInsecure(),
);


setInterval(
    () => client.get({ id: 'new mellan'}, (data, err) => console.warn(err, data)),
    1000,
)
