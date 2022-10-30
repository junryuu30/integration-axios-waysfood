package authdto

type LoginResponse struct {
	FullName string `gorm:"type: varchar(255)" json:"fullName"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
	Role     string `gorm:"type: varchar(255)" json:"role"`
}

type RegisterResponse struct {
	FullName string `gorm:"type: varchar(255)" json:"fullName"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
	Role     string `gorm:"type: varchar(255)" json:"role"`
}

type CheckAuthResponse struct {
	Id       int    `json:"id"`
	Email    string `json:"email"`
	FullName string `json:"fullName"`
	Password string `json:"password"`
	Gender   string `json:"gender"`
	Phone    string `json:"phone"`
	Role     string `json:"role"`
	Image    string `json:"image"`
}
