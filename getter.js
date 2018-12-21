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

const client = new protoDescriptor.test.TestService(
    'mellan:8443',
    grpc.credentials.createInsecure(),
);


const client2 = new protoDescriptor.test.TestService(
    'downstream:8443',
    grpc.credentials.createInsecure(),
);


setInterval(
    () => client.get({ id: 'mellan'}, (data, err) => {
        console.warn('mellan 1');
        console.warn(err, data)
    }),
    100,
)

setInterval(
     () => client2.get({ id: 'downstream'}, (data, err) => {
        console.warn('downstream 1');
        console.warn(err, data)
    }),
    100,
)
