document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const searchInput = document.getElementById('searchInput');
    const searchParameter = document.getElementById('searchParameter');

    let users = [];

    fetch('/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            users = data;
            displayUsers(users);
        })
        .catch(error => console.error('Error fetching users:', error));

    searchInput.addEventListener('input', () => {
        filterAndDisplayUsers();
    });

    searchParameter.addEventListener('change', () => {
        filterAndDisplayUsers();
    });

    function filterAndDisplayUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        const parameter = searchParameter.value;

        const filteredUsers = users.filter(user =>
            user[parameter].toLowerCase().includes(searchTerm)
        );

        console.log(`Filtering users by ${parameter} with term "${searchTerm}"`);
        displayUsers(filteredUsers);
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} (${user.role})`;
            userList.appendChild(listItem);
        });
    }
});
