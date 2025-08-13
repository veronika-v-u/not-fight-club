document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const input = document.getElementById('nameInput');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const playerName = input.value.trim();
        if (!playerName) {
            alert('Please enter the characters name.');
            return;
        }

        localStorage.setItem('playerName', playerName);

        window.location.href = 'home.html';
    });
});