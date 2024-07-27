document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    const playersList = document.getElementById('playersList');
    let players = JSON.parse(localStorage.getItem('players')) || [];

    function updatePlayersList() {
        playersList.innerHTML = '';
        players.forEach((player, index) => {
            playersList.innerHTML += `
                <tr>
                    <td>${player.name}</td>
                    <td>${player.position}</td>
                    <td>${player.age}</td>
                    <td>${player.team}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editPlayer(${index})">Editar</button>
                        <button class="btn btn-danger" onclick="deletePlayer(${index})">Excluir</button>
                    </td>
                </tr>
            `;
        });
        localStorage.setItem('players', JSON.stringify(players));
    }

    updatePlayersList();

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const age = document.getElementById('age').value;
        const team = document.getElementById('team').value;

        const player = { name, position, age, team };
        players.push(player);
        updatePlayersList();
        playerForm.reset();
    });

    window.editPlayer = (index) => {
        const player = players[index];
        document.getElementById('name').value = player.name;
        document.getElementById('position').value = player.position;
        document.getElementById('age').value = player.age;
        document.getElementById('team').value = player.team;
        players.splice(index, 1);
        updatePlayersList();
    }

    window.deletePlayer = (index) => {
        players.splice(index, 1);
        updatePlayersList();
    }
});
