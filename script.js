document.addEventListener('DOMContentLoaded', () => {
    const listingsPerPage = 8; // Hirdetések száma oldalanként
    let currentPage = 1; // Aktuális oldal

    displayFeaturedListings();

    // Lapozó gombok eseménykezelői
    document.getElementById('prevPageBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayFeaturedListings();
        }
    });

    document.getElementById('nextPageBtn').addEventListener('click', () => {
        const maxPage = Math.ceil(featuredListings.length / listingsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            displayFeaturedListings();
        }
    });

    // Oldalszám gombok eseménykezelői
    document.getElementById('Page1Btn').addEventListener('click', () => {
        currentPage = 1;
        displayFeaturedListings();
    });

    document.getElementById('Page2Btn').addEventListener('click', () => {
        currentPage = 2;
        displayFeaturedListings();
    });

    document.getElementById('Page3Btn').addEventListener('click', () => {
        currentPage = 3;
        displayFeaturedListings();
    });

    function displayFeaturedListings() {
        const featuredListingsSection = document.getElementById('featured-listings');
        const startIndex = (currentPage - 1) * listingsPerPage;
        const endIndex = startIndex + listingsPerPage;
        const listingsToShow = featuredListings.slice(startIndex, endIndex);
        let html = '';
        listingsToShow.forEach((listing, index) => {
            // Csak az első képet jelenítsük meg
            const firstImageSrc = listing.images[0];
            html += `
            <div class="card">
                <div class="listings">
                    <div class="listing" onclick="showDetailedInfo(${index})">
                        <img src="${firstImageSrc}" id="listing-${index}" alt="${listing.location}">
                        <h2>${listing.price} Ft/hó</h2>
                        <p>${listing.location}</p>
                    </div>
                </div>
            </div>
            `;
        });
        featuredListingsSection.innerHTML = html;
        /*addCardClickEvent(); // Kattintás eseménykezelő hozzáadása az új kártyákhoz*/
    }
});

/*document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const listing = Object.fromEntries(queryParams.entries());
    showDetailedInfo(listing);
});*/

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function showLoginPopup() {
    document.querySelector("#loginPopup").style.display = "block";
}

function showRegistrationPopup() {
    document.querySelector("#registerPopup").style.display = "block";
}

function showAdPopup() {
    document.querySelector("#advertisementPopup").style.display = "block";
}

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Példa: egyszerű ellenőrzés
    if (email === "valami@example.com" && password === "titkosjelszo") {
        alert("Sikeres bejelentkezés!");
        // Ide jöhet a további tevékenységek, például a felhasználó beléptetése
    } else {
        alert("Hibás e-mail cím vagy jelszó!");
        // Ide jöhet a hibaüzenet megjelenítése vagy más kezelés
    }
}

function register() {
    var email = document.getElementById("newEmail").value;
    var password = document.getElementById("newPassword").value;

    // Regisztrációs folyamat, pl. hitelesítés és felhasználó hozzáadása az adatbázishoz
    alert("Regisztráció sikeres! Most már be tudsz jelentkezni az új fiókkal.");
}

// A bezárás gomb eseményfigyelője
document.querySelectorAll(".modal-content button").forEach(button => {
    button.addEventListener("click", function(event) {
        event.target.closest(".modal").style.display = "none";
    });
});

// Az ablakon kívüli kattintásra a felugró ablak bezárása
document.addEventListener("click", function(event) {
    // Az eseményt csak akkor kezeljük, ha a kattintás nem történik egy felugró ablakon belül
    const modals = document.querySelectorAll(".modal");
    const buttons = document.querySelectorAll("button");
    const clickedOutsideModal = !Array.from(modals).some(modal => modal.contains(event.target));
    const clickedOnButton = Array.from(buttons).some(button => button.contains(event.target));
    
    if (clickedOutsideModal && !clickedOnButton) {
        modals.forEach(modal => {
            modal.style.display = "none";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Megállítjuk az űrlap alapértelmezett működését

        // Adatok kiolvasása az űrlapról
        const location = document.getElementById('location').value;
        const minRent = document.getElementById('min-rent').value;
        const maxRent = document.getElementById('max-rent').value;
        const minRooms = document.getElementById('min-rooms').value;
        const maxRooms = document.getElementById('max-rooms').value;
        const furnished = document.getElementById('furnished').value;

        // Keresési feltételek alkalmazása a kártyákra
        displayFilteredCards(location, minRent, maxRent, minRooms, maxRooms, furnished);
    });
});

// home.html
function openDetailedInfoPage(event, index) {
    event.stopPropagation();
    window.open('detailed-info.html?id=' + index, '_blank');
}

// A JavaScript kódban
document.addEventListener('DOMContentLoaded', function() {
    // Az összes kártya elem kiválasztása
    const cards = document.querySelectorAll('.card');

    // Minden kártya elemhez eseménykezelő hozzáadása
    cards.forEach(card => {
        // Az eseménykezelő, ami átirányít a részletes információk oldalra az adott ingatlan azonosítójával
        card.addEventListener('click', function(event) {
            const listingId = parseInt(card.id.split('-')[1]); // Az ingatlan azonosítójának kiolvasása az id attribútumból
            window.location.href = `detailed-info.html?id=${listingId}`; // Átirányítás a részletes információk oldalra az adott ingatlan azonosítójával
        });
    });
});