var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var ClusterNode=require('./lib/ClusterNode.js');
var handle=function(){
	var thrift=require("thrift");
	var RedisMicroService=require('./thrift/gen-nodejs/RedisMicroService.js');
	var ttypes=require('./thrift/gen-nodejs/redisMicroService_types.js');
	var Redis = require('ioredis');
	var redis = new Redis({ sentinels: [{ host: '192.168.37.242', port: 27000 }, { host: '192.168.37.243', port: 27000 }, { host: '192.168.37.245', port: 27000 }], name: 'master-test1',dropBufferSupport: true});
	var server=thrift.createServer(RedisMicroService,
		    {
			  getTableSequenceNo:function(key,callback){
		            redis.hincrby('seq:::index', key, 1,function(err,resp){
		            	 callback(null,resp);
		            });
//		            redis.get('node-sentinel', function (err, result) { console.log(result);}); 
//		            console.log(num);
		            },
		    }
		);
		server.listen(9090);
		console.log("server start");
		server.on("error",function(e){
		    console.log(e);
		});
};
//var clusterServer = new ClusterNode(handle,'code-0-4:2181,code-0-5:2181,code-0-6:2181,code-0-7:2181,code-0-8:2181','redisClusterNode-','10.6.30.58:9090');
var clusterServer = new ClusterNode(handle);
clusterServer.cluster();