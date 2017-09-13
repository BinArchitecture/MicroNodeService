var thrift =require('thrift');
 
var UserService = require('./thrift/gen-nodejs/UserService.js');
var ttypes = require('./thrift/gen-nodejs/xuser_types');
 
var connection = thrift.createConnection('127.0.0.1', 3000);
var client = thrift.createClient(UserService, connection);
 
connection.on("error",function(e)
{
    console.log(e);
});
 
 
var x=new ttypes.User({
    uid:'112',
    uname:'aab',
    usex:0,
    uage:'181'
});
 
client.adduname('112');
//client.adduname('112',function(err, res){
//	if (err) {
//		console.error(err);
//	} else {
//		console.log("Res:",res);
//		connection.end();
//	}
//});
//client.get('112',function(err, res){
//if (err) {
//  console.error(err);
//} else {
//  console.log("Res:",res);
//  connection.end();
//}
//});
//client.add(x,function(err, res){
//    console.log("ADD OK1");
//});