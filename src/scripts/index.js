import '../styles/index.scss';

const go = new Go();

let mod, inst;

WebAssembly.instantiateStreaming(fetch("./public/main.wasm"), go.importObject).then(
    result => {
        mod = result.module;
        inst = result.instance;
        go.run(inst);
    }
);

// global calc function
window.calc = function(op) {
    let v1 = Number(document.getElementById("val1").value);
    let v2 = Number(document.getElementById("val2").value);

    if (!v1 || !v2) {
        return;
    }

    // call the GO calc
    if (op === '+') {
        add(v1, v2);
    } else if (op === '-') {
        sub(v1, v2);
    } else if (op === '*') {
        mul(v1, v2);
    } else if (op === '/') {
        div(v1, v2);
    }
}
