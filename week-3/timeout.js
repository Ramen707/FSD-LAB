function simpletimeout( Timer){
    console.timeEnd( Timer);
}
console.time("2s");
setTimeout(simpletimeout,2000,"2s");
console.time("5s");
setTimeout(simpletimeout,5000,"5s");
console.time("50ms");
setTimeout(simpletimeout,50,"50ms");