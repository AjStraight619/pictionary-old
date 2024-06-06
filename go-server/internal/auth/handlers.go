package auth

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/AjStraight619/go-ws/internal/db"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Credentials struct {
	Email    string
	Username string
	Password string
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func authenticateUser(database *gorm.DB, email, password string) (db.User, error) {
	var user db.User
	if err := database.Where("email = ?", email).First(&user).Error; err != nil {
		return db.User{}, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return db.User{}, err
	}
	return user, nil
}

func CredentialsRegisterHandler(database *gorm.DB, store *sessions.CookieStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var creds Credentials
		err := json.NewDecoder(r.Body).Decode(&creds)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		hashedPassword, err := hashPassword(creds.Password)
		if err != nil {
			http.Error(w, "Server error", http.StatusInternalServerError)
			return
		}

		user := db.User{
			Email:    creds.Email,
			Username: creds.Username,
			Password: hashedPassword,
		}

		if err := database.Create(&user).Error; err != nil {
			http.Error(w, "Could not create user", http.StatusInternalServerError)
			return
		}

		session, _ := store.Get(r, "user-session")
		session.Values["user_id"] = user.ID
		session.Values["email"] = user.Email
		session.Values["username"] = user.Username
		session.Save(r, w)

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(user)
	}
}

func CredentialsSignInHandler(database *gorm.DB, store *sessions.CookieStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var creds Credentials
		err := json.NewDecoder(r.Body).Decode(&creds)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}
		log.Printf("Received credentials: %v", creds)

		// Authenticate user and create session
		user, err := authenticateUser(database, creds.Email, creds.Password)
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		session, _ := store.Get(r, "user-session")
		session.Values["user_id"] = user.ID
		session.Values["email"] = user.Email
		session.Values["username"] = user.Username
		session.Save(r, w)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}
}

func CredentialsSignOutHandler(store *sessions.CookieStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := store.Get(r, "user-session")
		session.Options.MaxAge = -1 // Mark the session to expire immediately
		err := session.Save(r, w)   // Save the session to complete the process
		if err != nil {
			http.Error(w, "Failed to end session", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Signed out successfully"})
	}
}

func CheckSessionHandler(store *sessions.CookieStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := store.Get(r, "user-session")
		userID := session.Values["user_id"]
		if userID == nil {
			http.Error(w, "No active session", http.StatusUnauthorized)
			return
		}

		response := map[string]interface{}{
			"user_id":  userID,
			"email":    session.Values["email"],
			"username": session.Values["username"],
			"message":  "Active session found",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
