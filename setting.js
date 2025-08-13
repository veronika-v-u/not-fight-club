document.addEventListener('DOMContentLoaded', () => {
            const viewMode = document.getElementById('view-mode');
            const editMode = document.getElementById('edit-mode');
            const currentEl = document.getElementById('currentName');
            const inputEl = document.getElementById('inputName');
            const btnEdit = document.getElementById('btn-edit');
            const btnSave = document.getElementById('btn-save');

            const savedName = localStorage.getItem('playerName') || '';
            currentEl.textContent = savedName || 'Player';

            btnEdit.addEventListener('click', () => {
                inputEl.value = localStorage.getItem('playerName') || '';
                viewMode.style.display = 'none';
                editMode.style.display = 'flex';
                inputEl.focus();
            });

            btnSave.addEventListener('click', () => {
                const newName = inputEl.value.trim();
                if (!newName) {
                    alert('Please enter the characters name.');
                    return;
                }
                localStorage.setItem('playerName', newName);
                currentEl.textContent = newName;

                editMode.style.display = 'none';
                viewMode.style.display = 'flex';
            });
        });