package ws

import (
	"encoding/json"
	"log"
	"time"
)

type Server struct {
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan []byte
	Clients    map[*Client]bool
	Countdown  int
	Ticker     *time.Ticker
}

func NewServer() *Server {
	return &Server{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Broadcast:  make(chan []byte),
		Clients:    make(map[*Client]bool),
		Countdown:  60,
	}
}

func (s *Server) Run() {

	for {
		select {
		case client := <-s.Register:
			s.Clients[client] = true
			log.Printf("client registered: %v", client.Conn.RemoteAddr())

		case client := <-s.Unregister:
			if _, ok := s.Clients[client]; ok {
				close(client.Send)
				delete(s.Clients, client)
				log.Printf("Client unregistered: %v", client.Conn.RemoteAddr())
			}

		case message := <-s.Broadcast:
			log.Printf("Broadcasting message: %s", message)
			for client := range s.Clients {
				select {
				case client.Send <- message:
					log.Printf("Message sent to client: %v", client.Conn.RemoteAddr())
				default:
					close(client.Send)
					delete(s.Clients, client)
					log.Printf("Client send buffer full, disconnected: %v", client.Conn.RemoteAddr())
				}
			}

		}
	}

}

func (s *Server) StartCountdown() {
	log.Println("Starting countdown...")
	s.Countdown = 60
	s.Ticker = time.NewTicker(1 * time.Second)

	go func() {
		for range s.Ticker.C {
			if s.Countdown > 0 {
				s.Countdown--
				message := &Message{
					Type: "countdown",
					Data: s.Countdown,
				}
				messageBytes, err := json.Marshal(message)
				if err != nil {
					log.Println("Error marshalling countdown message:", err)
					continue
				}
				log.Println("Countdown: ", s.Countdown)
				compressedMessage, err := compressMessage(messageBytes)
				if err != nil {
					log.Println("failed to decompress message: ", err)
					return
				}
				s.Broadcast <- compressedMessage

			} else {
				s.StopCountdown()
			}
		}
	}()
}

func (s *Server) StopCountdown() {
	if s.Ticker != nil {
		log.Println("Stopping countdown...")
		s.Ticker.Stop()
		s.Ticker = nil
	}
}
