package ws

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	EnableCompression: true, // Enable compression negotiation during the handshake
	CheckOrigin:       func(r *http.Request) bool { return true },
}

func HandleConnections(s *Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println("Error upgrading connection to ws: ", err)
			return
		}
		conn.EnableWriteCompression(true)
		client := &Client{
			Conn: conn,
			Send: make(chan []byte),
		}

		s.Register <- client
		go client.ReadMessages(s)
		go client.WriteMessages()
		log.Println("WebSocket connection established")
	}
}
