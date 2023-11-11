let catBtn=document.querySelector(".cat-link i");
let catList=document.querySelector(".cat-link .cat-list");
let menuBtn=document.querySelector(".menu-btn");
let menuList=document.querySelector(".header .down");
let over = document.querySelector(".over-header");


menuBtn.onclick =()=>{
    menuList.classList.add("active");
    over.classList.add("active");
}

over.onclick=()=>{
    menuList.classList.remove("active");
    over.classList.remove("active");
    catList.classList.remove("act");

}

catBtn.onclick =()=>{
    catList.classList.toggle("act");
}

document.onclick=(e)=>{
    if(!e.target.classList.contains("cat-link")&&!e.target.classList.contains("cat-link-text"))
    {
        catList.classList.remove("active");
    }
}


let cartBtn  = document.querySelector(".cart-btn");
let accountBtn  = document.querySelector(".account-btn");

cartBtn.onclick=checkSession;
accountBtn.onclick=checkSession;

function checkSession(e){
    fetch(`../php/general/getsession.php`, {
        async :false
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.length==0)
        {
            window.location.href="../pages/signin.html";
            return false;
        }    
      })
      .catch((error) => {
          console.error("Error fetching data:", error);
      });

}

document.querySelector(".header .cart-btn .count").innerText="0";

function refreshNumCart()
{
    
fetch(`../php/cart/total_price_cart.php`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {
        if(data.length>0)
        {
            document.querySelector(".header .cart-btn .count").innerText=data[0]['total_quant'];
        }
        else
        {
            document.querySelector(".header .cart-btn .count").innerText="0";
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

}

refreshNumCart();



let srchBtn = document.querySelector(".srch-btn");
let srchText = document.querySelector(".srch-box input");
srchBtn.onclick=()=>{
    window.location.href=`search.html?val=${srchText.value}`;
}




let catListHeader = document.querySelector(".header .cat-list");
let shopFoot = document.querySelector("footer .content .shop.catt ul");


console.log(shopFoot)

catListHeader.innerHTML = "";
shopFoot.innerHTML = "";

fetch(`../php/home/cates_subcates.php`)
    .then((response) => response.json())
    .then((data) => {


        console.log(data);

        data.forEach((ele) => {

            if (ele['sub_cates'].length == 0)
                return;

                catListHeader.innerHTML += `
            <li><a href="products.html?catid=${ele['cat_id']}">${ele['cat_name']}</a></li>
            `
            shopFoot.innerHTML += `
            <li><a href="products.html?catid=${ele['cat_id']}">${ele['cat_name']}</a></li>
            `

        })



    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });





