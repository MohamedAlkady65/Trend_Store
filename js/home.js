fetch(`../php/general/getsession.php`, {})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

let popularContent = document.querySelector(".popular .container .products");

fetch(`../php/home/popular_home.php`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    popularContent.innerHTML = "";

    data.forEach((ele) => {
      popularContent.innerHTML += `
            <div class="one-pro" data-pro_id=${ele["pro_id"]}>
            <a href="product.html?pro_id=${ele["pro_id"]}" class="img">
              <img src="../Uploads/products_images/${
                ele["path"]
              }" alt="Product Image">
            </a>
            <div class="name-line">
              <a href="product.html?pro_id=${ele["pro_id"]}" class="name">${
        ele["pro_name"]
      }</a>
              ${
                +ele["stock"] == 0
                  ? "<div class='stock out'>Out Of Stock</div>"
                  : +ele["stock"] <= 3
                  ? `<div class='stock rem'> ${ele["stock"]} piece${
                      ele["stock"] == 1 ? "" : "s"
                    } Left</div>`
                  : +ele["stock"] > 3
                  ? "<div class='stock in'>In Stock</div>"
                  : ""
              }
            </div>
            <div class="desc">
              <p>${ele["disc"]}</p>
            </div>
            <div class="price-line">
              <span class="curr">$</span>
              <span class="price">${ele["price"]}</span>
            </div>
            <div class="add">
            <div class="add-cart">
              <i class="fa-solid fa-cart-shopping"></i>
              <span class="text"> Add to Cart</span>
              <div class="added-text">
              <i class="fa-regular fa-circle-check"></i>
              <span>Added Successfully</span> 
              </div>
              <div class='add-cart-btn'></div>
            </div>
          </div>
        </div>
  
            `;
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

let categoriesContent = document.querySelector(".categories .container");

fetch(`../php/home/get_cates_home.php`, {
  method: "GET",
})
  .then((response) => response.text())
  .then((data) => {
    categoriesContent.innerHTML = "";

    data = data.slice(0, data.lastIndexOf("]") + 1);
    data = JSON.parse(data);

    data.forEach((ele) => {
      let productsData = "";

      if (ele["products"].length == 0) return false;

      ele["products"].forEach((ele) => {
        productsData += `
        <div class="one-pro" data-pro_id=${ele["pro_id"]}>
        <a href="product.html?pro_id=${ele["pro_id"]}" class="img">
                  <img src="../Uploads/products_images/${
                    ele["path"]
                  }" alt="Product Image">
                </a>
                <div class="name-line">
                  <a href="product.html?pro_id=${ele["pro_id"]}" class="name">${
          ele["pro_name"]
        }</a>
                  ${
                    +ele["stock"] == 0
                      ? "<div class='stock out'>Out Of Stock</div>"
                      : +ele["stock"] <= 3
                      ? `<div class='stock rem'>${ele["stock"]} piece${
                          ele["stock"] == 1 ? "" : "s"
                        } Left</div>`
                      : +ele["stock"] > 3
                      ? "<div class='stock in'>In Stock</div>"
                      : ""
                  }
                </div>
                <div class="desc">
                  <p>${ele["disc"]}</p>
                </div>
                <div class="price-line">
                  <span class="curr">$</span>
                  <span class="price">${ele["price"]}</span>
                </div>
                <div class="add">
                  <div class="add-cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="text"> Add to Cart</span>
                    <div class="added-text">
                    <i class="fa-regular fa-circle-check"></i>
                    <span>Added Successfully</span> 
                    </div>
                    <div class='add-cart-btn'></div>
                  </div>
                </div>
              </div>
      
                `;
      });

      categoriesContent.innerHTML += `
            
        
        <div class="cat">

        <div class="cat-header">
          <h3>${ele["cat_name"]}</h3>
          <a href="products.html?catid=${ele["cat_id"]}" class="fa-sharp fa-regular fa-angles-right">See More</a>
        </div>

        <div class="parent">

          <i class="fas fa-regular fa-angle-left  pre-cat"></i>

          <div class="slider">

            <div class="main">
            ${productsData}
            </div>

          </div>

          <i class="fas fa-regular fa-angle-right next-cat"></i>
        </div>



      </div>
    </div>



            `;
    });

    let oneProCat = document.querySelector(".categories .container .one-pro");
    let nextCat = document.querySelectorAll(".next-cat");
    let preCat = document.querySelectorAll(".pre-cat");

    nextCat.forEach((ele) => {
      ele.onclick = () => {
        let par = ele.parentElement.getBoundingClientRect().right;
        let last =
          ele.previousElementSibling.firstElementChild.lastElementChild.getBoundingClientRect()
            .right;

        if (last > par) {
          let curTra = parseFloat(
            ele.previousElementSibling.firstElementChild.style.translate || 0
          );
          curTra -= oneProCat.offsetWidth + 12;
          ele.previousElementSibling.firstElementChild.style.translate =
            curTra + "px";
        }
      };
    });

    preCat.forEach((ele) => {
      ele.onclick = () => {
        let curTra = parseFloat(
          ele.nextElementSibling.firstElementChild.style.translate || 0
        );
        curTra += oneProCat.offsetWidth + 12;
        if (curTra <= 0)
          ele.nextElementSibling.firstElementChild.style.translate =
            curTra + "px";
      };
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart-btn")) {
    fetch("../php/cart/add_item_cart.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `pro_id=${e.target.parentElement.parentElement.parentElement.dataset.pro_id}&quant=1`,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data.trim() == "notUser") {
          window.location.href = "../pages/signin.html";
        } else {
          if (data.trim() == "added" || data.trim() == "exist") {
            refreshNumCart();
            e.target.parentElement.classList.add("added");
            setTimeout(() => {
              e.target.parentElement.classList.remove("added");
            }, 2000);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
