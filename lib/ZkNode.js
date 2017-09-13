var ZOOKEEPER = require('zookeeper');
var path = require('path');
var moment = require('moment');
var assert = require('assert');
module.exports = function(hosts){
	var newZk=function(zkClient){
		var zk = new ZOOKEEPER();
		var timeout = 60000;
		var options = {connect:hosts, timeout:timeout, debug_level:ZOOKEEPER.ZOO_LOG_LEVEL_INFO, host_order_deterministic:false};
		zk.init (options);
		zk.on('connect', function(zkk){
			console.log( moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), ' zk session established, id = %s', zkk.client_id);
		});
		zk.on('close',function(zkk){
		    console.log(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), ' zk session close...');
		    zkClient.zk = newZk(hosts, zkClient);
		});
		return zk;
	};
	this.zk=newZk(hosts,this);
	this.registerService = function(zk,node,data){
	    // EPHEMERAL：创建临时节点，ZooKeeper在感知连接机器宕机后会清除它创建的瞬节点
		zk.a_create('/nodeMicro/' + node, data, ZOOKEEPER.ZOO_SEQUENCE | ZOOKEEPER.ZOO_EPHEMERAL, function (rc, error, path)  {
	        if (rc !== 0){//error occurs
	            console.log('node create result: %d, error: "%s", path: /nodeMicro/'+node, rc, error);
	        }
	        else{
	            console.log('node create result: ok, path: /nodeMicro/'+ node);
	        }
	    });
	};
	this.removeServiceThenExit = function(zk, node, fn){
		zk.a_delete_('/nodeMicro' + '/' + node, null, function(rc, err){
	        if(rc!==0){
	            console.log('delete error: ', rc, err);
	        }
	        else{
	            console.log('delete ok');
	        }  
	        fn();
	    });
	};
	this.close = function(zk){
	    zk.close();
	};
};