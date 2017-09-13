var mysql =  require('mysql');
var Q =  require('q');
var getConn=function(pool){
	var deffered=Q.defer();
	pool.getConnection(function(err, conn) {
		if(err){deffered.reject(err);}
		else{deffered.resolve(conn);}
	});
	return deffered.promise;
};
var handleConn=function(conn){
	var deffered=Q.defer();
	conn.query("select * from joblog",function(err, rows){
		if(err){ deffered.reject(err);}
		else{deffered.resolve(rows);}
	});
	return deffered.promise;
};

var pool =  mysql.createPool({
	host : "192.168.37.246",
	user : "root",
	password: "KTqHDMg8r3q1w",
	database: "joblppz",
	port: 3306
	});

getConn(pool).then(function(conn) {
	var promise2=handleConn(conn);
	console.log("release conn");
	conn.release();
	return promise2;
}).then(function(rows){
	console.log( rows );
}).fail(function(err) {
	throw err;
});
//pool.getConnection(function(err, conn){
//	conn.query( "select * from joblog",  function(err, rows){
//	      if(err)    {
//	          throw err;
//	      }else{
//	          console.log( rows );
//	      } 
//	      conn.release();
//});
//});