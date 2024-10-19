document.addEventListener('DOMContentLoaded', () => {
    const matchSelect = document.getElementById('match-select');
    const matchNumberElem = document.getElementById('matchNumber');
    const matchDateElem = document.getElementById('matchDate');
    const player1NameElem = document.getElementById('player1Name');
    const player1PointsElem = document.getElementById('player1Points');
    const player2NameElem = document.getElementById('player2Name');
    const player2PointsElem = document.getElementById('player2Points');
    const statusTextElem = document.getElementById('statusText');
    const liveIndicatorElem = document.getElementById('liveIndicator');
    let selectedMatchId;
    const host = 'https://game-status-back.onrender.com';


    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    async function fetchMatchIds() {
        const response = await fetch(`${host}/game-ids`);
        const matchIds = await response.json();
        return matchIds;
    }

    async function fetchMatchData(matchId) {
        const response = await fetch(`${host}/game-info/${matchId}`);
        const matchData = await response.json();
        return matchData;
    }

    function updateMatchSelect(matchIds) {
        matchSelect.innerHTML = '';
        matchIds.forEach(id => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = `Match ${id}`;
            matchSelect.appendChild(option);
        });
        selectedMatchId = Math.max(...matchIds);
        matchSelect.value = selectedMatchId;
    }

    function displayMatchData(matchData) {
        matchNumberElem.textContent = matchData.matchNumber;
        matchDateElem.textContent = formatDate(matchData.matchDate);
        player1NameElem.textContent = matchData.player1.name;
        player1PointsElem.textContent = matchData.player1.points;
        player2NameElem.textContent = matchData.player2.name;
        player2PointsElem.textContent = matchData.player2.points;

        if (matchData.playing) {
            statusTextElem.textContent = 'En Juego';
            statusTextElem.classList.add('playing');
            statusTextElem.classList.remove('finalized');
            liveIndicatorElem.classList.add('playing');
            liveIndicatorElem.classList.remove('finalized');
        } else {
            statusTextElem.textContent = 'Finalizado';
            statusTextElem.classList.add('finalized');
            statusTextElem.classList.remove('playing');
            liveIndicatorElem.classList.add('finalized');
            liveIndicatorElem.classList.remove('playing');
        }
    }

    async function updateMatchData() {
        const matchData = await fetchMatchData(selectedMatchId);
        displayMatchData(matchData);
    }

    matchSelect.addEventListener('change', function() {
        selectedMatchId = matchSelect.value;
        updateMatchData();
    });

    async function initialize() {
        const matchIds = await fetchMatchIds();
        updateMatchSelect(matchIds);
        await updateMatchData();
        setInterval(updateMatchData, 5000);
    }

    initialize();
});