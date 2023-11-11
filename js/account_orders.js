let popView = document.getElementById("pop-view")
let popViewContent = document.querySelector("#pop-view .content")
let overlay = document.querySelector(".overlay");
let closePop = document.querySelector(".pop-up .close-btn");
let feasP = document.querySelectorAll("#pop-view .fea p");


closePop.onclick =()=>{
    popView.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("poped");
}

let table = document.querySelector(".content table tbody");


let statusArr =["Processing","In Delivery","Delivered","Canceled"]
function refreshPage()
{

    table.innerHTML="";
    
fetch(`../php/orders/orders.php`)
    .then((response) => response.json())
    .then((data) => {


        data.forEach((ele)=>{
            table.innerHTML+=`
            <tr data-orderid=${ele['order_id']}>
            <td>#${ele['order_id']}</td>
            <td>${ele['datee']}</td>
            <td class="address">${JSON.parse(ele['address']).join("<br>")}</td>
            <td>${statusArr[ele['order_status']-1]}</td>
            <td>
                <span class="num">${ele['total_price']}$</span> For
                <span class="num">${ele['total_quant']}</span> Items
            </td>
            <td>
                <span class="view-btn">View</span>
                ${ele['order_status']==1||ele['order_status']==2?`<span class="cancel-btn">Cancel Order</span>`:""}
            </td>
        </tr>

            `
        })





    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });


}

refreshPage();

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("view-btn"))
    {

        fetch("../php/orders/order_items.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `order_id=${e.target.parentElement.parentElement.dataset.orderid}`
        })
    
            .then(response => response.json())
            .then(data => {
                feasP[0].innerText="#"+data['order_id'];
                feasP[1].innerText=data['datee'];
                feasP[2].innerText=statusArr[data['order_status']-1];
                feasP[3].innerText="$"+data['total_price'];
                popViewContent.innerHTML="";

                data['items'].forEach((ele)=>{

                    popViewContent.innerHTML+=
                    `
                    
                    <div class="one">
                    <div class="left">
                        <a href="product.html?pro_id=${ele['pro_id']}" class="img">
                            <img src="../Uploads/products_images/${ele['path']}" alt="product_image" />
                        </a>
                        <div class="det">
                            <a href="product.html?pro_id=${ele['pro_id']}"><h4 class="pro-name">${ele['pro_name']}</h4></a>
                            <div class="line">
                                <h5>Price :</h5>
                                <p>$${ele['price']}</p>
                            </div>
                            <div class="line">
                                <h5>Quantity :</h5>
                                <p>${ele['quant']}</p>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <h4>Total Price</h4>
                        <div class="tot-price-line">$${ele['total_price']}</div>
                    </div>
                </div>
            </div>
    
                    `;

                })

                popView.classList.add("active");
                overlay.classList.add("active");
                document.body.classList.add("poped");


            })
            .catch(error => {
                console.log(error);
            });

    }
})

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("cancel-btn"))
    {

        fetch("../php/orders/change_order_status.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `order_id=${e.target.parentElement.parentElement.dataset.orderid}&status=4`
        })
    
            .then(response => response.text())
            .then(data => {

                refreshPage();


            })
            .catch(error => {
                console.log(error);
            });

    }
})
