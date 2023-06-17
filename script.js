var form = document.querySelector(".form");
var move = document.querySelector(".move");
const inputbook = document.querySelector(".inputbook");
const inputaddress = document.querySelector(".inputaddress");
const inputselect = document.querySelector(".inputselect");
const nbook = +inputbook.value;
const address = inputaddress.value.trim();
const select = inputselect.value;

class Bookcase {
  constructor(coords, address, nbook) {
    this.coords = coords;
    this.address = address;
    this.nbook = nbook;
  }
}

class App {
  #map;
  #mapEvent;
  #bookcase = [];
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
    this.#map = L.map("map").setView(coords, 12);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hide");
  }

  _newBookcase(e) {
    e.preventDefault(); // Prevent form submission and page reload

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

    const { lat, lng } = this.#mapEvent.latlng;
    const bookcase = new Bookcase([lat, lng], address, nbook);
    bookcase.select = select;
    L.marker([lat, lng])
      .addTo(this.#map)
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

    form.classList.add("hide");

    this.#bookcase.push(bookcase);
    this._renderbookcase(bookcase);
    // Clear input values
    inputbook.value = "";
    inputaddress.value = "";
    inputselect.value = "";
  }
  _renderbookcase(bookcase) {
    let html = `
        
         <div class="card" >
            <div class="card-header">
               <span>📚  A ${bookcase.select} </span>
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
  _move(e) {
    const moveEl = e.target.closest(".card");
    if (!moveEl) return;
  }
}
const app = new App();
