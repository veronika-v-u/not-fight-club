document.querySelector('.btn-fight').addEventListener('click', () => {
  const battleId = Date.now();
  sessionStorage.setItem('currentBattleId', battleId);
  window.location.href = 'fight.html';
});
