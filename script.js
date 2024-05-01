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

    if (email === "feri2727@gmail.com" && password === "123456") {
        alert("Sikeres bejelentkezés!");
    } else {
        alert("Hibás email cím vagy jelszó!");
    }
}

function register() {
    var name = document.getElementById("newName").value;
    var email = document.getElementById("newEmail").value;
    var password = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Ellenőrzés, hogy minden mező ki legyen töltve
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert("Minden mező kitöltése kötelező!");
        return;
    }

    // Ellenőrzés, hogy az email cím megfelelő formátumú-e
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Helytelen formátumú email cím!");
        return;
    }

    // Ellenőrzés, hogy a jelszavak egyeznek-e
    if (password !== confirmPassword) {
        alert("Nem egyező jelszavak!");
        return;
    }

    // Ellenőrzés, hogy a felhasználó már regisztrálva van-e
    if (email === "feri2727@gmail.com") {
        alert("Ez a felhasználó már regisztrálva van, jelentkezzen be vele!");
        return;
    }

    // Ha minden ellenőrzés sikeres, akkor sikeres regisztráció üzenet
    alert("Sikeres regisztráció!");
}

function submitAdvertisement() {
    // Szükséges adatok összegyűjtése az űrlapból
    var adType = document.getElementById("adType").value;
    var size = document.getElementById("size").value;
    var rent = document.getElementById("rent").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("adEmail").value;
    var phone = document.getElementById("phone").value;

    // Ellenőrzés, hogy minden szükséges mező ki legyen töltve
    if (size.trim() === '' || rent.trim() === '' || name.trim() === '' || email.trim() === '' || phone.trim() === '') {
        alert("Minden mező kitöltése kötelező!");
        return;
    }

    // Ellenőrzés, hogy az email cím megfelelő formátumú-e
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Hibás email cím formátum!");
        return;
    }

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
