var kafka = require('kafka-node');
module.exports = function(zkClient,topic,partionSize){
	var HighLevelProducer = kafka.HighLevelProducer;
	var KeyedMessage = kafka.KeyedMessage;
	var Client = kafka.Client;
	var client = new Client(zkClient);
	var argv = {
		topic : topic,
		partionSize: partionSize
	};
	var producer = new HighLevelProducer(client, {
		requireAcks : 1
	});
	this.kafkaSend=function(tmpMsgs){
		var partition =  Math.floor(Math.random()*(argv.partionSize));
		producer.send([{
			topic : argv.topic,
			partition : partition,
			messages : tmpMsgs,
		}], function(err, result) {
			if (err) {
				console.log("err:" + err);
				this.kafkaSend(tmpMsgs);
			}
			else{
				console.log("result:" + JSON.stringify(result));
			}
		});
	};
	this.batchSendKafka=function(kafkaMsgs,kSend,timeSecond){
		setInterval(function() {
			if (kafkaMsgs.length >0) {
				var tmpMsgs = [];
				for (var i = 0; i < kafkaMsgs.length; i++) {
					tmpMsgs.unshift(kafkaMsgs.pop());
				}
				kSend(tmpMsgs);
			}
	}, timeSecond);
	};
};