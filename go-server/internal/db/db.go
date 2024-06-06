package db

import (
	"fmt"
	"os"

	"github.com/lucsky/cuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() (*gorm.DB, error) {
	connStr := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to open database connection: %w", err)
	}
	DB = db
	return db, nil
}

func (room *Room) BeforeCreate(tx *gorm.DB) (err error) {
	room.ID = cuid.New()
	return
}
