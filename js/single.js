const loading = document.querySelector(".loading");
  
    
    init();

  
    async function init() {
      const productId = getId();
      const product = await fetchProduct(productId);
      console.log(product)

      renderProduct(product) // {}
    }

    function getId() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");

      return id;
    }

    async function fetchProduct(id) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const result = await response.json();

      return result;
    }

    function renderProduct(product) {
      const div = document.querySelector(".div");

      const span1 = document.querySelector(".span1");
      const span2 = document.querySelector(".span2");

      const img = document.createElement("img");
      img.src = product.image;
      span1.append(img);

      const title = document.createElement("h1");
      title.textContent = product.title;
      span2.append(title);


      const stars = "<span>⭐️</span>".repeat(Math.round(product.rating.rate));
      span2.insertAdjacentHTML("beforeend",stars);

      const ratingCount = document.createElement("span");
      ratingCount.textContent = `(${product.rating.count})`;
      span2.append(ratingCount);
       


      const price = document.createElement("h1");
      price.textContent = product.price;
      span2.append(price);

      const description = document.createElement("p");
      description.textContent = product.description;
      span2.append(description);


    }