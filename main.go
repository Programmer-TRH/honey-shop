package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Programmer-TRH/hoeny-shop/auth"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Hello World")
	})

	http.HandleFunc("/register", auth.Register)
	http.HandleFunc("/login", auth.Login)
	http.HandleFunc("/logout", auth.Logout)
	http.HandleFunc("/protected", auth.Protected)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server is running on http://localhost:%v", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
