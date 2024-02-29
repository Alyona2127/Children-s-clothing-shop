const items = [
    {
      title: "Куртка стеганая на синтепоне",
      description: "Модная и стильная демисезонная куртка премиум качества",
      tags: ["boy", "girl"],
      price: 4700,
      img: "./img/jacket.png",
      rating: 5.0,
    },
    {
      title: "Платье льняное",
      description: "Винтажное льняное платье с воротничком",
      tags: ["girl"],
      price: 2500,
      img: "./img/dress.jpg",
      rating: 4.9,
    },
    {
      title: "Лонгслив тельняшка",
      description: "Лонгслив оверсайз выполнен из мягкого и плотного премиального хлопка",
      tags: ["girl"],
      price: 1300,
      img: "./img/jumper.jpg",
      rating: 2.6,
    },
    {
      title: "Лонгслив детский оверсайз",
      description: "Лонгслив выполнен из хлопка премиального качества с необработанными краями",
      tags: ["boy", "girl"],
      price: 1040,
      img: "./img/long.png",
      rating: 4.7,
    },
    {
      title: "Фуфайка",
      description: "Фуфайка из дышащего трикотажа с длинными рукавами - это идеальный выбор для занятий спортом",
      tags: ["boy"],
      price: 1100,
      img: "./img/long-boy.jpg",
      rating: 3.9,
    },
    {
      title: "Пижама детская",
      description: "Пижама детская выполнена из мягкого и дышащего хлопка качества пенье",
      tags: ["boy", "girl"],
      price: 1060,
      img: "./img/pajamas.jpg",
      rating: 4.2,
    },
    {
      title: "Летний костюм с шортами",
      description: "Ребенок будет чувствовать себя комфортно во время прогулок и активных игр",
      tags: ["boy"],
      price: 950,
      img: "./img/shorts.jpg",
      rating: 2.9,
    },
    {
      title: "Спортивный костюм",
      description: "Одной из главных особенностей этого костюма является его теплота и мягкость",
      tags: ["girl"],
      price: 1030,
      img: "./img/sports-suit.jpg",
      rating: 3.4,
    },
    {
      title: "Спортивный костюм",
      description: "Изготовленный из ленкого и дышащего материала, костюм обеспечивает комфорт и свободу движений",
      tags: ["boy"],
      price: 1500,
      img: "./img/suit.jpg",
      rating: 4.8,
    },
    {
      title: "Джоггеры кожаные",
      description: "Джоггеры ждя мальчика премиум класса, отлично держат форму",
      tags: ["boy"],
      price: 2400,
      img: "./img/trousers-boy.jpg",
      rating: 3.2,
    },
    {
      title: "Брюки кожаные",
      description: "Брюки удобны при эксплуатации и долго служат",
      tags: ["girl"],
      price: 2420,
      img: "./img/trousers-girl.png",
      rating: 4.1,
    },
    {
      title: "Жилетка утепленная",
      description: "Жилетка является идеальным верхним слоем в прохладную погоду для чудесных прогулок",
      tags: ["boy", "girl"],
      price: 800,
      img: "./img/vest.jpg",
      rating: 3.2,
    },
  ];

  let currentState = [...items];

  const itemsContainer = document.querySelector("#shop-items");
  const itemTemplate = document.querySelector("#item-template");
  const nothingFound = document.querySelector("#nothing-found");

  function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
      itemsContainer.append(prepareShopItem(item));
  });

  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }

  if (a.title < b.title) {
    return -1;
  }

  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}P`;
  const ratingContainer = item.querySelector(".rating");
  
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");
  
  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();
  
  currentState = items.filter((el) =>
  el.title.toLowerCase().includes(searchString)
);

  currentState.sort((a, b) => sortByAlphabet(a, b));

  renderItems(currentState);

  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;

  switch (selectedOption) {
    case "expensive": {
      
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
    
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
    
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  
  renderItems(currentState);
});