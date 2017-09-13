var thrift = require("thrift");
var RedisMicroService = require('./thrift/gen-nodejs/RedisMicroService.js');
var ttypes = require('./thrift/gen-nodejs/redisMicroService_types.js');
var ClusterNode=require('./lib/ClusterNode.js');
var handle=function(){
	var KafkaNode=require('./lib/KafkaNode.js');
	var kafkanode=new KafkaNode('code-0-4:2181,code-0-5:2181,code-0-6:2181,code-0-7:2181,code-0-8:2181',"dubbolog",8);
	var kafkaMsgs = [];
	var server = thrift.createServer(RedisMicroService, {
		getTableSequenceNo : function(msg, callback) {
			kafkaMsgs.unshift(msg);
			callback(null, kafkaMsgs.length);
		},
	});
	server.listen(9091);
	console.log("server start");
	server.on("error", function(e) {
		console.log(e);
	});
	var oneSecond = 1000 * 1; 
	var kSend=kafkanode.kafkaSend;
	kafkanode.batchSendKafka(kafkaMsgs,kSend,oneSecond);
};
var clusterServer = new ClusterNode(handle,'code-0-4:2181,code-0-5:2181,code-0-6:2181,code-0-7:2181,code-0-8:2181','kafkaClusterNode-','10.6.30.58:9091');
clusterServer.cluster();