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

	http.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, HX-Request, HX-Trigger, HX-Current-URL, HX-Target, HX-Boosted")

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		// Ensure it's a POST request
		if r.Method != http.MethodPost {
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			return
		}

		// Parse form data
		err := r.ParseForm()
		if err != nil {
			http.Error(w, "Error parsing form data", http.StatusInternalServerError)
			return
		}

		username := r.FormValue("username")
		password := r.FormValue("password")

		// Validate input
		if username == "" || password == "" {
			http.Error(w, "Missing required fields", http.StatusBadRequest)
			return
		}

		if len(username) < 4 || len(password) < 8 {
			http.Error(w, "Username must be at least 4 characters and password at least 8 characters", http.StatusNotAcceptable)
			return
		}

		fmt.Fprintln(w, "User created successfully")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server is running on http://localhost:%v", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
