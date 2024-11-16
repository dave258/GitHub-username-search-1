
let profileUrl = '';

async function searchUser() {
    const username = document.getElementById('username').value.trim();
    const loader = document.getElementById('loader');
    const error = document.getElementById('error');
    const profile = document.getElementById('profile');

    if (!username) {
        showError('Please enter a username');
        return;
    }

     loader.style.display = 'block';
     error.style.display = 'none';
     profile.style.display = 'none';

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (response.status === 404) {
            showError('User not found');
            return;
        }

        if (!response.ok) {
            showError('Error fetching user data');
            return;
        }

        displayProfile(data);
    } catch (err) {
        showError('Network error occurred');
    } finally {
        loader.style.display = 'none';
    }
}

function displayProfile(user) {
    document.getElementById('avatar').src = user.avatar_url;
    document.getElementById('name').textContent = user.name || user.login;
    document.getElementById('login').textContent = `@${user.login}`;
    document.getElementById('bio').textContent = user.bio || 'No bio available';
    document.getElementById('location').textContent = user.location || 'Location not specified';
    document.getElementById('repos').textContent = user.public_repos;
    document.getElementById('followers').textContent = user.followers;
    document.getElementById('following').textContent = user.following;
    profileUrl = user.html_url;

    document.getElementById('profile').style.display = 'block';
}

function showError(message) {
    const error = document.getElementById('error');
    error.textContent = message;
    error.style.display = 'block';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
}

function openProfile() {
    window.open(profileUrl, '_blank');
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

// Handle Enter key press
document.getElementById('username').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchUser();
    }
});
