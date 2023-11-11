fetch(`../php/general/getsession.php`, {
    async :false
})
  .then((response) => response.json())
  .then((data) => {
    if(data.length==0)
    {
        window.location.href="../pages/signin.html";
        
    }

    console.log(data)

  })
  .catch((error) => {
      console.error("Error fetching data:", error);
  });