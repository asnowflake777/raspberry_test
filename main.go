package main

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"

	"raspberry_test/internal/storage"
)

func main() {
	r := chi.NewRouter()
	s := storage.NewStorage()

	FileServer(r, "/", http.Dir("frontend"))
	r.Get("/api/users", func(w http.ResponseWriter, r *http.Request) {
		d, _ := json.Marshal(s.Users())
		_, _ = w.Write(d)
	})

	err := http.ListenAndServe(":8080", r)
	if err != nil {
		panic(err)
	}
}

func FileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit any URL parameters.")
	}

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(root))
		fs.ServeHTTP(w, r)
	})
}
