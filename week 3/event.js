const EventEmitter = require("events");
const ee = new EventEmitter();
ee.on("fun1",function(){
    console.log("1st Listener");
});
ee.on("fun1",function(){
    console.log("2nd Listener");
});
ee.once("fun1",function(){
    console.log("3rd Listener(ONCE)");
});
ee.emit("fun1");
ee.emit("fun1");
