var form = document.querySelector(".form");
var move = document.querySelector(".move");
const inputbook = document.querySelector(".inputbook");
const inputaddress = document.querySelector(".inputaddress");
const inputselect = document.querySelector(".inputselect");
const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;

class Bookcase {
  constructor(coords, address, nbook) {
    this.coords = coords;
    this.address = address;
    this.nbook = nbook;
    this.marker = null;
  }
}

class App {
  #map;
  #mapEvent;
  bookcase = [];
  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newBookcase.bind(this));
    move.addEventListener("click", this._move);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];
    console.log(this);
    this.map = L.map("map").setView(coords, 12);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Fetch API - GET Request
    const fetchGetRequest = async (url, func) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        return func(json);
      } catch (error) {
        console.log(error.message);
      }
    };
    const allbookcasetomap = (json) => {
      json.forEach((bookcase) => {
        this._renderbookcase(bookcase);
        const coordinates = bookcase.point.coordinates;
        const latlng = L.latLng(coordinates[1], coordinates[0]);

        const marker = L.marker(latlng).bindPopup(bookcase.book_type);
        this.markers.addLayer(marker); // Add marker to the cluster group

        marker.on("click", () => {
          // Handle marker click event
        });
      });

      this.map.addLayer(this.markers); // Add the cluster group to the map
    };

    // ...

    fetchGetRequest("api/v1/bookcase/all", allbookcasetomap);
    form.classList.add("hide");
    this.map.on("click", this._showForm.bind(this));
    this.markers = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
    });
    this.map.addLayer(this.markers);
  }

  _showForm(mapE) {
    this.mapEvent = mapE;
    form.classList.remove("hide");
  }

  _newBookcase(e) {
    e.preventDefault(); // Prevent form submission and page reload

    // Fetch API request
    let marker;
    const nbook = +inputbook.value;
    const address = inputaddress.value.trim();
    const select = inputselect.value;
    // Create a new instance of the Bookcase class with the provided values

    // Check if number of books is positive
    if (!Number.isFinite(nbook) || nbook <= 0) {
      alert("Number of books should be a positive number!");
      return;
    }

    // Check if address is filled
    if (address === "") {
      alert("Address field should be filled!");
      return;
    }

    const { lat, lng } = this.mapEvent.latlng;
    const bookcase = new Bookcase([lat, lng], address, nbook);
    bookcase.select = select;
    // Set the latitude and longitude values
    document.getElementById("inputLatitude").value = lat;
    document.getElementById("inputLongitude").value = lng;
    fetch("api/v1/addbookcase/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken, // Include the CSRF token in the headers
      },
      body: JSON.stringify(bookcase),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.success) {
          alert(data.message); // Display success message
          L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(
              L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
              })
            )
            .setPopupContent(`${bookcase.select}`)
            .openPopup();
          bookcase.marker = marker;

          this.bookcase.push(bookcase);
          this._renderbookcase(bookcase);
          // Clear input values
          inputbook.value = "";
          inputaddress.value = "";
          inputselect.value = "";
        } else {
          alert(
            "There is a bookcase within 1000 meters. Please choose a different location."
          ); // Display error message
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again."); // Display error message
      });
  }

  _renderbookcase(bookcase) {
    let html = `
         <div class="card" >
            <div class="card-header">
               <span>📚  A ${
                 bookcase.book_type != null
                   ? bookcase.book_type
                   : bookcase.select
               } </span>
           </div>
           <ul class="list-group list-group-flush">
              <li class="list-group-item">
                 <span> 📍 Location:${bookcase.address}</span>
              </li>
            </ul>
         </div>
        
       
        `;
    form.insertAdjacentHTML("afterend", html);
  }
}
const app = new App();
