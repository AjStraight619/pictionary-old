package db

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `gorm:"unique;not null"`
	Username string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
}

type Room struct {
	ID       string `gorm:"type:char(25);primary_key"`
	RoomName string `gorm:"unique;not null"`
	gorm.Model
}
