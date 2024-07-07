package storage

type Storage struct {
	users []User
}

func NewStorage() *Storage {
	return &Storage{users: []User{
		{Name: "Hello", Age: 30, Role: UserRole},
		{Name: "Amazing", Age: 31, Role: AdminRole},
		{Name: "World", Age: 32, Role: UserRole},
	}}
}

func (s *Storage) Users() []User {
	return s.users
}
