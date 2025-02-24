package main

import (
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/")
		if path == "" || path == "/" {
			http.ServeFile(w, r, "static/index.html")
			return
		}
		filepath := "static/html/" + path + ".html"
		http.ServeFile(w, r, filepath)
	})

	log.Println("Server is running on http://localhost:8080")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
