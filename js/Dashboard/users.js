
let SearchBox = document.getElementById("srch-box-input");
let SearchBtn = document.getElementById("srch-btn-input");
let tableOrders =document.querySelector(".content .parent .table .table-body");

function refreshPage()
{
    SearchBox.value="";
    tableOrders.innerHTML="";
    
    fetch(`../../php/dash_board/users/get_users.php`)
        .then((response) => response.json())
        .then((data) => {
    
            data.forEach((ele)=>{
                tableOrders.innerHTML+=
                `
                
                <div class="row">
                <div class="body-cell">#${ele['user_id']}</div>
                <div class="body-cell">${ele['full_name']}</div>
                <div class="body-cell">${ele['email']}</div>
                <div class="body-cell">${ele['phone']}</div>
                <div class="body-cell">
                    <p> <span class="num">${ele['total_price']}$</span> <br> For <span class="num">${ele['total_quant']}</span> Items </p>
                </div>
                <div class="body-cell">
                    <a href="../../pages/Dashboard/orders.html?userid=${ele['user_id']}" class="view-btn btn">View Orders</a>
                </div>
            </div>


                `
            })

                console.log(data);


            
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
    
    

}

refreshPage();



SearchBtn.onclick = ()=>{
    tableOrders.innerHTML="";

    fetch("../../php/dash_board/users/search_users.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `search=${SearchBox.value}`
    })
    .then((response) => response.json())
    .then((data) => {

        data.forEach((ele)=>{
            tableOrders.innerHTML+=
            `
            
            <div class="row">
            <div class="body-cell">#${ele['user_id']}</div>
            <div class="body-cell">${ele['full_name']}</div>
            <div class="body-cell">${ele['email']}</div>
            <div class="body-cell">${ele['phone']}</div>
            <div class="body-cell">
                <p> <span class="num">${ele['total_price']}$</span> <br> For <span class="num">${ele['total_quant']}</span> Items </p>
            </div>
            <div class="body-cell">
                <a href="../../pages/Dashboard/orders.html?userid=${ele['user_id']}" class="view-btn btn">View Orders</a>
            </div>
        </div>


            `
        })

            console.log(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
        
    
}

