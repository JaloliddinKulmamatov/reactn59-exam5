const container = document.querySelector(".container .cards");
const loading = document.querySelector(".loading");

init();

async function fetchData(api) {
    let data = await fetch(api)
    data 
    .json()
    .then(res => createCard(res.products))
    .catch(err => console.log(err))
    .finally(() => {
        loading.style.display = "none"
    })
}

async function init() {
  checkToken();
  try {
    loading.style.display = "block"; 
    const products = await fetchProducts(); 
    render(products);
  } catch (err) {
    console.error(err);
  } finally {
    loading.style.display = "none"; 
  }
}

function checkToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "http://127.0.0.1:5500/login.html";
  }
}

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return products;
}

function render(products) {
  products.forEach(function(product) {
    let card = document.createElement("div");
    card.classList.add("wrapper__card");
    card.innerHTML = `
      <div class="wrapper__card__top">
        <img src="${product.image}" alt="abc">
      </div>
      <div class="wrapper__card__button">
        <h3>${product.title.slice(0,20)}</h3>
        <span>
        <p class="price">${product.price}$ </p>
        <span class="rating">${"⭐️".repeat(Math.round(product.rating.rate))}</span>
        <p class="rating">[${product.rating.count}]</p>
        </span>
      </div>`;
    container.appendChild(card);

    card.addEventListener("click", () => singleRoute(product.id));
  });
}

function singleRoute(id) {
  window.open(`product.html?id=${id}`, "_self");
}
