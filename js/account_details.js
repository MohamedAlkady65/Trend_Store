let editBtnInfo = document.getElementById("editBtnInfo");
let cancelBtnInfo = document.getElementById("cancelBtnInfo");
let formInfo = document.querySelector(".section .main .content.details .one .part form.info");
let editBtnEmail = document.getElementById("editBtnEmail");
let cancelBtnEmail = document.getElementById("cancelBtnEmail");
let formEmail = document.querySelector(".section .main .content.details .one .part form.email");
let formPass = document.querySelector(".section .main .content.details .one .part form.pass");
let inputsText = document.querySelectorAll(".section .main .content.details .one .part input[type='text']");
let saveInfo = document.getElementById("saveBtnInfo");
let saveEmail = document.getElementById("saveBtnEmail");
let inputsPass = document.querySelectorAll(".section .main .content.details  .one .part form.pass .up .left  .inp-box input ");
let showPass = document.querySelectorAll(".section .main .content.details  .one .part form.pass .up .left  .inp-box input +i ");
let changeBtnpass = document.getElementById("changeBtnpass");
let inputsValues=[];
// let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]");
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passRegExp = /^(?=.*[0-9])(?=.*[!@#.$%^&*])[a-zA-Z0-9!@#.$%^&*]{8,20}$/;
let numReg = /^[0-9]{5,20}$/;
function refreshData(){

    fetch(`../php/sign/user.php`, {
    })
        .then((response) => response.json())
        .then((data) => {
    
            data=data[0];
            inputsText[0].value = data["fname"];
            inputsText[1].value = data["lname"];
            inputsText[2].value = data["phone"];
            inputsText[3].value = data["email"];
            inputsValues[0] = data["fname"];
            inputsValues[1] = data["lname"];
            inputsValues[2] = data["phone"];
            inputsValues[3] = data["email"];
            
    
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    
    

}

refreshData();
let ty ="";
showPass.forEach((ele)=>{
    ele.onclick=()=>{
        if(ele.classList.contains("fa-eye-slash"))
        {
            showPass.forEach((ele1)=>{
                ele1.classList.replace("fa-eye-slash","fa-eye");
            })
            ty="text";

        }
        else if(ele.classList.contains("fa-eye"))
        {
            showPass.forEach((ele1)=>{
                ele1.classList.replace("fa-eye","fa-eye-slash");
            })
            ty="password";

        }

        inputsPass.forEach((ele)=>{
            ele.type=ty;
        })
    }
})


editBtnInfo.onclick=()=>{
    formInfo.classList.add("edit-now");
    for(let i =0 ; i<=2 ;i++)
    inputsText[i].removeAttribute("disabled")
}
cancelBtnInfo.onclick=cancelInfo;

function cancelInfo () {
    formInfo.classList.remove("edit-now");

    for(let i =0 ; i<=2 ;i++)
    {
        inputsText[i].setAttribute("disabled","")
        inputsText[i].value=inputsValues[i];
        inputsText[i].parentElement.classList.remove("null");
        inputsText[i].parentElement.parentElement.classList.remove("not-valid");

    } 
}

editBtnEmail.onclick=()=>{
    formEmail.classList.add("edit-now");
    inputsText[3].removeAttribute("disabled")
}
cancelBtnEmail.onclick=cancelEmail;


function cancelEmail(){
    formEmail.classList.remove("edit-now");

    inputsText[3].setAttribute("disabled","")
    inputsText[3].value=inputsValues[3];
    inputsText[3].parentElement.parentElement.classList.remove("null");
    inputsText[3].parentElement.parentElement.classList.remove("not-valid");

}


saveInfo.onclick=()=>{

    let valid =true;

    for(let i=0 ; i<3 ;i ++)
    {
        if(inputsText[i].value=="")
        {
            inputsText[i].parentElement.classList.add("null");
            valid=false;
        }
        else
        {
            inputsText[i].parentElement.classList.remove("null");

        }

    }

    if(!valid){
        return false;
    }

    if (!numReg.test(inputsText[2].value))
    {
        inputsText[2].parentElement.parentElement.classList.add("not-valid");
        return false;
    }
    else{
        inputsText[2].parentElement.parentElement.classList.remove("not-valid");

    }

    fetch('../php/acoount/account_edit_info.php', {
        method: 'POST',
        body: new FormData(formInfo)
    })
        .then(response => response.text())
        .then(data => {

            if(data.trim() == 'ok')
            {

                refreshData();
                cancelInfo();
            }


            return false;

        })
        .catch(error => {
            console.error(error);
        });
        return false;

}


saveEmail.onclick=()=>{

    if(inputsText[3].value=="")
    {
        inputsText[3].parentElement.parentElement.classList.add("null");
        return false;
    }
    else{
        inputsText[3].parentElement.parentElement.classList.remove("null");

    }

    if (!emailRegex.test(inputsText[3].value)) {
        inputsText[3].parentElement.parentElement.classList.add("not-valid");
        inputsText[3].parentElement.nextElementSibling.innerHTML =
            "Please Enter Valid Email";
            return false;
    } else{
        inputsText[3].parentElement.parentElement.classList.remove("not-valid");
        inputsText[3].parentElement.nextElementSibling.innerHTML = "";
    }

    fetch("../php/sign/check_email.php", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: `email=${inputsText[3].value}`,
    })
        .then((response) => response.text())
        .then((data) => {

            if (+data > 0) {
                inputsText[3].parentElement.parentElement.classList.add("not-valid");
                inputsText[3].parentElement.nextElementSibling.innerHTML =
                    "This Email Is Already Used";
                    return false;
            } else
            {
                inputsText[3].parentElement.parentElement.classList.remove("not-valid");
                inputsText[3].parentElement.nextElementSibling.innerHTML = "";
            } 

                fetch('../php/acoount/account_edit_email.php', {
                    method: 'POST',
                    body: new FormData(formEmail)
                })
                    .then(response => response.text())
                    .then(data => {
            
                        if(data.trim() == 'ok')
                        {
            
                            refreshData();
                            cancelEmail();
                        }
            
            
            
                    })
                    .catch(error => {
                        console.error(error);
                    });


                }).catch(error => {
                    console.error(error);
                });



        return false;

}

console.log(changeBtnpass);

changeBtnpass.onclick=()=>{
    let valid =true;
    inputsPass.forEach((ele)=>{
        if(ele.value=="")
        {
            ele.parentElement.classList.add("null");
            valid=false;
        }
        else
        {
            ele.parentElement.classList.remove("null");

        }
    })

    if(!valid){
        return false;
    }
    

    if (!passRegExp.test(inputsPass[1].value)){

        inputsPass[1].parentElement.parentElement.classList.add("not-valid");
        inputsPass[1].parentElement.classList.add("null");
        return false;
    }
    else
    {
        inputsPass[1].parentElement.parentElement.classList.remove("not-valid");
        inputsPass[1].parentElement.classList.remove("null");
    }


    if(inputsPass[1].value!=inputsPass[2].value)
    {
        inputsPass[1].parentElement.classList.add("null");
        inputsPass[1].parentElement.parentElement.classList.add("not-valid");
        inputsPass[2].parentElement.parentElement.classList.add("not-valid");

        return false;
    }
    else
    {
        inputsPass[1].parentElement.classList.remove("null");
        inputsPass[1].parentElement.parentElement.classList.remove("not-valid");
        inputsPass[2].parentElement.parentElement.classList.remove("not-valid");

    }


    if(valid){

    fetch('../php/acoount/account_check_pass.php', {
        method: 'POST',
        body: new FormData(formPass)
    })
        .then(response => response.text())
        .then(data => {

            if(data.trim() == 'wrong')
            {
                inputsPass[0].parentElement.parentElement.classList.add("not-valid");
            } else if(data.trim() == 'updated')
            {
                inputsPass[0].value =  inputsPass[1].value = inputsPass[2].value = "";
                inputsPass[1].parentElement.classList.remove("null");
                inputsPass[0].parentElement.parentElement.classList.remove("not-valid");
                inputsPass[1].parentElement.parentElement.classList.remove("not-valid");
                inputsPass[2].parentElement.parentElement.classList.remove("not-valid");
        
            }
            
            console.log(data);



        })
        .catch(error => {
            console.error(error);
        });

    }



    return false;
}