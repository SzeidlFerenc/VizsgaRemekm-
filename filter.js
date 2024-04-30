document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filterForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Az alapértelmezett űrlap elküldésének megakadályozása

        filterListings(); // Szűrés elvégzése

        // Oldal tetejére görgetés a szűrési eredmények megjelenítéséhez
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

function filterListings() {
    const location = document.getElementById('location').value.toLowerCase();
    const minRent = parseInt(document.getElementById('min-rent').value) || 0;
    const maxRent = parseInt(document.getElementById('max-rent').value) || Infinity;
    const minRooms = parseInt(document.getElementById('min-rooms').value) || 0;
    const maxRooms = parseInt(document.getElementById('max-rooms').value) || Infinity;

    const filteredListings = featuredListings.filter(listing => {
        const locationMatch = listing.location.toLowerCase().includes(location);
        const rentMatch = listing.price >= minRent && listing.price <= maxRent;
        const roomsMatch = listing.rooms >= minRooms && listing.rooms <= maxRooms;

        return locationMatch && rentMatch && roomsMatch;
    });

    displayFilteredResults(filteredListings);

    // Ha nincs szűrt eredmény, jelezd valahogy a felhasználónak
    if (filteredListings.length === 0) {
        alert("Nincs találat a keresési feltételek alapján.");
    }

    // Töröljük el a lapozó gombokat
    const pagination = document.getElementById('pagination');
    pagination.parentNode.removeChild(pagination);
}

function displayFilteredResults(listings) {
    const featuredListingsSection = document.getElementById('featured-listings');
    let html = '';
    listings.forEach((listing, index) => {
        const firstImageSrc = listing.images[0];
        html += `
            <div class="card" data-index="${index}" data-id="${listing.id}" data-rent="${listing.price}" data-rooms="${listing.rooms}">
                <div class="listings">
                    <div class="listing">
                        <img src="${firstImageSrc}" class="listing-img" alt="${listing.location}">
                        <h2>${listing.price} Ft/hó</h2>
                        <p>${listing.location}</p>
                    </div>
                </div>
            </div>
        `;
    });
    featuredListingsSection.innerHTML = html;

    // Az onclick eseménykezelőket újra hozzáadjuk a kártyákhoz
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const id = card.dataset.id;
        card.addEventListener('click', () => {
            openDetailedInfoPage(id);
        });
    });
}

// Megnyitja az adott hirdetés részletes információit az új lapban
function openDetailedInfoPage(id) {
    window.open(`detailed-info.html?id=${id}`, '_blank');
}
