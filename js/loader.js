
window.addEventListener("load",()=>{
    document.querySelector(".loader-container").classList.add("hide");

    setTimeout(()=>{
      document.querySelector(".loader-container").remove();
    },500)

  })