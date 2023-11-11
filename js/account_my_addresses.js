let parent = document.querySelector(".parent");


function refreshPage()
{

    parent.innerHTML=`
    <a  href="account_add_address.html" class="one add-btn">
    <div>
        <i class="fa-solid fa-plus"></i>
        <h4>Add Address</h4>
    </div>
</a>
    `;

  
    fetch("../php/acoount/addresses.php").
    then(response => response.json()).
    then(data => {

        data.forEach(ele => {
            parent.innerHTML+=`
            <div class="one ${ele['is_default']==1?"def":""}" data-addid=${ele['add_id']} >
            <p>${ele['country']}</p>
            <p>${ele['city']}</p>
            <p>${ele['street']}</p>
            <p>${ele['build']}</p>
            <p>${ele['phone']}</p>
            <p>${ele['note']}</p>
            <div class="btns">
                ${ele['is_default']==1?"":`<input type="button" value="Set Default" class="set-btn">`}
                <input type="button" value="Remove" class="remove-btn">
                <a href="account_edit_address.html?add_id=${ele['add_id']}"  class="edit-btn">Edit</a>
                </div>
        </div>
            `
    
        });

      console.log(data);

    })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


}

refreshPage();


document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("remove-btn"))
    {

        fetch("../php/acoount/delete_address.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `addid=${e.target.parentElement.parentElement.dataset.addid}`
        })
    
            .then(response => response.text())
            .then(data => {
                console.log(data);
                refreshPage();
            })
            .catch(error => {
                console.log(error);
            });

    }
})


document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("set-btn"))
    {

        fetch("../php/acoount/set_default_address.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `addid=${e.target.parentElement.parentElement.dataset.addid}`
        })
    
            .then(response => response.text())
            .then(data => {
                console.log(data);
                refreshPage();
            })
            .catch(error => {
                console.log(error);
            });

    }
})

