document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("login-container").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    initTable();
});

// Définition des catégories et des limites
const categories = {
    "Boulangerie": 22,
    "Point Chaud": 30,
    "Grossiste": 40
};

// Créer une ligne pour une catégorie
function createRow(category) {
    const newRow = document.createElement('tr');

    // Première cellule : nom de la catégorie (pas le mot "Catégorie")
    const categoryCell = document.createElement('td');
    categoryCell.textContent = category;
    newRow.appendChild(categoryCell);

    const createInputCell = (type = 'text') => {
        const cell = document.createElement('td');
        const input = document.createElement('input');
        input.type = type;
        cell.appendChild(input);
        return cell;
    };

    newRow.appendChild(createInputCell()); // Nom du transporteur

    const farineCell = document.createElement('td');
    const selectFarine = document.createElement('select');
    ["", "PS", "PS-7"].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        selectFarine.appendChild(option);
    });
    farineCell.appendChild(selectFarine);
    newRow.appendChild(farineCell);

    newRow.appendChild(createInputCell('number')); // Quantité Farine

    const semouleCell = document.createElement('td');
    const selectSemoule = document.createElement('select');
    ["", "SSSE", "MG", "GG"].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        selectSemoule.appendChild(option);
    });
    semouleCell.appendChild(selectSemoule);
    newRow.appendChild(semouleCell);

    const semouleQtyCell = document.createElement('td');
    const inputQtySemoule = document.createElement('input');
    inputQtySemoule.type = 'number';
    inputQtySemoule.addEventListener('blur', function () {
        validateSemouleQuantity(this.value, category, inputQtySemoule);
    });
    semouleQtyCell.appendChild(inputQtySemoule);
    newRow.appendChild(semouleQtyCell);

    newRow.appendChild(createInputCell()); // Destination
    newRow.appendChild(createInputCell()); // Ordre
    newRow.appendChild(createInputCell()); // N° Voyage

    return newRow;
}

// Initialisation du tableau avec lignes + boutons
function initTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = "";

    Object.keys(categories).forEach(cat => {
        const row = createRow(cat);
        tableBody.appendChild(row);

        // Ajouter le bouton sous chaque catégorie
        const buttonRow = document.createElement('tr');
        const buttonCell = document.createElement('td');
        buttonCell.colSpan = 9;
        const button = document.createElement('button');
        button.textContent =' Ajouter une ligne pour ${cat}';
        button.style.margin = '8px 0';
        button.addEventListener('click', () => {
            const newRow = createRow(cat);
            tableBody.insertBefore(newRow, buttonRow);
        });
        buttonCell.appendChild(button);
        buttonRow.appendChild(buttonCell);
        tableBody.appendChild(buttonRow);
    });
}

// Vérification de la quantité de semoule
function validateSemouleQuantity(value, category, inputElement) {
    const parsedValue = parseFloat(value);
    const limit = categories[category];

    if (parsedValue > limit) {
        alert('La quantité de semoule ne doit pas dépasser ${limit} pour la catégorie "${category}".');
        inputElement.value = "";
    }
}