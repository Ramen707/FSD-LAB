console.time("A");
setTimeout(() => {
    console.timeEnd("A");
}, 3000);
function say(){
    console.log("HEllo");
}
let k = setInterval(say,3000);
setTimeout(()=>{
    clearInterval(k);
},8000);