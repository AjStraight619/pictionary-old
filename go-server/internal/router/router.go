package router

import (
	"github.com/AjStraight619/go-ws/internal/auth"
	"github.com/AjStraight619/go-ws/internal/ws"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/gorilla/sessions"
	"gorm.io/gorm"
)

func SetupRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	corsOptions := cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}
	r.Use(cors.Handler(corsOptions))

	return r
}

func SetupRoutes(r *chi.Mux, db *gorm.DB, store *sessions.CookieStore) {
	// http
	r.Post("/register", auth.CredentialsRegisterHandler(db, store))
	r.Post("/sign-in", auth.CredentialsSignInHandler(db, store))
	r.Post("/sign-out", auth.CredentialsSignOutHandler(store))
	r.Get("/check-session", auth.CheckSessionHandler(store))

	// websocket
	server := ws.NewServer()
	go server.Run()

	r.Get("/ws", ws.HandleConnections(server))
}
