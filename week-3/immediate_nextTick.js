console.log("Start");

setImmediate(() => {
    console.log("Immediate");
});

console.log("End");
const id = setImmediate(() => {
    console.log("HI");
});

clearImmediate(id);
process.nextTick(function(){
    console.log("next tick 1");
})
process.nextTick(function(){
    console.log("next tick 2");
})