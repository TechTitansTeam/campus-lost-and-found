
const sampleItems = [
    {
        id: 1,
        title: "Blue Water Bottle",
        type: "lost",
        location: "Central Library",
        description: "Milton stainless steel bottle, left near reading table 4."
    },
    {
        id: 2,
        title: "Black Wallet",
        type: "found",
        location: "Main Canteen",
        description: "Found near billing counter containing student ID card."
    },
    {
        id: 3,
        title: "Wireless Earphones",
        type: "lost",
        location: "Computer Lab",
        description: "Black wireless earphones in a small charging case."
    },
    {
        id: 4,
        title: "College ID Card",
        type: "found",
        location: "Near the Main Block",
        description: "A college ID card was found near the main entrance."
    }
];

let items = JSON.parse(localStorage.getItem("campusItems")) || sampleItems;

function saveItems() {
    localStorage.setItem("campusItems", JSON.stringify(items));
}

function displayItems() {
    const container = document.getElementById("itemsContainer");

    if (!container) return;

    container.innerHTML = "";

    items.slice().reverse().forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card";

        const badge = document.createElement("span");
        badge.className = `item-type ${item.type}`;
        badge.textContent = item.type.toUpperCase();

        const title = document.createElement("h3");
        title.textContent = item.title;

        const location = document.createElement("p");
        location.textContent = `📍 ${item.location}`;

        const description = document.createElement("p");
        description.textContent = item.description;

        card.append(badge, title, location, description);
        container.appendChild(card);
    });

    updateStats();
}

function updateStats() {
    const lost = items.filter(item => item.type === "lost").length;
    const found = items.filter(item => item.type === "found").length;

    document.getElementById("lostCount").textContent = lost;
    document.getElementById("foundCount").textContent = found;
    document.getElementById("totalCount").textContent = items.length;
}

const form = document.getElementById("itemForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const newItem = {
            id: Date.now(),
            title: document.getElementById("title").value.trim(),
            type: document.getElementById("type").value,
            location: document.getElementById("location").value.trim(),
            description: document.getElementById("description").value.trim()
        };

        if (!newItem.title || !newItem.location || !newItem.description) {
            document.getElementById("message").textContent =
                "Please fill in all fields.";
            return;
        }

        items.push(newItem);
        saveItems();
        displayItems();

        document.getElementById("message").textContent =
            "Your report was added to this prototype!";

        form.reset();
    });
}

displayItems();
