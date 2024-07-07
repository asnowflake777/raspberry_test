package main

import "net/http"

func main() {
	http.HandleFunc("/",
		func(w http.ResponseWriter, r *http.Request) {
			_, _ = w.Write([]byte("Hello Amazing World\n"))
		},
	)
	err := http.ListenAndServe("0.0.0.0:8080", nil)
	if err != nil {
		panic(err)
	}
}
