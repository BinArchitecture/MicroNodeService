var thrift=require("thrift");
var UserService=require('./thrift/gen-nodejs/UserService.js');
var ttypes=require('./thrift/gen-nodejs/xuser_types');
 
var users={};
 
var server=thrift.createServer(UserService,
    {
        add:function(user,callback){
            console.log("add stored:",user.uname);
            users[user.uid]=user;
            console.log(users);
            callback();},
        adduname:function(x,callback){
            console.log("adduname stored:",x);
            users[x]=x;
            console.log(users);
            callback(null,"MMMMM");
        },
        get:function(uid,callback){
            console.log("get received:", uid);
            console.log(users[uid]);
            callback(null,users[uid]);
        }
    }
);
 
server.listen(9090);
console.log("server start");
 
server.on("error",function(e){
    console.log(e);
});