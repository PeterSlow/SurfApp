
//API Open weather
const key = "82005d27a116c2880c8f0fcb866998a0";
const keyStormGlass = "f49eab1c-6f41-11ed-bce5-0242ac130002-f49eaba8-6f41-11ed-bce5-0242ac130002";
//Capturar los elementos en DOM
let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.querySelector(".min");
let max = document.querySelector(".max");
let data;
let url;
let ciudades = [{ nombre: "Roma" }, { nombre: "Paris" }, { nombre: "Moscu" }, { nombre: "China" }, { nombre: "Mexico" }];
let selectCiudades = document.getElementById("ciudades");
let defaultOption = document.createElement("option");
defaultOption.text = "Elija ciudad";
selectCiudades.add(defaultOption);
selectCiudades.selectedIndex = 0;

//Creacion del select
ciudades.forEach(ciudad => {
  let option = document.createElement("option")
  option.value = ciudad.nombre;
  option.textContent = ciudad.nombre;
  selectCiudades.appendChild(option);
});


//Declarar las funciones
const displayBackgroundImage = (obj) => {
  //Extraer la hora del objeto que contiene el tiempo
  let dateSpanish = new Date(obj.dt * 1000).toLocaleString("es-ES", {
    timeStyle: "short",
    dateStyle: "medium"

  });
  date.textContent = `${dateSpanish}`

  //Extraer hora
  const dayHour = new Date(obj.dt * 1000).getHours();


  if (dayHour > 6 && dayHour < 18) {
    container.classList.remove("night");
    container.classList.add("day")
  } else {
    container.classList.remove("day");
    container.classList.add("night")
  }
}

const displayData = (obj) => {
  //Obtener temperatura redondeando hacia abajo
  temperatureDegrees.textContent = Math.floor(obj.main.temp);
  timeZone.textContent = obj.name;

  //Obtener icono
  const icon = obj.weather[0].icon;
  weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`
  //Obtener temperatura maxima y minima hacia abajo
  max.textContent = Math.floor(obj.main.temp_max);
  min.textContent = Math.floor(obj.main.temp_min);
  //Conseguir estado del tiempo y poner la primera en mayuscula
  temperatureDescription.textContent = obj.weather[0].description.charAt(0).toUpperCase() +
    obj.weather[0].description.slice(1);

}

//Añadir a favoritos
timeZone.addEventListener("click", async (e) => {

  let favoritos = [];
  if (!localStorage.getItem("favoritos") || JSON.parse(localStorage.getItem("favoritos")).length == 0) {
    let favs = new Array(timeZone.textContent);
    localStorage.setItem("favoritos", JSON.stringify(favs));
    favoritos = JSON.parse(localStorage.getItem("favoritos"));

  }

  favoritos = JSON.parse(localStorage.getItem("favoritos"));
  console.log(favs);

  let posicion = favoritos.findIndex(function (e) {
    if (e == timeZone.innerText) {
      return e;
    }
  });

  let aux = [];
  console.log(favoritos);
  favoritos.forEach(favorito => {
    if (favorito != timeZone.innerText) {
      aux.push(favorito);
    }

  });
  favoritos = aux;
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  /**if (posicion > -1) {
    favoritos.splice(posicion, 1);
    console.log(favoritos);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  } else {
    favoritos.push(obj.name)
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }**/
});

//Mostrar favoritos
function mostrarFavoritos() {
  let favs = localStorage.getItem("favoritos");
  favoritos = JSON.parse(favs);
  console.log(favoritos);
}
mostrarFavoritos();

//Declarar getWeatherData
async function getWeatherData(city) {
  const apiId = 'e70c3d5825af2cd374fb03f637c3236c';
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric&lang=sp`;

  //fetch
  await fetch(url)
    .then(result => {
      return result.json();
      console.log(result)
    })
    .then(dataJSON => {
      data = dataJSON
      console.log(dataJSON)
    })


  //cambiar fondo según dia/noche
  displayBackgroundImage(data);

  //mostar datos en pantalla*/
  displayData(data);
}

//Obtener datos del select
selectCiudades.addEventListener("change", (ev) => {
  let seleccion = ev.target.value;
  getWeatherData(seleccion);
  console.log(seleccion)
})

/**Obtener ciudad del input**/
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  getWeatherData(searchInput.value)
})

//Al cargar la pagina cargará una ciuidad por defecto
window.onload = () => {
  getWeatherData("Madrid");
}
