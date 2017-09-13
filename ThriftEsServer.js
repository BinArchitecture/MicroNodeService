var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var ClusterNode=require('./lib/ClusterNode.js');
var handle=function(){
	var thrift=require("thrift");
	var RedisMicroService=require('./thrift/gen-nodejs/RedisMicroService.js');
	var elasticsearch = require('elasticsearch');
	  var client = new elasticsearch.Client({
	    hosts: [ '192.168.37.242:9200',
	  	       '192.168.37.243:9200',
	  	       '192.168.37.244:9200',
	  	       '192.168.37.245:9200',
	  	       '192.168.37.246:9200',
	  	       '192.168.37.247:9200',
	  	     ],
	    log: 'info'
	  });
	var server=thrift.createServer(RedisMicroService,
		    {
			  getTableSequenceNo:function(key,callback){
				  client.search({
				  	  index: 'idx-mycat-secondaryidx-memberdb-lp_member-member_account-2017',
				  	  type: 'io.mycat.sencondaryindex.model.CatSecondaryIndexModel',
				  	  body: {
				  	    query: {
				  	      match: {
				  	    	  	shardingValue: key
				  	      }
				  	    }
				  	  }
				  	}).then(function (resp) {
				  	    var hits = resp.hits.hits;
				  	    callback(null,77);
				  	}, function (err) {
				  	    console.trace(err.message);
				  	    callback(err,99);
				  });
		         }
		    }
		);
		server.listen(9090);
		console.log("server start");
		server.on("error",function(e){
		    console.log(e);
		});
};
var clusterServer = new ClusterNode(handle);
clusterServer.cluster();