

package main

import (
	"syscall/js"
)

func main() {
	c := make(chan struct{}, 0)
	println("WASM Go Initialized")
	registerCallbacks()
	<-c
}

func registerCallbacks() {
	js.Global().Set("add", js.NewCallback(add))
	js.Global().Set("sub", js.NewCallback(sub))
	js.Global().Set("mul", js.NewCallback(mul))
	js.Global().Set("div", js.NewCallback(div))
}

func add(i []js.Value) {
	result := js.ValueOf(i[0].Int() + i[1].Int())
	setResult(result)
}

func sub(i []js.Value) {
	result := js.ValueOf(i[0].Int() - i[1].Int())
	setResult(result)
}

func mul(i []js.Value) {
	result := js.ValueOf(i[0].Int() * i[1].Int())
	setResult(result)
}

func div(i []js.Value) {
	result := js.ValueOf(i[0].Int() / i[1].Int())
	setResult(result)
}

func setResult(val js.Value) {
	js.Global().Get("document").Call("getElementById", "output").Set("value", val)
}


