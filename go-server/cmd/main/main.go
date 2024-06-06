package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/AjStraight619/go-ws/internal/db"
	"github.com/AjStraight619/go-ws/internal/router"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
)

func main() {
	loadEnv()

	// Initialize the session store with the secret key from .env
	secretKey := os.Getenv("SESSION_KEY")
	if secretKey == "" {
		log.Fatalf("SESSION_KEY environment variable is not set")
	}
	store := sessions.NewCookieStore([]byte(secretKey))

	// Initialize the database
	database, err := db.InitDB()

	if err != nil {
		log.Fatalf("failed to initialize database: %v", err)
	}

	// Auto migrate User model
	err = database.AutoMigrate(&db.User{}, &db.Room{})
	if err != nil {
		log.Fatalf("failed to auto-migrate models: %v", err)
	}
	r := router.SetupRouter()
	router.SetupRoutes(r, database, store)

	log.Println("Server started on localhost:8080")
	log.Fatal(http.ListenAndServe("localhost:8080", r))
}

func loadEnv() {
	envPath := filepath.Join("..", "..", "..", ".env")

	if err := godotenv.Load(envPath); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}
