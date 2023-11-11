let tableBody = document.getElementById("products-table-body");
let filterCate = document.getElementById("filter-select-cate");
let filterSubCate = document.getElementById("filter-select-subcate");
let srchBtn = document.getElementById("srch-btn-input");
let srchBox = document.getElementById("srch-box-input");

let dataProducts = [];
let dataSubcates=[];

loadPage();



let popUpDeletePro = document.getElementById("pop-up-delete-pro");
let overlay = document.querySelector(".overlay");



document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete-btn"))
    {
        popUpDeletePro.dataset.proid=e.target.parentElement.parentElement.dataset.proid;
        popUpDeletePro.classList.add("active");
        overlay.classList.add("active");
    }
})

popUpDeletePro.querySelector(".ok-btn-pop").onclick=  ()=>{
    fetch("../../php/dash_board/products/delete_product.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `pro_id=${popUpDeletePro.dataset.proid}`
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if(data=="ok")
            {
                refreshTable();
            }

        })
        .catch(error => {
            console.log(error);
        });
    closePopUp(popUpDeletePro,"proid");
}

popUpDeletePro.querySelector(".cancel-btn-pop").onclick=()=>{
    closePopUp(popUpDeletePro,"proid");
}


function closePopUp(popUpEle, ...attrs) {
    popUpEle.classList.remove("active");
    overlay.classList.remove("active");

    attrs.forEach((ele) => {
        popUpEle.removeAttribute(`data-${ele}`)
    })


}



document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("edit-btn"))
    {
        arr= document.querySelectorAll(".content .parent .table .row");

        arr.forEach((ele)=>{
            if(ele.classList.contains("edit-now"))
            {
                ele.classList.remove("edit-now");
                ele.querySelector(".edit-input").value =ele.querySelector(".stock-num").innerText;
            }

        })
        e.target.parentElement.parentElement.classList.add("edit-now")
    }
})
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("cancel-btn"))
    {
        e.target.parentElement.parentElement.classList.remove("edit-now");
        e.target.parentElement.parentElement.querySelector(".edit-input").value =e.target.parentElement.parentElement.querySelector(".stock-num").innerText;
    }
})

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("fin-edit-btn"))
    {
        fetch("../../php/dash_board/products/edit_product.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `proid=${e.target.parentElement.parentElement.dataset.proid}&newstock=${e.target.parentElement.parentElement.querySelector(".edit-input").value}`
        })
    
            .then(response => response.text())
            .then(data => {
                console.log(data);
                if(data=="ok")
                {
                    refreshTable();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
})

filterCate.oninput = () => {
    filterSubCate.value = "all";
    fillFilterSubCates(filterCate.value);
    fillTable(filterCate.value, filterSubCate.value);
};

filterSubCate.oninput = () => {
    fillTable(filterCate.value, filterSubCate.value);
};

srchBtn.onclick = () => {
    FillBySearch(srchBox.value);
    filterCate.value = "all";
    filterSubCate.value = "all";
};

function loadPage() {
    loadTable();
    loadFilterCates();
    loadFilterSubCates();
}

function loadTable() {
    tableBody.innerHTML = "";
    fetch("../../php/dash_board/products/getproducts.php", {
        method: "POST",
        async: false,
    })
        .then((response) => response.json())
        .then((pros) => {
            dataProducts = pros;
            pros.forEach((ele) => {
                tableBody.innerHTML += `
               <div class="row" data-proid="${ele["pro_id"]}">
               <div class="body-cell">#${ele["pro_id"]}</div>
               <div class="body-cell">${ele["pro_name"]}</div>
               <div class="body-cell">${ele["cat_name"]}</div>
               <div class="body-cell">${ele["subcat_name"]}</div>
               <div class="body-cell">${ele["price"]}</div>
               <div class="body-cell">
               <span class='stock-num'>${ele["stock"]}</span>
               <input type="text" class="edit-input" value='${ele["stock"]}' >
               </div>
               <div class="body-cell">${ele["num_sales"]}</div>
               <div class="body-cell">
                   <span class="edit-btn btn">Edit</span>
                   <span class="fin-edit-btn btn">Edit</span>
                   <span class="delete-btn btn">Delete</span>
                   <span class="cancel-btn btn">Cancel</span>
               </div>
           </div>
               `;
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function loadFilterCates() {
    fetch("../../php/home/cates_subcates.php", {
        method: "POST",
        async: false,
    })
        .then((response) => response.json())
        .then((catesSubCates) => {
            filterCate.innerHTML = `<option value='all'>All</option>`;

            catesSubCates.forEach((ele) => {
                filterCate.innerHTML += `<option value='${ele["cat_id"]}'>${ele["cat_name"]}</option>`;
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function loadFilterSubCates() {
    fetch(`../../php/dash_board/sub_cates/subcates_filter.php`, {
        method: "GET",
        async: false,
    })
        .then((response) => response.json())
        .then((subCates) => {
            dataSubcates=subCates;
            filterSubCate.innerHTML = `<option value='all'>All</option>`;
            subCates.forEach((ele) => {
                filterSubCate.innerHTML += `<option value='${ele["subcat_id"]}'>${ele["subcat_name"]}</option>`;
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
function fillFilterSubCates(cateid) {
    filterSubCate.innerHTML = `<option value='all'>All</option>`;
    dataSubcates.forEach((ele) => {
        if(cateid=="all"||cateid==ele["cat_id"])
            filterSubCate.innerHTML += `<option value='${ele["subcat_id"]}'>${ele["subcat_name"]}</option>`;
    });

}


function fillTable(catid, subcatid) {
    tableBody.innerHTML = "";
    console.log(dataProducts);
    dataProducts.forEach((ele) => {
        let row = `
        <div class="row" data-proid="${ele["pro_id"]}">
        <div class="body-cell">#${ele["pro_id"]}</div>
        <div class="body-cell">${ele["pro_name"]}</div>
        <div class="body-cell">${ele["cat_name"]}</div>
        <div class="body-cell">${ele["subcat_name"]}</div>
        <div class="body-cell">${ele["price"]}</div>
        <div class="body-cell">
        <span class='stock-num'>${ele["stock"]}</span>
        <input type="text" class="edit-input" value='${ele["stock"]}' >
        </div>
        <div class="body-cell">${ele["num_sales"]}</div>
        <div class="body-cell">
            <span class="edit-btn btn">Edit</span>
            <span class="fin-edit-btn btn">Edit</span>
            <span class="delete-btn btn">Delete</span>
            <span class="cancel-btn btn">Cancel</span>
        </div>
    </div>
        `;

        if (catid == "all" && subcatid == "all") tableBody.innerHTML += row;
        else if (catid != "all" && subcatid == "all") {
            if (catid == ele["cat_id"]) tableBody.innerHTML += row;
        } else if (subcatid != "all") {
            if (subcatid == ele["subcat_id"]) tableBody.innerHTML += row;
        }
    });
}

function refreshTable()
{
    fetch("../../php/dash_board/products/getproducts.php", {
        method: "POST",
        async: false,
    })
        .then((response) => response.json())
        .then((pros) => {
            dataProducts = pros;
            console.log(dataProducts);
            fillTable(filterCate.value, filterSubCate.value);

        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}



function FillBySearch(pro_name) {
    tableBody.innerHTML = "";
    fetch(`../../php/dash_board/products/search_products.php?pro_name=${pro_name}`, {
        method: "GET",
        async: false,
    })
        .then((response) => response.json())
        .then((pros) => {
            pros.forEach((ele) => {
                tableBody.innerHTML += `
                <div class="row" data-proid="${ele["pro_id"]}">
                <div class="body-cell">#${ele["pro_id"]}</div>
                <div class="body-cell">${ele["pro_name"]}</div>
                <div class="body-cell">${ele["cat_name"]}</div>
                <div class="body-cell">${ele["subcat_name"]}</div>
                <div class="body-cell">${ele["price"]}</div>
                <div class="body-cell">
                <span class='stock-num'>${ele["stock"]}</span>
                <input type="text" class="edit-input" value='${ele["stock"]}' >
                </div>
                <div class="body-cell">${ele["num_sales"]}</div>
                <div class="body-cell">
                    <span class="edit-btn btn">Edit</span>
                    <span class="fin-edit-btn btn">Edit</span>
                    <span class="delete-btn btn">Delete</span>
                    <span class="cancel-btn btn">Cancel</span>
                </div>
            </div>
               `;
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

let addFilterCate = document.getElementById("add-filter-select-cate");
let addFilterSubCate = document.getElementById("add-filter-select-subcate");

loadAddFilterCates();
loadAddFilterSubCates("all");

let dataSubcatesAdd=[];



function loadAddFilterCates() {
    fetch("../../php/home/cates_subcates.php", {
        method: "POST",
        async: false,
    })
        .then((response) => response.json())
        .then((catesSubCates) => {
            addFilterCate.innerHTML = "<option value='all'  selected  >Category : All</option>";

            catesSubCates.forEach((ele) => {
                addFilterCate.innerHTML += `<option value='${ele["cat_id"]}'>${ele["cat_name"]}</option>`;
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function loadAddFilterSubCates(cat_id) {
    fetch(`../../php/dash_board/sub_cates/subcates_filter.php`, {
        method: "GET",
        async: false,
    })
        .then((response) => response.json())
        .then((subCates) => {
            dataSubcatesAdd=subCates;
            addFilterSubCate.innerHTML = "<option value='' disabled selected hidden >Sub Category</option>";
            subCates.forEach((ele) => {
                addFilterSubCate.innerHTML += `<option value='${ele["subcat_id"]}'>${ele["subcat_name"]}</option>`;
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
function fillAddFilterSubCates(cat_id){

    addFilterSubCate.innerHTML = "<option value='' disabled selected hidden >Sub Category</option>";
    dataSubcatesAdd.forEach((ele) => {
        if(cat_id=="all"||cat_id==ele["cat_id"])
            addFilterSubCate.innerHTML += `<option value='${ele["subcat_id"]}'>${ele["subcat_name"]}</option>`;
    });
}

addFilterCate.oninput = () => {
    addFilterSubCate.value = "";
    fillAddFilterSubCates(addFilterCate.value);
};

let uploadImgs = document.getElementById("imgsToUpload");
let previewImgs = document.querySelector(
    "form.add-pro .down .add-img .show-imgs"
);

uploadImgs.oninput = () => {
    let imgsArr = uploadImgs.files;
    previewImgs.innerHTML = "";
    let checked = false;
    for (let key of Object.keys(imgsArr)) {
        previewImgs.innerHTML += `
        <div class="one">
        <input type="radio" name="defaultImg" value="${key}" id="${key}-pro-img"  ${!checked?"checked":""}>
        <label class="img" for="${key}-pro-img">
            <img src="${URL.createObjectURL(imgsArr[key])}" alt="">
        </label>
        <div></div>
    </div>
        `;

        checked=true;
    }
};


let feaNameInput = document.getElementById("fea-name-input");
let feaValueInput = document.getElementById("fea-value-input");
let previewFea = document.getElementById("preview-fea");
let addFeaBtn =document.getElementById("add-fea");
addFeaBtn.onclick = () => {
    previewFea.innerHTML += `
    <div class="row">
    <div class="body-cell fea-name">${feaNameInput.value}</div>
    <div class="body-cell fea-value">${feaValueInput.value}</div>
    <div class="body-cell">
        <span class="fa-solid fa-circle-xmark del-btn"></span>
    </div>
</div>
    `;
    feaNameInput.value = feaValueInput.value = "";
};

let addProForm = document.querySelector("form.add-pro");
let popUpAlertCate = document.getElementById("pop-up-alert");

let proNameInput = addProForm.querySelector("input[name='name']");
let proPriceInput = addProForm.querySelector("input[name='price']");
let proStockInput = addProForm.querySelector("input[name='stock']");

let descArea =document.getElementById("descarea");


addProForm.onsubmit = (e) => {
    refreshFeaturesValue();
    e.preventDefault();

    if (proNameInput.value==""||proPriceInput.value==""||proStockInput.value==""||addFilterSubCate.value==""||uploadImgs.files.length==0||isNaN(Number(proStockInput.value))||isNaN(Number(proPriceInput.value)) ){
        let message="";

        if(proNameInput.value=="")
        message="Please Fill Product Name";
        else if(proPriceInput.value=="")
        message="Please Fill Product Price";
        else if(proStockInput.value=="")
        message="Please Fill Product Stock";
        else if(addFilterSubCate.value=="")
        message="Please Select Sub Category";
        else if(uploadImgs.files.length==0)
        message="Please Upload At Least One Image";
        else if(isNaN(Number(proPriceInput.value)))
        message="Please Enter Valid Product Price";
        else if(isNaN(Number(proStockInput.value)))
        message="Please Enter Valid Product Stock";


        popUpAlertCate.classList.add("active");
        overlay.classList.add("active");
        popUpAlertCate.querySelector("p").innerText = message;
        return false;

    }

    fetch("../../php/dash_board/products/add_product.php", {
        method: "POST",
        body: new FormData(addProForm),
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            refreshTable();
            proNameInput.value=proPriceInput.value=proStockInput.value = descarea.value =addFilterSubCate.value= previewFea.innerHTML =  uploadImgs.value =  previewImgs.innerHTML ="";

        })
        .catch((error) => {
            console.error(error);
        });

    return false;
};

popUpAlertCate.querySelector("input").onclick = () => {
    popUpAlertCate.classList.remove("active");
    overlay.classList.remove("active");
}


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("del-btn")) {
        e.target.parentElement.parentElement.remove();
    }
});

let feaValues = document.getElementById("fea-values");
function refreshFeaturesValue() {
    let feaNameFields = document.querySelectorAll(
        "form.add-pro .down .spec .table .body-cell.fea-name"
    );
    let feaValueFields = document.querySelectorAll(
        "form.add-pro .down .spec .table .body-cell.fea-value"
    );

    let result =[];

    feaNameFields.forEach((ele, ind) => {
        result.push([feaNameFields[ind].innerText, feaValueFields[ind].innerText]);
    });

    feaValues.value = JSON.stringify(result);
}
