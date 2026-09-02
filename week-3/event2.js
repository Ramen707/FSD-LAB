const EventEmitter = require("events");
const ee = new EventEmitter();
ee.setMaxListeners(20);
for(let i=0;i<=15;i++){
    ee.on("start",()=>{
        console.log("Listener "+(i+1)+" Executed");
    });
}
ee.emit("start");