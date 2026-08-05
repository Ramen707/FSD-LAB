setTimeout(() => console.log("Once"), 3000);


let id = setInterval(() => console.log("Repeated"), 3000);

setTimeout(() => clearInterval(id), 10000);