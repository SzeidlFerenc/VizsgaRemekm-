document.addEventListener('DOMContentLoaded', () => {
    const listingsPerPage = 8; // Hirdetések száma oldalanként
    let currentPage = 1; // Aktuális oldal

    // Kezdeti listák megjelenítése
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
            const displayedIndex = startIndex + index + 1; // Aktuális oldalon lévő hirdetések sorszáma
            const firstImageSrc = listing.images[0];
            html += `
            <div class="card" data-rent="${listing.price}" data-rooms="${listing.rooms}" data-furnished="${listing.furnished}">
                <div class="listings">
                    <div class="listing" onclick="openDetailedInfoPage(${displayedIndex})">
                        <img src="${firstImageSrc}" id="listing-${displayedIndex}" alt="${listing.location}">
                        <h2>${listing.price} Ft/hó</h2>
                        <p>${listing.location}</p>
                    </div>
                </div>
            </div>
            `;
        });
        featuredListingsSection.innerHTML = html;
    }
});

function openDetailedInfoPage(index) {
    // Ellenőrizd, hogy az index érvényes szám-e
    if (!Number.isInteger(index) || index < 0 || index >= featuredListings.length) {
        console.error("Nincs érvényes index.");
        return;
    }

    // A részletek megjelenítése az adott index alapján
    const listing = featuredListings[index];
    console.log("Részletek megjelenítése az index alapján: " + index);
    console.log("Ár: " + listing.price);
    console.log("Szobák száma: " + listing.rooms);
    console.log("Berendezett: " + (listing.furnished ? 'igen' : 'nem'));
    console.log("Aktuális oldal: " + currentPage);

    // Új lap megnyitása az URL átirányítással
    window.open('detailed-info.html?id=' + index, '_blank');
}

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

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "users.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert("Sikeres bejelentkezés!");
                } else {
                    alert(response.message);
                }
            } else {
                alert("Hiba történt a szerverrel való kommunikáció során.");
            }
        }
    };
    var data = "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
    xhr.send(data);
}

function register() {
    var email = document.getElementById("newEmail").value;
    var password = document.getElementById("newPassword").value;

    // Regisztrációs folyamat, pl. hitelesítés és felhasználó hozzáadása az adatbázishoz
    alert("Regisztráció sikeres! Most már be tudsz jelentkezni az új fiókkal.");
}

function submitAdvertisement() {
    // Szükséges adatok összegyűjtése az űrlapból
    var adType = document.getElementById("adType").value;
    var size = document.getElementById("size").value;
    var rent = document.getElementById("rent").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    // Ellenőrzés, hogy minden szükséges mező ki legyen töltve
    if (adType.trim() === '' || size.trim() === '' || rent.trim() === '' || name.trim() === '' || email.trim() === '' || phone.trim() === '') {
        alert("Minden mező kitöltése kötelező!");
        return;
    }

    // Hirdetésfeladás folyamata, például AJAX kérést küldeni a szervernek

    // Esetleges visszajelzés a felhasználónak
    alert("Hirdetés feladva!");
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
