


let itemsParent = document.querySelector(".cart .parent .main ");

function refreshPage (){


fetch(`../php/cart/cart.php`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
  
  
        console.log(data);

        itemsParent.innerHTML = "";
  
      data.forEach((ele) => {
        itemsParent.innerHTML += `
        
        <div class="one" data-proid=${ele['pro_id']} data-price=${ele['price']}>
        <div class="left">
            <span class="fa-solid fa-circle-xmark del-btn"></span>
            <a class="img" href="../pages/product.html?pro_id=${ele['pro_id']}">
                <img src="../Uploads/products_images/${ele['path']}" alt="product image">
            </a>
            <div class="info">
            <span class="out-stock-warn">Only Available  <span class="num"></span> Pieces</span>
             <a href="../pages/product.html?pro_id=${ele['pro_id']}">   <h4 class="pro-name">${ele['pro_name']}</h4> </a>
                <div class="price-line">
                    <span class="curr">$</span>
                    <span class="price">${ele['price']}</span>
                </div>
            </div>

        </div>
        <div class="right">
            <div class="counter">
                <span class="decr fa-solid fa-minus decrBtn"></span>
                <span class="counterNumber">${ele['quant']}</span>
                <span class="incr fa-solid fa-plus incrBtn"></span>
            </div>
            <div class="tot-price-line">
                <span class="curr">$</span>
                <span class="tot-price">${ele['total_price']}</span>
            </div>
        </div>
    </div>


        `;

      });


      let incrBtns = document.querySelectorAll(".incrBtn");
let decrBtns = document.querySelectorAll(".decrBtn");
let delBtns = document.querySelectorAll(".del-btn");

incrBtns.forEach((ele) => {
    ele.onclick = ()=>{
        let countNum = ele.previousElementSibling;
        let price = parseFloat(ele.parentElement.parentElement.parentElement.dataset.price);
        let totPrice = ele.parentElement.nextElementSibling.lastElementChild;
        let quant = +countNum.innerText +1;
        countNum.innerText= quant ;
        totPrice.innerText = (price * +countNum.innerText).toFixed(2);




        fetch("../php/cart/change_quant_cart.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `pro_id=${ele.parentElement.parentElement.parentElement.dataset.proid}&quant=${quant}`
        })
    
            .then(response => response.text())
            .then(data => {
                refreshTotals();
            })
            .catch(error => {
                console.log(error);
            });



    }
});


decrBtns.forEach((ele) => {
    ele.onclick = ()=>{
        if(ele.nextElementSibling.innerText > 1)
        {
            let countNum = ele.nextElementSibling;
            let price = parseFloat(ele.parentElement.parentElement.parentElement.dataset.price);
            let totPrice = ele.parentElement.nextElementSibling.lastElementChild;
            let quant = +countNum.innerText -1;
            countNum.innerText= quant ;
            totPrice.innerText = (price * +countNum.innerText).toFixed(2);

            
        fetch("../php/cart/change_quant_cart.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `pro_id=${ele.parentElement.parentElement.parentElement.dataset.proid}&quant=${quant}`
        })
    
            .then(response => response.text())
            .then(data => {
                refreshTotals();
            })
            .catch(error => {
                console.log(error);
            });





        }
    }
});
delBtns.forEach((ele) => {
    ele.onclick = ()=>{
        fetch("../php/cart/delete_item_cart.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `pro_id=${ele.parentElement.parentElement.dataset.proid}`
        })
    
            .then(response => response.text())
            .then(data => {
                console.log(data);
                refreshTotals();
                refreshPage();
            })
            .catch(error => {
                console.log(error);
            });
    }
});

  
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  
}

refreshPage();

let cartSpan=document.querySelector(".header .cart-btn .count");
let totalPrice = document.getElementById("total-price-order");
let totalQuant = document.getElementById("total-quant-order");

function refreshTotals()
{
    
fetch(`../php/cart/total_price_cart.php`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {

        if(data.length>0)
        {
            totalPrice.innerText=data[0]['final_total_price']+" $";
            cartSpan.innerText=data[0]['total_quant'];
            totalQuant.innerText=data[0]['total_quant'];
        }
        else
        {
            totalPrice.innerText="0 $";
            cartSpan.innerText="0";
            totalQuant.innerText="0";
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

}
refreshTotals();


let checkBtn = document.getElementById("check-btn");
let emptyWarn = document.getElementById("warn");



console.log(emptyWarn);
console.log(checkBtn);

checkBtn.onclick=()=>{

    clearWarn();

    fetch(`../php/cart/total_price_cart.php`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            if(data[0]['total_quant']==0)
            {
                emptyWarn.classList.add("active");
            }
            else
            {

                fetch(`../php/cart/check_stock_order.php`, {
                    method: "GET",
                })
                    .then((response) => response.json())
                    .then((test) => {
                        console.log(test);
                        if(test.length==0)
                        {
                            window.location.href="checkout.html";
                        }
                        else
                        {
                            
                            test.forEach((ele)=>{
                                
                            let item =document.querySelector(`.cart .parent .main .one[data-proid='${ele['pro_id']}'] `);
                            item.classList.add("out-stock");
                            item.querySelector(".out-stock-warn").innerHTML= ele['stock'] ==0 ? "Out Of Stock " : `Only Available  <span class="num">${ele['stock']}</span> Piece${ele['stock'] ==1 ? "" :"s"}`;
                            
                            });

                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });
            


            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });





        return false;


}


function clearWarn(){

    let items =document.querySelectorAll(`.cart .parent .main .one`);

    items.forEach((ele)=>{
        ele.classList.remove("out-stock");
        ele.querySelector(".out-stock-warn").innerHTML="";
    })

}