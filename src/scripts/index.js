import '../styles/index.scss';

const go = new Go();
let spin;
let spinningReceived;
let resolveSpinningReceived;
var timer;

async function run() {
    spinningReceived = new Promise(resolve => {
        resolveSpinningReceived = resolve;
    })
    WebAssembly.instantiateStreaming(fetch('./public/main.wasm'), go.importObject)
    .then(function(res) {
        go.run(res.instance);
    });
}

run();

window.runSpin = function (callback) {
    spin = callback;
    resolveSpinningReceived()
}

window.stopTimer = function() {
    clearTimeout(timer);
}

window.startTimer = function() {
    timer = setInterval(function(){ spin(); }, 0);
}