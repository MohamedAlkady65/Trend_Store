

let catesCont = document.querySelector(".filters  .cates-cont");

let sortSelect = document.querySelector(".sel-box select");

sortSelect.oninput = refreshPage;

catesCont.innerHTML = `                        <li class="one-cate">
<div class="cate-head">
    <a href="" id="reset-cates" class="cate-name">All</a>
</div>
</li>`;

fetch(`../php/home/cates_subcates.php`)
    .then((response) => response.json())
    .then((data) => {

        let subcates = "";

        console.log(data);

        data.forEach((ele) => {

            if (ele['sub_cates'].length == 0)
                return;

            subcates = "";

            ele['sub_cates'].forEach((el) => {
                subcates += `
                <li class="one-sub-cate">
                <a href="" data-urlpara = 'subcatid=${el['subcat_id']}' class="sub-cate-name btn-refresh-products">${el['subcat_name']}</a>
            </li>
                `
            })


            catesCont.innerHTML += `
            <li class="one-cate">
            <div class="cate-head">
                <a href="" data-urlpara = 'catid=${ele['cat_id']}' class="cate-name btn-refresh-products">${ele['cat_name']}</a>
                <i class="fa-sharp fa-solid fa-chevron-down drop-cate-btn"></i>
            </div>
            <ul class="sub-cates-cont">
            ${subcates}
            </ul>
        </li>

            `

        })




        let dropBtns = document.querySelectorAll(".filters  .drop-cate-btn");
        dropBtns.forEach((ele) => {
            ele.onclick = () => {
                let num = ele.parentElement.nextElementSibling.childElementCount

                if (ele.parentElement.parentElement.classList.contains("active")) {
                    ele.parentElement.nextElementSibling.style.height = (30 * num + ((num - 1) * 5) + 10) + "px";
                    ele.parentElement.parentElement.classList.remove("active")
                    ele.parentElement.nextElementSibling.classList.remove("active");
                    setTimeout(() => {
                        ele.parentElement.nextElementSibling.style = "";
                    }, 0)
                }
                else {
                    ele.parentElement.parentElement.classList.add("active")
                    ele.parentElement.nextElementSibling.style.height = (30 * num + ((num - 1) * 5) + 10) + "px";
                    ele.parentElement.nextElementSibling.classList.add("active");

                    setTimeout(() => {
                        ele.parentElement.nextElementSibling.style = "";
                    }, 500)

                }



            }
        })

        let btnsRefresh = document.querySelectorAll(".btn-refresh-products");
        btnsRefresh.forEach((ele) => {
            ele.onclick = (e) => {
                e.preventDefault();

                let dataset = ele.dataset.urlpara.split("=");

                appendUrl(dataset[0], dataset[1]);

                refreshPage();

                return false
            }
        })

        let resetBtn = document.getElementById("reset-cates");

resetBtn.onclick=(e)=>{
    e.preventDefault();
    restCateUrl();
    refreshPage();
    return false
}

console.log(resetBtn)


    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });








refreshPage();


function refreshPage() {




    let productsContent = document.getElementById("products-content");


    fetch(`../php/products/products.php?sort=${sortSelect.value}&${window.location.search.slice(1)}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {



            let pagenums = Math.ceil(data.length / 12)

            NumForOnePage =12;

            const urlParams = new URLSearchParams(window.location.search);

            let currPage = urlParams.has("page") ? urlParams.get('page') :1 ;


            let firstPro = ( NumForOnePage * (currPage-1));
            let lastPro = firstPro + NumForOnePage;

            
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

        document.documentElement.scrollTop=0


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



            
function restCateUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let Pars = [];
    let urlKeys = [...urlParams.keys()];
    let value = "";

    let exist = false;

    urlKeys.forEach((ele) => {

        if (ele == "catid" || ele == "subcatid") {
            return false;
        }

        Pars.push(`${ele}=${urlParams.get(ele)}`);

    })




    Pars = "?" + Pars.join("&");


    let refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + Pars;
    window.history.pushState({ path: refresh }, '', refresh);

}


