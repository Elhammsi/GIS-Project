var form = document.querySelector('.form');
var map, markers = [];

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const { latitude } = position.coords;
            const { longitude } = position.coords;
            console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
            const coords = [latitude, longitude];
            map = L.map('map').setView(coords, 12);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.on('click', function (mapE) {
                form.classList.remove('hide');
                addMarker(mapE.latlng);
            });
        },
        function () {
            alert('Could not get your position');
        }
    );

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission and page reload

        const inputbook = document.querySelector('.inputbook');
        const inputaddress = document.querySelector('.inputaddress');
        const inputselect = document.querySelector('.inputselect');
        const nselect = +inputbook.value;

        if (!Number.isFinite(nselect) || nselect <= 0) {
            alert('Number of books should be positive!');
            return;
        }

        if (inputaddress.value.trim() === '') {
            alert('Address should be filled!');
            return;
        }

        const { lat, lng } = markers[markers.length - 1].getLatLng();
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                })
            )
            .setPopupContent('Bookcase')
            .openPopup();

        inputbook.value = ''; // Clear the input value for books
        inputaddress.value = ''; // Clear the input value for address
        inputselect.value = ''; // Clear the input value for position

        form.classList.add('hide');
    });

    function addMarker(coords) {
        clearMarkers();
        const marker = L.marker(coords);
        markers.push(marker);
        marker.addTo(map);
    }

    function clearMarkers() {
        markers.forEach(function (marker) {
            marker.remove();
        });
        markers = [];
    }
}
