

let catesCont = document.querySelector(".filters  .cates-cont");

let sortSelect = document.querySelector(".sel-box select");

sortSelect.oninput = refreshPage;






refreshPage();


function refreshPage() {


            
    const urlParams = new URLSearchParams(window.location.search);
        
    let valSrch = urlParams.get("val") ;


    fetch(`../php/products/search.php?sort=${sortSelect.value}&val=${valSrch}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {


            console.log(data)

            let pagenums = Math.ceil(data.length / 12)

            NumForOnePage =12;
        
            const urlParams = new URLSearchParams(window.location.search);
        
            let currPage = urlParams.has("page") ? urlParams.get('page') :1 ;
        
        
            let firstPro = ( NumForOnePage * (currPage-1));
            let lastPro = firstPro + NumForOnePage;
        
        
            let productsContent = document.getElementById("products-content");



            
            let numsSpans = document.querySelector(".products-page .main .page-num .nums");
            numsSpans.innerHTML = "";
            for (let i = 1; i <= pagenums; i++) {
                numsSpans.innerHTML += `<span ${currPage == i ? "class='active' " : ""} data-pgnum="${i}" >${i}</span>`;
            }



            productsContent.innerHTML = "";



            data.slice(firstPro,lastPro).forEach((ele) => {
                productsContent.innerHTML += `
              <div class="one-pro" data-pro_id=${ele['pro_id']}>
              <a href="product.html?pro_id=${ele['pro_id']}" class="img">
                <img src="../Uploads/products_images/${ele['path']}" alt="Product Image">
              </a>
              <div class="name-line">
                <a href="product.html?pro_id=${ele['pro_id']}" class="name">${ele['pro_name']}</a>
                ${+ele['stock'] == 0 ?
                        "<div class='stock out'>Out Of Stock</div>" :
                        +ele['stock'] <= 3 ?
                            `<div class='stock rem'>${ele['stock']} piece${ele['stock'] == 1 ? "" : "s"} Left</div>` :
                            +ele['stock'] > 3 ?
                                "<div class='stock in'>In Stock</div>" : ""
                    }
              </div>
              <div class="desc">
                <p>${ele['disc']}</p>
              </div>
              <div class="price-line">
                <span class="curr">$</span>
                <span class="price">${ele['price']}</span>
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

            
function appendUrl(key, val) {
    const urlParams = new URLSearchParams(window.location.search);
    let Pars = [];
    let urlKeys = [...urlParams.keys()];
    let value = "";

    let exist = false;

    urlKeys.forEach((ele) => {

        if (ele == "catid" || ele == "subcatid") {
            return false;
        }

        if (ele == key) {
            exist = true;
        }

        Pars.push(`${ele}=${ele == key ? val : urlParams.get(ele)}`);

    })

    if (!exist) {
        Pars.push(key + "=" + val);
    }



    Pars = "?" + Pars.join("&");


    let refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + Pars;
    window.history.pushState({ path: refresh }, '', refresh);

}








            


            let pagesNumSapns =document.querySelectorAll(".products-page .main .page-num .nums span");
            pagesNumSapns.forEach((ele)=>{
                ele.onclick=()=>{
                    appendUrl("page",ele.dataset.pgnum);
                    refreshPage();
                }
            });

            let prevBtn = document.getElementById("prev-page-btn");
            let nextBtn = document.getElementById("next-page-btn");

            prevBtn.onclick=()=>{
                if(currPage>1)
                {
                    appendUrl("page",parseInt(currPage)-1);
                    refreshPage();
                }
            }


            nextBtn.onclick=()=>{
                if(currPage<pagenums)
                {
                    appendUrl("page",parseInt(currPage)+1);
                    refreshPage();
                }
            }

            



        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });


}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-cart-btn")) {



        fetch("../php/cart/add_item_cart.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `pro_id=${e.target.parentElement.parentElement.parentElement.dataset.pro_id}&quant=1`
        })

            .then(response => response.text())
            .then(data => {
                console.log(data);
                if (data.trim() == "notUser") {
                    window.location.href = "../pages/signin.html";
                }
                else {
                    if (data.trim() == "added" || data.trim() == "exist") {
                        refreshNumCart();
                        e.target.parentElement.classList.add("added");
                        setTimeout(() => {
                            e.target.parentElement.classList.remove("added");
                        }, 2000)

                    }
                }

            })
            .catch(error => {
                console.log(error);
            });


    }
})

