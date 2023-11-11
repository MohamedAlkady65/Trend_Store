let inputsBox = document.querySelectorAll(".inp-box");
let inputs = document.querySelectorAll(".inp-box input");

inputsBox.forEach((ele)=>{
    ele.onclick=()=>{
        ele.querySelector("input").focus();
    }
})

inputs.forEach((ele)=>{
    ele.oninput=()=>{
        if(ele.value=="")
            ele.classList.remove("foucs");
        else
            ele.classList.add("foucs");
    }
})