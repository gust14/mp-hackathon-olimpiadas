// script.js
const selectCountry = document.getElementById('select-country');
const medalTable = document.getElementById('medal-table');
const toggleDark = document.getElementById('toggle-dark');
const toggleClean = document.getElementById('toggle-clean');
const selectRanking = document.getElementById('select-ranking');
const medalTableTop10 = document.getElementById('medal-table-top-10-table');
const medalTableTop10Body = document.getElementById('medal-table-top-10-body');

let countries = [];

fetch('https://apis.codante.io/olympic-games/countries')
    .then(response => response.json())
    .then(data => {
        countries = data.data;
        populateSelectCountry();
        populateMedalTableTop10();
    })
    .catch(error => console.error(error));

function populateSelectCountry() {
    selectCountry.innerHTML = '';
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.textContent = country.name;
        selectCountry.appendChild(option);
    });
}

selectCountry.addEventListener('change', () => {
    const selectedCountry = countries.find(country => country.id === selectCountry.value);
    if (selectedCountry) {
        const medalTableHtml = `
            <table>
                <tr>
                    <th>Medalha</th>
                    <th>Quantidade</th>
                </tr>
                <tr>
                    <td><i class="fas fa-medal gold"></i></td>
                    <td>${selectedCountry.gold_medals}</td>
                </tr>
                <tr>
                    <td><i class="fas fa-medal silver"></i></td>
                    <td>${selectedCountry.silver_medals}</td>
                </tr>
                <tr>
                    <td><i class="fas fa-medal bronze"></i></td>
                    <td>${selectedCountry.bronze_medals}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>${selectedCountry.total_medals}</td>
                </tr>
            </table>
        `;
        medalTable.innerHTML = medalTableHtml;
    }
});

document.body.classList.add('dark-theme');

toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.remove('clean-theme');
});

toggleClean.addEventListener('click', () => {
    document.body.classList.toggle('clean-theme');
    document.body.classList.remove('dark-theme');
});

function populateMedalTableTop10() {
    const ranking = selectRanking.value;
    const top10Countries = countries.sort((a, b) => {
        if (ranking === 'rank') {
            return a.rank - b.rank;
        } else {
            return b.total_medals - a.total_medals;
        }
    }).slice(0, 10);

    medalTableTop10Body.innerHTML = '';
    top10Countries.forEach(country => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${country.name}</td>
            <td><img src="${country.flag_url}" alt="${country.name} flag"></td>
            <td>${country.gold_medals}</td>
            <td>${country.silver_medals}</td>
            <td>${country.bronze_medals}</td>
            <td>${country.total_medals}</td>
        `;
        medalTableTop10Body.appendChild(row);
    });
}

selectRanking.addEventListener('change', () => {
    populateMedalTableTop10();
});

