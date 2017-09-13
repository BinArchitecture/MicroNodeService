var thrift = require('thrift');
 
var iService = require('./thrift/gen-nodejs/IThriftTestInterfaceThriftService.js');
var ttypes = require('./thrift/gen-nodejs/test_types.js');
 
var server=thrift.createServer(iService,
	    {
			serviceInvoke:function(json,callback){
	            console.log("add json:",json);
	            callback(null,json);},
	        string2Int:function(param,callback){
	            console.log("get received:", param);
	            callback(null,param);
	        }
	    }
	);
	 
	server.listen(3100);
	console.log("server start");
	 
	server.on("error",function(e){
	    console.log(e);
	});