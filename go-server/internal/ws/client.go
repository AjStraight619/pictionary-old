package ws

import (
	"bytes"
	"compress/zlib"
	"encoding/json"
	"io"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn *websocket.Conn
	Send chan []byte
}

type Message struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

func (c *Client) ReadMessages(s *Server) {
	defer func() {
		s.Unregister <- c
		c.Conn.Close()
		log.Println("Client disconnected, closed readMessages")
	}()

	log.Println("Client connected, starting readMessages")
	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}

		log.Printf("Received raw message: %v", message)

		// Decompress the message using zlib
		decompressedMessage, err := decompressMessage(message)
		if err != nil {
			log.Println("Error decompressing message:", err)
			continue
		}

		// log.Printf("Decompressed message: %s", decompressedMessage)
		var msg Message
		if err := json.Unmarshal(decompressedMessage, &msg); err != nil {
			log.Println("Error unmarshalling message:", err)
			continue
		}

		// Process the message (e.g., broadcast to other clients)
		if msg.Type == "startTimer" {
			s.StartCountdown()
		} else if msg.Type == "stopTimer" {
			s.StopCountdown()
		}

		// Compress the message again before broadcasting
		compressedMessage, err := compressMessage(decompressedMessage)

		log.Println("Compressed message: ", compressedMessage)
		if err != nil {
			log.Println("Error compressing message:", err)
			continue
		}

		s.Broadcast <- compressedMessage
	}
}

func (c *Client) WriteMessages() {
	defer c.Conn.Close()

	log.Println("Client connected, starting writeMessages")
	for message := range c.Send {
		if err := c.Conn.WriteMessage(websocket.BinaryMessage, message); err != nil {
			log.Println("Error writing message:", err)
			return
		}
		log.Printf("Sent message: %s", message)
	}
	log.Println("Client disconnected, closed writeMessages")
}

// Decompress message using zlib
func decompressMessage(message []byte) ([]byte, error) {
	log.Printf("Decompressing message: %v", message)
	reader, err := zlib.NewReader(bytes.NewReader(message))
	if err != nil {
		return nil, err
	}
	defer reader.Close()
	return io.ReadAll(reader)
}

// Compress message using zlib
func compressMessage(message []byte) ([]byte, error) {
	var buffer bytes.Buffer
	writer := zlib.NewWriter(&buffer)
	if _, err := writer.Write(message); err != nil {
		return nil, err
	}
	if err := writer.Close(); err != nil {
		return nil, err
	}
	return buffer.Bytes(), nil
}
