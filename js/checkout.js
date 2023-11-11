let addressFields = document.querySelectorAll(" .inp-box input");
let selectAddress = document.getElementById("select-address");
let addressesData = [];



fetch(`../php/cart/total_price_cart.php`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {

        if (data[0]['total_quant'] == 0) {
            window.location.href = "../pages/home.html";
        }

        document.getElementById("total_price").innerText = data[0]['final_total_price'] + " $";
        document.getElementById("total_quant").innerText = data[0]['total_quant'];


    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });




fetch(`../php/acoount/addresses.php`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {

        addressesData = data;
        selectAddress.innerHTML = "";
        data.forEach(ele => {

            selectAddress.innerHTML +=
                `<option value="${ele['add_id']}" ${ele['is_default'] == 1 ? "selected" : ""}   >${ele['country'] + "/" + ele['city'] + "/" + ele['street'] + "/" + ele['build'] + "/" + ele['phone']}</option>`;

        });

        changeAdd();


    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });



selectAddress.oninput = changeAdd;

function changeAdd() {

    let selectedAdd = addressesData.find((ele) => {
        return ele['add_id'] == selectAddress.value;
    })


    addressFields[0].value = selectedAdd['country'];
    addressFields[1].value = selectedAdd['city'];
    addressFields[2].value = selectedAdd['street'];
    addressFields[3].value = selectedAdd['build'];
    addressFields[4].value = selectedAdd['phone'];
    addressFields[5].value = selectedAdd['note'];



}

let orderBtn = document.getElementById("order-now-btn");
let numReg = /^[0-9]{5,20}$/;


orderBtn.onclick=()=>{
    let valid =true;
    let addarr=[];
    addressFields.forEach((ele,ind)=>{
        if(ele.value==""&&ind!=5)
        {
            ele.parentElement.classList.add("null")
            valid=false;
        }
        else
        {
            ele.parentElement.classList.remove("null")

        }
        addarr.push(ele.value);
    })
    if(valid==false)
    {    

        return false;
    }

    console.log(addarr);

    


    if(!numReg.test(addressFields[4].value))
    {
        addressFields[4].parentElement.classList.add("null");
        addressFields[4].classList.add("inv");
        return false;
    }
    else{
        addressFields[4].parentElement.classList.remove("null");
        addressFields[4].classList.remove("inv");
    }

    fetch(`../php/orders/checkout.php`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `address=${JSON.stringify(addarr)}`
    })
        .then((response) => response.text())
        .then((data) => {

            popUpAlertCate.classList.add("active");
            overlay.classList.add("active");

        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });


}

let popUpAlertCate = document.getElementById("pop-up-alert");
let overlay = document.querySelector(".overlay");


popUpAlertCate.querySelector("input").onclick = () => {
    window.location.href="home.html";
}

