package auth

import (
	"fmt"
	"net/http"
	"time"
)

type LoginModel struct {
	HashedPassword string
	SessionToken   string
	CSRFToken      string
}

var users = map[string]LoginModel{}

func init() {
	fmt.Println(users)
}

func renderHTMLResponse(w http.ResponseWriter, message string, isSuccess bool, statusCode int) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(statusCode)

	statusClass := "success"
	if !isSuccess {
		statusClass = "error"
	}
	fmt.Fprintf(w, `<div class="%s"><p>%s</p></div>`, statusClass, message)

}

func Register(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, HX-Request, HX-Trigger, HX-Current-URL, HX-Target, HX-Boosted")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	// Ensure it's a POST request
	if r.Method != http.MethodPost {
		renderHTMLResponse(w, "Invalid request method", false, http.StatusMethodNotAllowed)
		return
	}

	// Parse form data
	if err := r.ParseForm(); err != nil {
		renderHTMLResponse(w, "Failed to parse form data", false, http.StatusBadRequest)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	// Validate inputs
	if len(username) < 4 || len(password) < 8 {
		renderHTMLResponse(w, "Username must be at least 4 characters and password must be at least 8 characters", false, http.StatusNotAcceptable)
		return
	}

	// Check if user exists
	if _, exists := users[username]; exists {
		renderHTMLResponse(w, "Username already exists", false, http.StatusConflict)
		return
	}

	// Hash password
	hashedPassword, err := HashedPassword(password)
	if err != nil {
		renderHTMLResponse(w, "Error hashing password", false, http.StatusInternalServerError)
		return
	}

	// Save user
	users[username] = LoginModel{
		HashedPassword: hashedPassword,
	}

	// Return success message
	renderHTMLResponse(w, "User registered successfully!", true, http.StatusOK)
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, HX-Request, HX-Trigger, HX-Current-URL, HX-Target, HX-Boosted, X-CSRF-Token")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	if r.Method != http.MethodPost {
		renderHTMLResponse(w, "Invalid request method", false, http.StatusMethodNotAllowed)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	user, ok := users[username]
	if !ok || !CheckPassword(password, user.HashedPassword) {
		renderHTMLResponse(w, "Invalid username or password", false, http.StatusUnauthorized)
		return
	}

	sessionToken := GenerateToken(32)
	csrfToken := GenerateToken(32)

	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    sessionToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
	})

	http.SetCookie(w, &http.Cookie{
		Name:     "csrf_token",
		Value:    csrfToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: false,
	})

	// Store tokens in database
	user.SessionToken = sessionToken
	user.CSRFToken = csrfToken
	users[username] = user

	renderHTMLResponse(w, fmt.Sprintf("Logged in successfully! Welcome %s", username), true, http.StatusOK)

}

func Protected(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, HX-Request, HX-Trigger, HX-Current-URL, HX-Target, HX-Boosted")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		err := http.StatusMethodNotAllowed
		http.Error(w, "Invalid Method", err)
		return
	}

	if err := Authorize(r); err != nil {
		err := http.StatusUnauthorized
		http.Error(w, "Unauthorized", err)
		return
	}

	username := r.FormValue("username")
	fmt.Fprintf(w, "CSRF validation Successful! Welcome %s", username)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, HX-Request, HX-Trigger, HX-Current-URL, HX-Target, HX-Boosted")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		err := http.StatusMethodNotAllowed
		http.Error(w, "Invalid Method", err)
		return
	}

	if err := Authorize(r); err != nil {
		err := http.StatusUnauthorized
		http.Error(w, "Unauthorized", err)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	})
	http.SetCookie(w, &http.Cookie{
		Name:     "csrf_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: false,
	})

	username := r.FormValue("username")
	user := users[username]
	user.SessionToken = ""
	user.CSRFToken = ""
	users[username] = user

	fmt.Fprintln(w, "Logged out successfully!")

}
