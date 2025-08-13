document.addEventListener('DOMContentLoaded', () => {
    const currentNameEl = document.getElementById('currentName');
    const currentAvatarEl = document.getElementById('currentAvatar');
    const winsCountEl = document.getElementById('winsCount');
    const lossesCountEl = document.getElementById('lossesCount');
    const avatarContainer = document.getElementById('avatarContainer');
    const avatarSelector = document.getElementById('avatarSelector');
    const avatarOptions = document.querySelectorAll('.avatar-option');

    const savedName = localStorage.getItem('playerName') || 'Palyer';
    const savedAvatar = localStorage.getItem('avatar') || 'avatars/1.png';
    const savedWins = parseInt(localStorage.getItem('wins')) || 0;
    const savedLosses = parseInt(localStorage.getItem('losses'))|| 0;

    currentNameEl.textContent = savedName;
    currentAvatarEl.src = savedAvatar;
    winsCountEl.textContent = savedWins;
    lossesCountEl.textContent = savedLosses;

    avatarContainer.addEventListener('click', () => {
        avatarSelector.classList.remove('hidden');
    });

    avatarOptions.forEach(img => {
        img.addEventListener('click', () => {
        const newSrc = img.src;
        currentAvatarEl.src = newSrc;
        localStorage.setItem('avatar', newSrc);
        avatarSelector.classList.add('hidden');
        });
    });

    avatarSelector.addEventListener('click', e => {
        if (e.target === avatarSelector) {
        avatarSelector.classList.add('hidden');
        }
    });
})