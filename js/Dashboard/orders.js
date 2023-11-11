let tableOrders = document.querySelector(".content .parent .table .table-body");
let statusArr =["Processing","In Delivery","Delivered","Canceled"];
let boldArr =["bold-text","bold-text","",""];
let selectFilter = document.querySelector(".content .parent .filter .right select");
let SearchBox = document.getElementById("srch-box-input");
let SearchBtn = document.getElementById("srch-btn-input");



const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has("userid"))
{

    let userid = urlParams.get('userid');
    tableOrders.innerHTML="";
    
    refreshPage(false);

    fetch(`../../php/dash_board/orders/user_orders.php?userid=${userid}`)
        .then((response) => response.json())
        .then((data) => {

            console.log(data)

            data.forEach((ele)=>{
                tableOrders.innerHTML+=`
                <div class="row" data-orderid="${ele['order_id']}">
                <div class="body-cell">#${ele['order_id']}</div>
                <div class="body-cell">${ele['full_name']}</div>
                <div class="body-cell">${ele['email']}</div>
                <div class="body-cell">${ele['datee']}</div>
                <div class="body-cell ${boldArr[ele['order_status']-1]}">${statusArr[ele['order_status']-1]}</div>
                <div class="body-cell">
               <p> <span class="num">${ele['total_price']}$</span> <br> For <span class="num">${ele['total_quant']}</span> Items </p>
                </div>
                <div class="body-cell">
                    <span class="view-btn btn">View</span>
                </div>
                </div>
                `
            })


    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
    
    
}
else{
    refreshPage();
}


selectFilter.oninput= filterFunction;
function filterFunction(){
    SearchBox.value="";
    tableOrders.innerHTML="";
    ordersData.forEach((ele)=>{

        if(selectFilter.value==ele['order_status']||selectFilter.value=="all")
        {

            tableOrders.innerHTML+=`
        
            <div class="row" data-orderid="${ele['order_id']}">
            <div class="body-cell">#${ele['order_id']}</div>
            <div class="body-cell">${ele['full_name']}</div>
            <div class="body-cell">${ele['email']}</div>
            <div class="body-cell">${ele['datee']}</div>
            <div class="body-cell ${boldArr[ele['order_status']-1]}">${statusArr[ele['order_status']-1]}</div>
            <div class="body-cell">
           <p> <span class="num">${ele['total_price']}$</span> <br> For <span class="num">${ele['total_quant']}</span> Items </p>
            </div>
            <div class="body-cell">
                <span class="view-btn btn">View</span>
            </div>
            </div>
            `
        }
    })
};


let ordersData=[];
function refreshPage(ch=true)
{
    SearchBox.value="";
    tableOrders.innerHTML="";
    
    fetch(`../../php/dash_board/orders/get_orders.php`)
        .then((response) => response.json())
        .then((data) => {
    
    ordersData =data;

            if(ch)
            {
                data.forEach((ele)=>{

                    if(selectFilter.value==ele['order_status']||selectFilter.value=="all")
                    {
                    tableOrders.innerHTML+=`
                    
                    <div class="row" data-orderid="${ele['order_id']}">
                    <div class="body-cell">#${ele['order_id']}</div>
                    <div class="body-cell">${ele['full_name']}</div>
                    <div class="body-cell">${ele['email']}</div>
                    <div class="body-cell">${ele['datee']}</div>
                    <div class="body-cell ${boldArr[ele['order_status']-1]}">${statusArr[ele['order_status']-1]}</div>
                    <div class="body-cell">
                   <p> <span class="num">${ele['total_price']}$</span> <br> For <span class="num">${ele['total_quant']}</span> Items </p>
                    </div>
                    <div class="body-cell">
                        <span class="view-btn btn">View</span>
                    </div>
                    </div>
                    `}
                })
            }


            
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
    
    

}




SearchBtn.onclick = ()=>{
    selectFilter.value="all";
    tableOrders.innerHTML="";
    
    fetch(`../../php/dash_board/orders/search_orders.php?searchVal=${SearchBox.value}`)
        .then((response) => response.json())
        .then((data) => {
    
            data.forEach((ele)=>{
                tableOrders.innerHTML+=`
                
                <div class="row" data-orderid="${ele['order_id']}">
                <div class="body-cell">#${ele['order_id']}</div>
                <div class="body-cell">${ele['full_name']}</div>
                <div class="body-cell">${ele['email']}</div>
                <div class="body-cell">${ele['datee']}</div>
                <div class="body-cell ${boldArr[ele['order_status']-1]}">${statusArr[ele['order_status']-1]}</div>
                <div class="body-cell">
               <p> <span class="num">${ele['total_price']}$</span> <br> For <span class="num">${ele['total_quant']}</span> Items </p>
                </div>
                <div class="body-cell">
                    <span class="view-btn btn">View</span>
                </div>
                </div>


    
                `
            })
            
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
    
}


let viewCont = document.querySelector(".viewCont .parent-view");

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("view-btn"))
    {

        fetch("../../php/dash_board/orders/order_view.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `orderid=${e.target.parentElement.parentElement.dataset.orderid}`
        })
    
            .then(response => response.json())
            .then(data => {

                let addressDet = JSON.parse(data['address']);

                let items ="";

                data['items'].forEach((ele)=>{
                    items+=`
                <div class="one">
                <div class="left">
                    <a href="product.html?pro_id=${ele['pro_id']}" class="img">
                        <img src="../../Uploads/products_images/${ele['path']}" alt="product_image" />
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
                    `
                });

                viewCont.innerHTML = 
                `
                
                <div class="info">
                    <div class="fea">
                        <h5>Order ID </h5>
                        <p>${data['order_id']}</p>
                    </div>
                    <div class="fea">
                        <h5>User Name </h5>
                        <p>${data['full_name']}</p>
                    </div>
                    <div class="fea">
                        <h5>Date </h5>
                        <p>${data['datee']}</p>
                    </div>
                    <div class="fea">
                        <h5>Status </h5>
                        <p>${ statusArr[data['order_status'] -1] }</p>
                    </div>
                    <div class="fea">
                        <h5>Total Order Price </h5>
                        <p>${data['total_price']}</p>
                    </div>
                    <div class="fea">
                        <h5>Total Order Quantity </h5>
                        <p>${data['total_quant']}</p>
                    </div>
                    <div class="fea fea-add tit">
                        <h5>Address</h5>
                    </div>

                    <div class="add-cont">
                        <div>
                            <b>Country</b>
                            <span>${addressDet[0]}</span>
                        </div>
                        <div>
                            <b>City</b>
                            <span>${addressDet[1]}</span>
                        </div>
                        <div>
                            <b>Street</b>
                            <span>${addressDet[2]}</span>
                        </div>
                        <div>
                            <b>Buliding</b>
                            <span>${addressDet[3]}</span>
                        </div>
                        <div>
                            <b>Phone</b>
                            <span>${addressDet[4]}</span>
                        </div>
                        <div>
                            <b>Note</b>
                            <span>${addressDet[5]}</span>
                        </div>
                    </div>

                </div>
                <div class="content-items"> ${items}</div>

                <form class="foot foot-from" action="#" method="post">
                    <div>
                        <label for="">Change Order Status :</label>
                        <select name="status">
                            <option ${data['order_status']==1?"selected":""} value="1">Processing</option>
                            <option ${data['order_status']==2?"selected":""} value="2">In Delivery</option>
                            <option ${data['order_status']==3?"selected":""} value="3">Delivered</option>
                            <option ${data['order_status']==4?"selected":""} value="4">Canceled</option>
                        </select>
                    </div>
                    <input type="submit" data-orderid=${data['order_id']} value="Ok" />
                    <input type="button" class="cancel-form" value="Cancel" />
                </form>
                                
                `


            })
            .catch(error => {
                console.log(error);
            });

    }
})


document.addEventListener("submit",(e)=>{
    if(e.target.classList.contains("foot-from"))
    {
        e.preventDefault();

        let dt = new FormData(e.target);
        dt.append("order_id",e.target.querySelector("input[type='submit']").dataset.orderid)

        fetch("../../php/orders/change_order_status.php", {
            method: "POST",
            body: dt
        })
    
            .then(response => response.text())
            .then(data => {

                viewCont.innerHTML="";
                refreshPage();

            })
            .catch(error => {
                console.log(error);
            });

            return false;
    }
})


document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("cancel-form"))
    {
        viewCont.innerHTML="";
    }
})
