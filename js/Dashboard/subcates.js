

let selectCate = document.getElementById("select-cate");

    refreshPage();

function refreshPage() {
    let tableData = document.querySelector(".content .parent .table .table-body");
    fetch("../../php/home/cates_subcates.php", {
        method: "POST", async: false
    }).then(response => response.json()).then(cates => {

        selectCate.innerHTML = "<option value='' disabled selected hidden >Category Name</option>";

        cates.forEach((cat) => {
            selectCate.innerHTML += `<option value="${cat['cat_id']}">${cat['cat_name']}</option>`
        })

        fetch("../../php/home/subcates.php", {
            method: "POST", async: false
        }).then(response => response.json()).then(subCates => {

            tableData.innerHTML = "";

            subCates.forEach((ele) => {

                let opts = "";

                cates.forEach((cat) => {
                    opts += `<option ${cat['cat_id'] == ele['cat_id'] ? "selected" : ""} value="${cat['cat_id']}">${cat['cat_name']}</option>`
                })

                tableData.innerHTML +=
                    `                 
                    <div class="row" data-subcateid=${ele['subcat_id']}>
                    <div class="body-cell">#${ele['subcat_id']}</div>
                    <div class="body-cell">
                        <span class="cat-name">${ele['subcat_name']}</span>
                        <input type="text" class="edit-input" >
                    </div>
                    <div class="body-cell">
                        <span class="cat-name">${ele['cat_name']}</span>
                        <select name="" id="" class="edit-input">
                            ${opts}
                        </select>
                    </div>
                    <div class="body-cell">
                        <span class="edit-btn btn">Edit</span>
                        <span class="fin-edit-btn btn">Edit</span>
                        <span class="delete-btn btn">Delete</span>
                        <span class="cancel-btn btn">Cancel</span>
                    </div>
                </div>
            
    
                    `


            })



        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    })
        .catch(error => {
            console.error('Error fetching data:', error);
        });



}







document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        let editBtns = document.querySelectorAll(".content .parent .table .body-cell .edit-btn");
        editBtns.forEach((ele) => {
            ele.parentElement.parentElement.classList.remove("edit-now");
            ele.parentElement.previousElementSibling.previousElementSibling.querySelector("input").value = "";
        })
        e.target.parentElement.parentElement.classList.add("edit-now");
        let inputEle = e.target.parentElement.previousElementSibling.previousElementSibling.querySelector("input");
        let nameEle = e.target.parentElement.previousElementSibling.previousElementSibling.querySelector(".cat-name");

        inputEle.value = nameEle.innerText;
    }
}
);







document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fin-edit-btn")) {

        popUpEditCate.classList.add("active");
        overlay.classList.add("active");

        popUpEditCate.dataset.subcateid = e.target.parentElement.parentElement.dataset.subcateid;
        popUpEditCate.dataset.cateid = e.target.parentElement.previousElementSibling.querySelector("select").value;
        popUpEditCate.dataset.subcatename = e.target.parentElement.previousElementSibling.previousElementSibling.querySelector("input").value;


    }
}
);







document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        popUpDeleteCate.classList.add("active");
        overlay.classList.add("active");
        popUpDeleteCate.dataset.subcateid = e.target.parentElement.parentElement.dataset.subcateid;
    }
}
);



document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel-btn")) {
        e.target.parentElement.parentElement.classList.remove("edit-now");
        let inputEle = e.target.parentElement.previousElementSibling.previousElementSibling.querySelector("input");
        inputEle.value = "";
    }
}
);


let popUpEditCate = document.getElementById("pop-up-edit-cate");
let popUpDeleteCate = document.getElementById("pop-up-delete-cate");
let overlay = document.querySelector(".overlay");



popUpEditCate.querySelector(".ok-btn").onclick = () => {
    fetch("../../php/dash_board/sub_cates/edit_subcate.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `subcate_id=${popUpEditCate.dataset.subcateid}&newname=${popUpEditCate.dataset.subcatename}&cate_id=${popUpEditCate.dataset.cateid}`
    })

        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

    refreshPage();
    closePopUp(popUpEditCate, "subcateid", "catename","cateid");

};


popUpDeleteCate.querySelector(".ok-btn").onclick = () => {


    fetch("../../php/dash_board/sub_cates/delete_subcate.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `subcate_id=${popUpDeleteCate.dataset.subcateid}`
    })

        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

        refreshPage();
        closePopUp(popUpDeleteCate, "subcateid");

};



popUpEditCate.querySelector(".cancel-btn").onclick = () => 
{
    refreshPage();
    closePopUp(popUpEditCate, "subcateid", "catename","cateid");

};


popUpDeleteCate.querySelector(".cancel-btn").onclick = () => 
{
    refreshPage();
    closePopUp(popUpDeleteCate, "subcateid");

};

function closePopUp(popUpEle, ...attrs) {
    popUpEle.classList.remove("active");
    overlay.classList.remove("active");

    attrs.forEach((ele) => {
        popUpEle.removeAttribute(`data-${ele}`)
    })


}




///////////////////////////////////////////

let addCateForm = document.getElementById("form-add-subcate");
let inputCateName = document.getElementById("input-subcate-name");


addCateForm.onsubmit = (e) => e.preventDefault();

addCateForm.querySelector("input[type='submit']").onclick=()=>{
    if (inputCateName.value == ""||selectCate.value=="") {
        popUpAlertCate.classList.add("active");
        overlay.classList.add("active");
        popUpAlertCate.querySelector("p").innerText =   inputCateName.value == "" 
                                                        ? "Please Fill Sub Category Name" 
                                                        : selectCate.value==""
                                                        ? "Please Select Category":""; 
        return false;

    }

    fetch('../../php/dash_board/sub_cates/add_subcate.php', {
        method: 'POST',
        body: new FormData(addCateForm)
    })
        .then(response => response.text())
        .then(data => {
            if(data=="ok")
            {
                inputCateName.value = "";
                refreshPage();
            }
            
        })
        .catch(error => {
            console.error(error);
        });
}


let popUpAlertCate = document.getElementById("pop-up-alert");



popUpAlertCate.querySelector("input").onclick = () => {
    popUpAlertCate.classList.remove("active");
    overlay.classList.remove("active");
}
