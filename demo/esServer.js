var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  hosts: [ '192.168.37.242:9200',
	       '192.168.37.243:9200',
	       '192.168.37.244:9200',
	       '192.168.37.245:9200',
	       '192.168.37.246:9200',
	       '192.168.37.247:9200',
	     ],
  log: 'trace'
});

client.search({
	  index: 'idx-mycat-secondaryidx-memberdb-lp_member-member_account-2017',
	  type: 'io.mycat.sencondaryindex.model.CatSecondaryIndexModel',
	  body: {
	    query: {
	      match: {
	    	  	shardingValue: '1100000002'
	      }
	    }
	  }
	}).then(function (resp) {
	    var hits = resp.hits.hits;
	}, function (err) {
	    console.trace(err.message);
});