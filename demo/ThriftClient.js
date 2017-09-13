var thrift = require('thrift');
 
var iService = require('./thrift/gen-nodejs/IThriftTestInterfaceThriftService.js');
var ttypes = require('./thrift/gen-nodejs/test_types.js');
 
var transport = thrift.TFramedTransport();
var protocol = thrift.TBinaryProtocol();

var connection = thrift.createConnection("localhost", 3100, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
  console.log(err);
});
 
var client = thrift.createClient(iService, connection); 

//client.serviceInvoke('112');
client.serviceInvoke('fuck',function(err, res){
	if (err) {
		console.error(err);
	} else {
		console.log("Res:",res);
		connection.end();
	}
});
//client.add(x,function(err, res){
//    console.log("ADD OK1");
//});