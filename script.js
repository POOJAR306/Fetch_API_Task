const usersContainer = document.getElementById('usersContainer');
const reloadBtn = document.getElementById('reloadBtn');
const errorMsg = document.getElementById('errorMsg');

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Function to fetch and display users
async function fetchUsers() {
    usersContainer.innerHTML = '';
    errorMsg.textContent = '';
    try {
        const response = await fetch(API_URL);

        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');

            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
            `;

            usersContainer.appendChild(userCard);
        });

    } catch(error) {
        errorMsg.textContent = `Failed to fetch users: ${error.message}`;
    }
}

// Fetch users on page load
fetchUsers();

// Reload button event
reloadBtn.addEventListener('click', fetchUsers);
