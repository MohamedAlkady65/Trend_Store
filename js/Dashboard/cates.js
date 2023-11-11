

let tableData = document.querySelector(".content .parent .table .table-body");
function refreshPage() {

    fetch("../../php/home/cates_subcates.php", {
        method: "POST", async: false
    }).then(response => response.json()).then(data => {

        tableData.innerHTML = "";

        data.forEach((ele) => {
            tableData.innerHTML += `                     
            <div class="row" data-cateid=${ele['cat_id']}>
            <div class="body-cell">#${ele['cat_id']}</div>
            <div class="body-cell">
                <span class="cat-name">${ele['cat_name']}</span>
                <input type="text" class="edit-input" >
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


}

refreshPage();


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        let editBtns = document.querySelectorAll(".content .parent .table .body-cell .edit-btn");
        editBtns.forEach((ele) => {
            ele.parentElement.parentElement.classList.remove("edit-now");
            ele.parentElement.previousElementSibling.querySelector("input").value = "";
        })
        e.target.parentElement.parentElement.classList.add("edit-now");
        let inputEle = e.target.parentElement.previousElementSibling.querySelector("input");
        let nameEle = e.target.parentElement.previousElementSibling.querySelector(".cat-name");

        inputEle.value = nameEle.innerText;

    }
}
);

let popUpEditCate = document.getElementById("pop-up-edit-cate");
let popUpDeleteCate = document.getElementById("pop-up-delete-cate");
let overlay = document.querySelector(".overlay");


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fin-edit-btn")) {

        popUpEditCate.classList.add("active");
        overlay.classList.add("active");

        popUpEditCate.dataset.cateid = e.target.parentElement.parentElement.dataset.cateid;
        popUpEditCate.dataset.catename = e.target.parentElement.previousElementSibling.querySelector("input").value;

    }
}
);


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        popUpDeleteCate.classList.add("active");
        overlay.classList.add("active");
        popUpDeleteCate.dataset.cateid = e.target.parentElement.parentElement.dataset.cateid;

    }
}
);



document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel-btn")) {
        e.target.parentElement.parentElement.classList.remove("edit-now");
        let inputEle = e.target.parentElement.previousElementSibling.querySelector("input");
        inputEle.value = "";
    }
}
);




popUpEditCate.querySelector(".ok-btn-pop").onclick = () => {

    fetch("../../php/dash_board/cates/edit_cate.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `cate_id=${popUpEditCate.dataset.cateid}&cate_name=${popUpEditCate.dataset.catename}`
    })

        .then(response => response.text())
        .then(data => {
            console.log(data);
            if(data=="ok")
            console.log(55);
        })
        .catch(error => {
            console.log(error);
        });
    refreshPage();
    closePopUp(popUpEditCate, "cateid", "catename");
};





popUpDeleteCate.querySelector(".ok-btn-pop").onclick = () => {

    fetch("../../php/dash_board/cates/delete_cate.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `cate_id=${popUpDeleteCate.dataset.cateid}`
    })

        .then(response => response.text())
        .then(data => {
        })
        .catch(error => {
            console.log(error);
        });
    refreshPage();
    closePopUp(popUpDeleteCate, "cateid");
    refreshPage();

};


popUpDeleteCate.querySelector(".cancel-btn-pop").onclick = () => {
    refreshPage();
    closePopUp(popUpDeleteCate, "cateid");
    
};

popUpEditCate.querySelector(".cancel-btn-pop").onclick = () => {
    refreshPage();
    closePopUp(popUpEditCate, "cateid", "catename");
};

function closePopUp(popUpEle, ...attrs) {
    popUpEle.classList.remove("active");
    overlay.classList.remove("active");

    attrs.forEach((ele) => {
        popUpEle.removeAttribute(`data-${ele}`)
    })


}



let addCateForm = document.getElementById("form-add-cate");
let inputCateName = document.getElementById("input-cate-name");

addCateForm.onsubmit = (e) => {

    e.preventDefault();

    if (inputCateName.value == "") {
        popUpAlertCate.classList.add("active");
        overlay.classList.add("active");
        popUpAlertCate.querySelector("p").innerText = "Please Fill Category Name";
        return false;

    }

    fetch('../../php/dash_board/cates/add_cate.php', {
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
