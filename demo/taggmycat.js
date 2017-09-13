var tagg= require('threads_a_gogo');
var http= require('http');
//json转换为字符串
//var count=0;
var fuck = function(uid){
	var data = JSON.stringify({  
		"lppz_param_json":{
	        "uid":uid,  
	        "channel":"b2c"
	     },
	    "method":"getMemberInfoByUid",
	    "timestamp":"1488621251986",
	    "sign":"038f0f77b5adfd1e282f6cd279b0a399"
	});
	console.log(data);
	var options = {  
	        method: "POST",  
	        host: "member-center.serv.lp.com",  
	        port: 80,  
	        path: "/services/member",  
	        headers: {  
	            "Content-Type": 'application/json',  
	            "Content-Length": data.length  
	        }  
	    };
	var req = http.request(options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
	        console.log("body: " + chunk);
	    });
	    res.on('end',function(chunk){
	        console.log("body: " + chunk);
	    });
	});
	req.write(data);
	req.end();
};
fuck("1100000008");
//console.time('fuck');
//for(var i=0;i<100;i++){
//	fuck("1100000008");
//}
//while(true){
//	console.log(count);
//	if(count===1000){
//		break;
//	}
//}
//console.timeEnd('fuck');
//function fibo (n) {
//	return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
//	}
//	console.time('8 thread');
//	var numThreads= 8; //创建线程池，最大数为8
//	var threadPool= tagg.createPool(numThreads).all.eval(fuck); //为线程池注册程序
//	var i=8;
//	var cb = function(err,data){ //注册线程执行完毕的回调函数
//	console.log(data);
//	if(!--i){
//	threadPool.destroy();
//	console.timeEnd('8 thread');
//	}
//	}
//	threadPool.any.eval('fuck(1100000008)',cb); 
//	threadPool.any.eval('fuck("1100000008")', cb); 
//	threadPool.any.eval('fuck("1100000008")', cb); 
//	threadPool.any.eval('fuck("1100000008")', cb); 
//	threadPool.any.eval('fuck("1100000008")', cb); 
//	threadPool.any.eval('fuck("1100000008")', cb); 
//	threadPool.any.eval('fuck("1100000008")', cb); 
//	threadPool.any.eval('fuck("1100000008")', cb); 