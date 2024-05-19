const btns = document.querySelectorAll(".store__category-btn");

const changeActiveBtn = (event) => {
  const target = event.target;

  btns.forEach((btn) => {
    btn.classList.remove("store__category-btn--active");
  });

  fetchProductByCategory(target.textContent);

  target.classList.add("store__category-btn--active");
};

btns.forEach((btn) => {
  btn.addEventListener("click", changeActiveBtn);
});

const API_URL = "https://meadow-rounded-willow.glitch.me";

const productList = document.querySelector(".store__list");

const createProductCard = (product) => {
  const productCard = document.createElement("li");
  productCard.classList.add("store__item");
  productCard.innerHTML = `
  <article class="store__product product">
  <img
    src="${API_URL}${product.photoUrl}"
    alt="${product.name}"
    class="product__img"
    width= '388'
    height = '261'
  />

  <h3 class="product__title">${product.name}</h3>

  <p class="product__price">${product.price}&nbsp;₽</p>

  <button class="product__btn--add-cart">Заказать</button>
</article>
  `;

  return productCard;
};

const renderProducts = (products) => {
  productList.textContent = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);

    productList.append(productCard);
  });
};

const fetchProductByCategory = async (category) => {
  try {
    const responce = await fetch(
      `${API_URL}/api/products/category/${category}`
    );

    if (!responce.ok) {
      throw new Error(responce.status);
    }

    const products = await responce.json();

    renderProducts(products);
  } catch (error) {
    console.error(`Fetch error products: ${error}`);
  }
};

fetchProductByCategory("Домики");
