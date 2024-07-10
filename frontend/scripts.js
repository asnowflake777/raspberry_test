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

        displayUsers(filteredUsers);
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} (${user.email})`;

            const userDetails = document.createElement('div');
            userDetails.className = 'user-details';

            const userDetailItems = [
                { label: 'Name', value: user.name },
                { label: 'Email', value: user.email },
                { label: 'Phone', value: user.phone || 'N/A' },
                { label: 'Address', value: user.address || 'N/A' },
                { label: 'Company', value: user.company || 'N/A' },
            ];

            userDetailItems.forEach(detail => {
                const detailItem = document.createElement('div');
                detailItem.className = 'user-detail-item';
                detailItem.textContent = detail.label;

                const detailContent = document.createElement('div');
                detailContent.className = 'user-detail-content';
                detailContent.textContent = detail.value;

                detailItem.appendChild(detailContent);

                if (detail.label === 'Email') {
                    const emailButton = document.createElement('button');
                    emailButton.textContent = 'Send Email';
                    emailButton.className = 'email-button';
                    emailButton.addEventListener('click', (event) => {
                        event.stopPropagation();
                        // Implement email sending logic here
                        console.log(`Sending email to: ${detail.value}`);
                    });

                    detailItem.appendChild(emailButton);
                }

                detailItem.addEventListener('click', (event) => {
                    event.stopPropagation();
                    detailContent.style.display = detailContent.style.display === 'block' ? 'none' : 'block';
                });

                userDetails.appendChild(detailItem);
            });

            listItem.addEventListener('click', () => {
                const isVisible = userDetails.style.display === 'block';
                document.querySelectorAll('.user-details').forEach(detail => detail.style.display = 'none');
                userDetails.style.display = isVisible ? 'none' : 'block';
            });

            listItem.appendChild(userDetails);
            userList.appendChild(listItem);
        });
    }
});
