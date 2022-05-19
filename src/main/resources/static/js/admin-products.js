const host = "http://localhost";
const port = ":8080";
const productTable = document.getElementById("productTable");
const tableBody = document.getElementById("productTableBody");
const overlay = document.getElementById("overlay");
const editNameButton = document.getElementById("editNameButton");
const editDescriptionButton = document.getElementById("editDescriptionButton");
const editPriceButton = document.getElementById("editPriceButton");
const editCategoryButton = document.getElementById("editCategoryButton");
const editNameOverlay = document.getElementById("editNameOverlay");
const editPriceOverlay = document.getElementById("editPriceOverlay");
const editDescriptionOverlay = document.getElementById("editDescriptionOverlay");
const editCategoryOverlay = document.getElementById("editCategoryOverlay");

let products = null;

/* search bar */




/* laste inn produkt */
function initializeProducts() {
    getProducts();
    setEventListeners();
}

function getProducts() {
    const req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', host + port + "/products/", true);
    req.onload  = function() {
        products = JSON.parse(req.responseText);
        loadProducts()
    };
    req.send(null);
}

function loadProducts() {
    tableBody.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        addProductRow(product);
    }
}

function addProductRow(product) {
    if (!document.getElementById("productTable")) return;
    const row = document.createElement("tr");
    row.onclick = () => {
        manageProduct(product);
        overlay.classList.toggle("show");
    };

    const idCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const categoryCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const stockCell = document.createElement("td");

    const idNode = document.createTextNode(product["id"]);
    const nameNode = document.createTextNode(product["name"]);
    const categoryNode = document.createTextNode(product["category"]["name"]);
    const priceNode = document.createTextNode(product["price"]);
    /*
    todo: implement productInventoryStuff here
     */
    const stockNode = document.createTextNode("-");

    idCell.appendChild(idNode);
    nameCell.appendChild(nameNode);
    categoryCell.appendChild(categoryNode);
    priceCell.appendChild(priceNode);
    stockCell.appendChild(stockNode);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(categoryCell);
    row.appendChild(priceCell);
    row.appendChild(stockCell);
    tableBody.appendChild(row);
}

function manageProduct(product) {
    const idLabel = document.getElementById("productIdLabel");
    const nameLabel = document.getElementById("productNameLabel");
    const stockLabel = document.getElementById("productStockLabel");
    const priceLabel = document.getElementById("productPriceLabel");
    const categoryLabel = document.getElementById("productCategoryLabel");
    const descriptionLabel = document.getElementById("productDescriptionLabel");
    const imageLabel = document.getElementById("productImageLabel");
    const image = document.getElementById("productImage");

    idLabel.textContent = product["id"];
    nameLabel.textContent = product["name"];
    /*
    todo: implement productInventory
     */
    stockLabel.textContent = "-";
    priceLabel.textContent = product["price"];
    categoryLabel.textContent = product["category"]["name"];
    descriptionLabel.innerHTML = product["description"].replaceAll(".", ".&ZeroWidthSpace;");
    /*
    todo: implement image controller
     */
    imageLabel.textContent = "/img/gallery/pic-6-390w.jpg";
    image.src = imageLabel.textContent;
}

function setEventListeners() {
    editNameButton.addEventListener("click",function() {
        editName();
    });
    editDescriptionButton.addEventListener("click",function() {
        editDescription();
    });
    editPriceButton.addEventListener("click",function() {
        editPrice();
    });
    editCategoryButton.addEventListener("click",function() {
        editCategory();
    });
}

function editName() {
    editNameOverlay.classList.toggle("display");
}

function editDescription() {
    editDescriptionOverlay.classList.toggle("display");
}

function editPrice() {
    editPriceOverlay.classList.toggle("display");
}

function editCategory() {
    editCategoryOverlay.classList.toggle("display");
}

if (document.getElementsByClassName("edit__window")) {
    window.addEventListener('mouseup', function(event) {

        const editOverlays = document.getElementsByClassName("edit__window");
        for (let i = 0; i < editOverlays.length; i++) {
            if (editOverlays[i].contains(event.target)) {
                return;
            }
        }
        for (let i= 0; i < editOverlays.length; i++) {
            editOverlays[i].parentElement.classList.remove("display");
        }
    });
}