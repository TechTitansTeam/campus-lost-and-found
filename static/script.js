document.addEventListener("DOMContentLoaded", () => {
    const itemForm = document.getElementById("itemForm");
    const searchInput = document.getElementById("searchInput");

    // Handle form submission (Add Item)
    if (itemForm) {
        itemForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const newItem = {
                title: document.getElementById("title").value,
                type: document.getElementById("type").value,
                location: document.getElementById("location").value,
                description: document.getElementById("description").value
            };

            const response = await fetch("/api/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                alert("Posted successfully! Redirecting to Live Feed...");
                window.location.href = "/feed"; // Redirect to feed page to see new item
            }
        });
    }

    // Live Instant Search Filter
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const items = document.querySelectorAll(".item-card");

            items.forEach(card => {
                const title = card.getAttribute("data-title") || "";
                const location = card.getAttribute("data-location") || "";
                const desc = card.getAttribute("data-desc") || "";

                if (title.includes(query) || location.includes(query) || desc.includes(query)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});