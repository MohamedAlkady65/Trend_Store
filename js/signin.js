let form = document.querySelector("form");
let inputss = document.querySelectorAll("input[type='text'],input[type='password']");
let faildNote = document.querySelector(".failed");


let showPass = document.querySelector(".pass-inp i");
let inputPass = document.querySelector(".pass-inp input")
let ty ="";

showPass.onclick=()=>{
        if(showPass.classList.contains("fa-eye-slash"))
        {

            showPass.classList.replace("fa-eye-slash","fa-eye")

            ty="text";

        }
        else if(showPass.classList.contains("fa-eye"))
        {

            showPass.classList.replace("fa-eye","fa-eye-slash")


            ty="password";

        }

            inputPass.type=ty;
    }





form.onsubmit=()=>{


    let valid=true;

    inputss.forEach((ele)=>{
        if(ele.value=="")
        {
            ele.parentElement.classList.add("null");
            ele.classList.add("foucs");
            valid=false;
        }
        else
        ele.parentElement.classList.remove("null");
    })

    if(valid)
    {
        fetch('../php/sign/signin.php', {
            method: 'POST',
            body: new FormData(form)
        })
            .then(response => response.text())
            .then(data => {

                if(data.trim() == 'correct')
                {
                    if(inputss[0].value=="admin3172@gmail.com")
                    {
                        // pass = 123456Aa@

                        window.location="../pages/Dashboard/categories.html"
                    }
                    else
                    {
                        window.location="../pages/home.html"
                    }
                }
                else if(data.trim() == 'wrong')
                {
                    faildNote.classList.add("active");
                    inputss[1].value="";
                }

                console.log(data)

            })
            .catch(error => {
                console.error(error);
            });
    
    }
    else
    document.querySelector(".inp-box.null input").focus();


return false;

}
