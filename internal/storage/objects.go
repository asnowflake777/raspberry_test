package storage

type User struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
	Role Role   `json:"role"`
}

type Role string

const (
	AdminRole Role = "admin"
	UserRole  Role = "user"
)
