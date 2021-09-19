//obtiene la referencia al contenedor main
const main = document.querySelector(".main");
const generos_select = document.querySelector("generos_select");
var año = [];
var datos = [];

/* consigue el listado de generos */
fetch(
  genres_list_http +
    new URLSearchParams({
      api_key: api_key,
      language:'es'
      
    })+año
)
  .then((res) => res.json())
  .then((data) => {

      datos= data.genres;
      construirTitulosCategoria(data.genres);
     
      fetchListaPeliculasPorGenero(datos);

  })

function getval(element){
  main.innerHTML=""
  
  let datosFiltrados = datos.filter(genero => genero.id == element.value);
  fetchListaPeliculasPorGenero(element.value==-1?genresConstan: datosFiltrados);
  
}
function selectAnios() 
{ 
  select = document.getElementById("anios");
  var papu;
  papu = document.Veranios.años[document.Veranios.años.selectId]
  var selected = document.Veranios.años[document.Veranios.años.selected]
  if (papu) {
    año = "";
  } else {
    año = text_año+selected;
    generos();
  }
}

const fetchListaPeliculasPorGenero = (genres) => {
  
  genres.forEach((item) => {
  fetch(
    movie_genres_http +
      new URLSearchParams({
        api_key: api_key,
        with_genres: item.id,
        page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
        language: 'es'
      })+año
  )
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
     
      construirElementoCategoria(`${item.name}_movies`, data.results);
 
      
      
    })
    .catch((err) => console.log(err));
  });
};


/* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
  main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};

const construirTitulosCategoria = (generos) => {
  
  const select = document.getElementById("generos_select");
    generos.forEach(op => {
      let option = document.createElement("option");
    option.text = op.name;
    option.value = op.id;
    select.add(option);
    
    });
 

};





const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};
const genresConstan = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]
const construiCategoriaPopular = (category, data) => {
  main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">Mas populares</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};
