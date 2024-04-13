document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    if (!isNaN(id)) {
        const selectedListing = featuredListings.find(item => item.id === id);

        if (selectedListing !== undefined) {
            const detailedInfoContainer = document.getElementById('detailed-info');

            // Kép és lapozó megjelenítése
            detailedInfoContainer.innerHTML = `
                <div id="image-container">
                    <img id="current-image" src="${selectedListing.images[0]}" alt="${selectedListing.location}" class="listing-image">
                </div>
                <div id="buttons-container">
                    <button id="prev-btn">Előző</button>
                    <button id="next-btn">Következő</button>
                </div>
                <div id="listing-details" style="text-align: left">
                    <h2 style="text-align: center">Ár: ${selectedListing.price} Ft</h2>
                    <table>
                        <tr>
                            <td>Helyszín: </td> 
                            <th> ${selectedListing.location}</th> 
                        </tr>
                        <tr>
                            <td>Épület típusa:</td> 
                            <th>${selectedListing.buildingType}</th>
                        </tr>
                        <tr>
                            <td>Kaució:</td> 
                            <th>${selectedListing.deposit} Ft</th>
                        </tr>
                        <tr>
                            <td>Rezsi költség: </td>
                            <th>${selectedListing.utilityCost} Ft</th>
                        </tr>
                        <tr>
                            <td>Fűtés: </td>
                            <th>${selectedListing.heating}</th>
                        </tr>
                        <tr>
                            <td>Berendezés: </td>
                            <th>${selectedListing.furnishing}</th>
                        </tr>
                        <tr>
                            <td>Szobák száma: </td>
                            <th>${selectedListing.rooms}</th>
                        </tr>
                        <tr>
                            <td>Emelet:</td>
                            <th>${selectedListing.floor}</th>
                        </tr>
                        <tr>    
                            <td>Kilátás: </td>
                            <th>${selectedListing.view}</th>
                        </tr>
                        <tr>
                            <td>Erkély: </td>
                            <th>${selectedListing.balconies}</th>
                        </tr>
                        <tr>
                            <td>Amerikai konyha: </td>
                            <th>${selectedListing.openKitchen ? 'Igen' : 'Nem'}</th>
                        </tr>
                    </table>
                </div>
            `;
            
            // Lapozó funkciók
            const prevButton = document.getElementById('prev-btn');
            const nextButton = document.getElementById('next-btn');
            const currentImage = document.getElementById('current-image');
            let currentImageIndex = 0;

            prevButton.addEventListener('click', showPrevImage);
            nextButton.addEventListener('click', showNextImage);

            function showPrevImage() {
                currentImageIndex = (currentImageIndex - 1 + selectedListing.images.length) % selectedListing.images.length;
                currentImage.src = selectedListing.images[currentImageIndex];
                currentImage.alt = selectedListing.location;
            }

            function showNextImage() {
                currentImageIndex = (currentImageIndex + 1) % selectedListing.images.length;
                currentImage.src = selectedListing.images[currentImageIndex];
                currentImage.alt = selectedListing.location;
            }
        } else {
            console.error('Nincs megfelelő adat az id alapján.');
        }
    } else {
        console.error('Nincs id a query paraméterben, vagy az nem érvényes szám.');
    }
});
