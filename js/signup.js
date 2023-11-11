

let form = document.querySelector("form");
let inputss = document.querySelectorAll(
    "input[type='text'],input[type='password']"
);
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passRegExp = /^(?=.*[0-9])(?=.*[!@#.$%^&*])[a-zA-Z0-9!@#.$%^&*]{8,20}$/;
let numReg = /^[0-9]{5,20}$/;


console.log(inputss);

let showPass = document.querySelectorAll(".inp-box i");
let inputsPass = document.querySelectorAll(".pass-box .inp-box input, .pass-con-box .inp-box input")
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


form.onsubmit = () => {
    for (let i = 0; i < 4; i++) {
        inputss[i].value = inputss[i].value.trim();
    }
    inputss[2].value = inputss[2].value.split(" ").join("");
    inputss[3].value = inputss[3].value.split(" ").join("");

    let valid = true;

    inputss.forEach((ele) => {
        if (ele.value == "") {
            ele.parentElement.classList.add("null");
            ele.classList.add("foucs");
            valid = false;
        } else ele.parentElement.classList.remove("null");
    });

    if (inputss[2].value == "") {
        inputss[2].parentElement.classList.add("null");
        inputss[2].classList.add("foucs");
        valid = false;
    } else {
        inputss[2].parentElement.classList.remove("null");

        if (!regex.test(inputss[2].value)) {
            inputss[2].parentElement.parentElement.classList.add("not-valid");
            inputss[2].parentElement.nextElementSibling.innerHTML =
                "Please Enter Valid Email";
            valid = false;
        } else {
            inputss[2].parentElement.parentElement.classList.remove("not-valid");
            fetch("../php/sign/check_email.php", {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
                body: `email=${inputss[2].value}`,
            })
                .then((response) => response.text())
                .then((data) => {

 ////////////////////////////////////////////////////////////////
                    if (+data > 0) {
                        inputss[2].parentElement.parentElement.classList.add("not-valid");
                        inputss[2].parentElement.nextElementSibling.innerHTML =
                            "This Email Is Already Used";
                        valid = false;
                    } else
                        inputss[2].parentElement.parentElement.classList.remove(
                            "not-valid"
                        );
//////////////////////////////////////////////////////////////
                    if (!numReg.test(inputss[3].value)) {
                        inputss[3].parentElement.parentElement.classList.add("not-valid");
                        valid = false;
                    } else
                        inputss[3].parentElement.parentElement.classList.remove(
                            "not-valid"
                        );
///////////////////////////////////////////////////////////////////
                    if (!passRegExp.test(inputss[4].value)) {
                        inputss[4].parentElement.classList.add("null");
                        inputss[5].parentElement.parentElement.classList.add("null");
                        inputss[5].parentElement.parentElement.querySelector(
                            "p"
                        ).innerHTML = "";
                        valid = false;
                    } else {
                        inputss[4].parentElement.classList.remove("null");
                        inputss[5].parentElement.parentElement.classList.remove("null");
                        if (inputss[5].value != inputss[4].value) {
                            inputss[5].parentElement.parentElement.classList.add("null");
                            inputss[5].parentElement.parentElement.querySelector(
                                "p"
                            ).innerHTML = "Passwords Must Match";
                            valid = false;
                        } else {
                            inputss[5].parentElement.parentElement.classList.remove("null");
                        }
                    }
////////////////////////////////////////////////////////
                    if (valid) {
                        fetch("../php/sign/signup.php", {
                            method: "POST",
                            body: new FormData(form),
                        })
                            .then((response) => response.text())
                            .then((data) => {
                                console.log(data);
                                if(data.trim()=="ok")
                                {
                                    window.location.href="../pages/signin.html"
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return false;
};

// inputss[2].onblur=(e)=>{

//     if(!regex.test(inputss[2].value))
//     {
//         inputss[2].parentElement.parentElement.classList.add("not-valid");
//         inputss[2].parentElement.nextElementSibling.innerHTML="Please Enter Valid Email";
//     }
//     else
//         inputss[2].parentElement.parentElement.classList.remove("not-valid");

//     if(inputss[2].value=="")
//     inputss[2].parentElement.parentElement.classList.remove("not-valid");

// }

// inputss[4].oninput=()=>{

//     if(inputss[4].value=="")
//     {
//         inputss[4].classList.remove("foucs");
//         inputss[4].parentElement.classList.remove("null");
//         inputss[4].parentElement.classList.remove("correct");
//     }
//     else
//     {
//         inputss[4].classList.add("foucs");

// if(!passRegExp.test(inputss[4].value))
// {
//     inputss[4].parentElement.classList.add("null");
//     inputss[4].parentElement.classList.remove("correct");

// }
// else
// {
//     inputss[4].parentElement.classList.remove("null");
//     inputss[4].parentElement.classList.add("correct");
// }
//     }

// }
// inputss[5].oninput=()=>{

//     if(inputss[5].value=="")
//     {
//         inputss[5].classList.remove("foucs");
//         inputss[5].parentElement.parentElement.classList.remove("null");
//         inputss[5].parentElement.classList.remove("correct");
//     }
//     else
//     {
//         inputss[5].classList.add("foucs");

//         if(passRegExp.test(inputss[4].value))
//         {
// if(inputss[5].value != inputss[4].value)
// {
//     inputss[5].parentElement.parentElement.classList.add("null");
//     inputss[5].parentElement.classList.remove("correct");

// }
// else
// {
//     inputss[5].parentElement.parentElement.classList.remove("null");
//     inputss[5].parentElement.classList.add("correct");
// }
//         }

//     }

// }
