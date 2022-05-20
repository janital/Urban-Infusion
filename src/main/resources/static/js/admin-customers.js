const customerTable = document.getElementById("userTable");
const tableBody = document.getElementById("userTableBody");
const overlay = document.getElementById("overlay");
const purchaseHistoryTable = document.getElementById("purchaseHistoryTable");
const purchaseHistoryTableBody = document.getElementById("purchaseHistoryTableBody");
const host = "http://localhost";
const port = ":8080";

function getUsers() {
    const req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', host + port + USERS_PATHNAME, true);
    req.onload  = function() {
        const jsonResponse = JSON.parse(req.responseText);
        loadUsers(jsonResponse)
    };
    req.send(null);
}

function loadUsers(users) {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        addUserRow(user);
    }
}

function addUserRow(user) {
    if (!document.getElementById("userTable")) return;
    const row = document.createElement("tr");
    row.addEventListener("click", () => {
        manageUser(user);
        overlay.classList.toggle("hidden");
    })

    const idCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const addressCell = document.createElement("td");

    const idNode = document.createTextNode(user["id"]);
    const nameNode = document.createTextNode(user["firstName"] + " " + user["lastName"]);
    let addressNode = document.createTextNode("");
    if (user["address"]) addressNode = document.createTextNode(user["address"]["addressLine"]);

    idCell.appendChild(idNode);
    nameCell.appendChild(nameNode);
    addressCell.appendChild(addressNode);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(addressCell);
    tableBody.appendChild(row);
}

function manageUser(user) {
    const idLabel = document.getElementById("customerIdLabel");
    const nameLabel = document.getElementById("customerNameLabel");
    const emailLabel = document.getElementById("customerEmailLabel");
    const passwordLabel = document.getElementById("customerPasswordLabel");
    const addressLabel = document.getElementById("customerAddressLabel");
    const createdAtLabel = document.getElementById("createdAtLabel");
    const lastLoginLabel = document.getElementById("lastLoginLabel");

    idLabel.textContent = user["id"];
    nameLabel.textContent = user["firstName"] + " " + user["lastName"];
    emailLabel.textContent = user["email"];
    passwordLabel.textContent = "*******";
    if (user["address"]) addressLabel.textContent = user["address"]["addressLine"];
    createdAtLabel.textContent = user["createdAt"].substring(0,10);
    lastLoginLabel.textContent = "yesterday";

    fetchOrders(user);
}

function fetchOrders(user) {
    const req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', host + port + ORDERS_PATHNAME, true);
    req.onload  = function() {
        const allOrders = JSON.parse(req.responseText);
        populatePurchaseHistory(user, allOrders);
    };
    req.send(null);
}

function populatePurchaseHistory(user, allOrders) {
    const orders = [];
    for (let i = 0; i < allOrders.length; i++) {
        if (allOrders[i]["user"]["id"] === user["id"]) {
            orders.push(allOrders[i]);
        }
    }

    for (let i = 0; i < orders.length; i++) {
        addPurchaseHistoryRow(orders[i]);
    }
}

function addPurchaseHistoryRow(order) {
    const row = document.createElement("tr");
    const dateCell = document.createElement("th");
    const idCell = document.createElement("th");
    const itemCell = document.createElement("th");
    const totalCell = document.createElement("th");
    const statusCell = document.createElement("th");

    const dateNode = document.createTextNode(order["createdAt"].substring(0,10));
    const idNode = document.createTextNode(order["id"]);


    let items = "";
    for (let i = 0; i < Math.min(order["orderItems"].length, 2); i++) {
        let item = order["orderItems"][i];
        if (i > 0) {
            items += ", ";
        }
        items += item["quantity"] + " x " + item["product"]["name"];
    }
    if (order["orderItems"].length > 2) {
        items += "...";
    }
    const itemsNode = document.createTextNode(items)

    const totalNode = document.createTextNode(order["total"]);
    let statusNode = document.createTextNode("Pending");
    if (order["processed"] === true) {
        statusNode = document.createTextNode("Completed");
    }

    dateCell.appendChild(dateNode);
    idCell.appendChild(idNode);
    itemCell.appendChild(itemsNode);
    totalCell.appendChild(totalNode);
    statusCell.appendChild(statusNode);

    row.appendChild(dateCell);
    row.appendChild(idCell);
    row.appendChild(itemCell);
    row.appendChild(totalCell);
    row.appendChild(statusCell);

    purchaseHistoryTableBody.appendChild(row);
}