document.addEventListener('DOMContentLoaded', () => {
    const zones = ["Head", "Neck", "Body", "Belly", "Legs"];

    const enemies = [
        { name: "NeonWhisk", avatar: "6.png", health: 120, attackZones: 2, blockZones: 1, critChance: 0.2, critMultiplier: 1.5},
        { name: "Trollax", avatar: "7.png", health: 180, attackZones: 1, blockZones: 3, critChance: 0.1, critMultiplier: 2.0 },
        { name: "Spideron", avatar: "8.png", health: 100, attackZones: 2, blockZones: 2, critChance: 0.3, critMultiplier: 1.3 }
    ];

    const enemy = enemies[Math.floor(Math.random() * enemies.length)];

    const playerNameEl = document.getElementById('currentName');
    const playerAvatarEl = document.getElementById('currentAvatar');
    const playerHealthEl = document.getElementById('playerHealth');
    const enemyNameEl = document.getElementById('enemyName');
    const enemyAvatarEl = document.getElementById('enemyAvatar');
    const enemyHealthEl = document.getElementById('enemyHealth');
    const attackBtn = document.getElementById('attackBtn');

    const playerName = localStorage.getItem('playerName') || 'Player';
    const playerAvatar = localStorage.getItem('avatar') || '3.png';
    let playerHealth = 150;
    let enemyHealth = enemy.health;

    playerNameEl.textContent = playerName;
    playerAvatarEl.src = playerAvatar;
    enemyNameEl.textContent = enemy.name;
    enemyAvatarEl.src = enemy.avatar;
    playerHealthEl.textContent = `${playerHealth}/150`;
    enemyHealthEl.textContent = `${enemyHealth}/${enemy.health}`;

    document.getElementById('playerHealthBar').style.width = `${(playerHealth / 150) * 100}%`;
    document.getElementById('enemyHealthBar').style.width = `${(enemyHealth / enemy.health) * 100}%`;


    function getSelectedAttackZone() {
        const selected = document.querySelector('input[name="attack"]:checked');
        return selected ? selected.value : null;
    }

    function getSelectedDefenceZones() {
        const selected = Array.from(document.querySelectorAll('input[name="defence"]:checked'));
        return selected.map(input => input.value);
    }

    function getRandomZones(count) {
        const shuffled = zones.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function validateSelection() {
        const attack = getSelectedAttackZone();
        const defence = getSelectedDefenceZones();
        attackBtn.disabled = !(attack && defence.length === 2);
    }

    document.querySelectorAll('input[name="attack"], input[name="defence"]').forEach(input => {
        input.addEventListener('change', validateSelection);
    });

    attackBtn.addEventListener('click', () => {
        const playerAttack = getSelectedAttackZone();
        const playerDefence = getSelectedDefenceZones();
        const enemyAttackZone = getRandomZones(enemy.attackZones);
        const enemyDefenceZone = getRandomZones(enemy.blockZones);

        let playerDamage = 0;
        let enemyDamage = 0;

        const isCritPlayer = Math.random() < 0.25;
        if (!enemyDefenceZone.includes(playerAttack) || isCritPlayer) {
            playerDamage = isCritPlayer ? 30 : 20;
        }

        enemyAttackZone.forEach(zone => {
            const isBlocked = playerDefence.includes(zone);
            const isCritEnemy = Math.random() < enemy.critChance;
            let dmg = isCritEnemy ? 30 : 20;
            if (!isBlocked || isCritEnemy) enemyDamage += dmg;
        });

        playerHealth = Math.max(0, playerHealth - enemyDamage);
        enemyHealth = Math.max(0, enemyHealth - playerDamage);

        playerHealthEl.textContent = `${playerHealth}/150`;
        enemyHealthEl.textContent = `${enemyHealth}/${enemy.health}`;

        if (playerDamage > 0) {
            enemyAvatarEl.classList.add('hit');
            setTimeout(() => enemyAvatarEl.classList.remove('hit'), 400);
        }

        if (enemyDamage > 0) {
            playerAvatarEl.classList.add('hit');
            setTimeout(() => playerAvatarEl.classList.remove('hit'), 400);
        }

        const playerBar = document.getElementById('playerHealthBar');
        const enemyBar = document.getElementById('enemyHealthBar');

        playerBar.style.width = `${(playerHealth / 150) * 100}%`;
        enemyBar.style.width = `${(enemyHealth / enemy.health) * 100}%`;


        if (playerHealth <= 0 || enemyHealth <= 0) {
            const  result = playerHealth > 0 ? 'win' : 'lose';
            const wins = parseInt(localStorage.getItem('wins')) || 0;
            const losses = parseInt(localStorage.getItem('losses')) || 0;

            if (result == 'win') {
                localStorage.setItem('wins', wins + 1);
                alert('You won!');
            } else {
                localStorage.setItem('losses', losses + 1);
                alert('You lost!');
            }

            location.reload();
        }
    });
});