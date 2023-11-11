let inputBox =document.querySelectorAll(".inp-box input[type='text']")
let titleSpan =document.querySelectorAll(".inp-box")
let countrySelect = document.getElementById("country-select");
let form = document.querySelector("form");

const urlParams = new URLSearchParams(window.location.search);
let add_id ;



if(urlParams.has("add_id"))
{
    add_id = urlParams.get('add_id');
}
else
{
    window.location.href="../pages/account_my_address.html";
}




fetch(`../php/acoount/addresses.php?add_id=${add_id}`).
then(response => response.json()).
then(data => {

    if(data.length>0)
    {
        data=data[0];

        countrySelect.value=data['country'];
        inputBox[0].value=data['city'];
        inputBox[1].value=data['street'];
        inputBox[2].value=data['build'];
        inputBox[3].value=data['phone'];
        inputBox[4].value=data['note'];
    
    }
    else
    {
        window.location.href="account_my_address.html";
    }
    



})
    .catch(error => {
        console.error('Error fetching data:', error);
    });

inputBox.forEach((ele)=>{
    ele.oninput=()=>{
        if(ele.value=="")
            ele.classList.remove("foucs");
        else
            ele.classList.add("foucs");
    }
})

titleSpan.forEach((ele)=>{
    ele.onclick = (e)=>{
        ele.querySelector("input").focus();
    }
})

let arr ="Afghanistan,Akrotiri,Albania,Algeria,American Samoa,Andorra,Angola,Anguilla,Antarctica,Antigua and Barbuda,Argentina,Armenia,Aruba,Ashmore and Cartier Islands,Australia,Austria,Azerbaijan,Bahamas, The,Bahrain,Bangladesh,Barbados,Bassas da India,Belarus,Belgium,Belize,Benin,Bermuda,Bhutan,Bolivia,Bosnia and Herzegovina,Botswana,Bouvet Island,Brazil,British Indian Ocean Territory,British Virgin Islands,Brunei,Bulgaria,Burkina Faso,Burma,Burundi,Cambodia,Cameroon,Canada,Cape Verde,Cayman Islands,Central African Republic,Chad,Chile,China,Christmas Island,Clipperton Island,Cocos (Keeling) Islands,Colombia,Comoros,Congo, Democratic Republic of the,Congo, Republic of the,Cook Islands,Coral Sea Islands,Costa Rica,Cote d'Ivoire,Croatia,Cuba,Cyprus,Czech Republic,Denmark,Dhekelia,Djibouti,Dominica,Dominican Republic,Ecuador,Egypt,El Salvador,Equatorial Guinea,Eritrea,Estonia,Ethiopia,Europa Island,Falkland Islands (Islas Malvinas),Faroe Islands,Fiji,Finland,France,French Guiana,French Polynesia,French Southern and Antarctic Lands,Gabon,Gambia, The,Gaza Strip,Georgia,Germany,Ghana,Gibraltar,Glorioso Islands,Greece,Greenland,Grenada,Guadeloupe,Guam,Guatemala,Guernsey,Guinea,Guinea-Bissau,Guyana,Haiti,Heard Island and McDonald Islands,Holy See (Vatican City),Honduras,Hong Kong,Hungary,Iceland,India,Indonesia,Iran,Iraq,Ireland,Isle of Man,Israel,Italy,Jamaica,Jan Mayen,Japan,Jersey,Jordan,Juan de Nova Island,Kazakhstan,Kenya,Kiribati,Korea, North,Korea, South,Kuwait,Kyrgyzstan,Laos,Latvia,Lebanon,Lesotho,Liberia,Libya,Liechtenstein,Lithuania,Luxembourg,Macau,Macedonia,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Marshall Islands,Martinique,Mauritania,Mauritius,Mayotte,Mexico,Micronesia, Federated States of,Moldova,Monaco,Mongolia,Montserrat,Morocco,Mozambique,Namibia,Nauru,Navassa Island,Nepal,Netherlands,Netherlands Antilles,New Caledonia,New Zealand,Nicaragua,Niger,Nigeria,Niue,Norfolk Island,Northern Mariana Islands,Norway,Oman,Pakistan,Palau,Panama,Papua New Guinea,Paracel Islands,Paraguay,Peru,Philippines,Pitcairn Islands,Poland,Portugal,Puerto Rico,Qatar,Reunion,Romania,Russia,Rwanda,Saint Helena,Saint Kitts and Nevis,Saint Lucia,Saint Pierre and Miquelon,Saint Vincent and the Grenadines,Samoa,San Marino,Sao Tome and Principe,Saudi Arabia,Senegal,Serbia and Montenegro,Seychelles,Sierra Leone,Singapore,Slovakia,Slovenia,Solomon Islands,Somalia,South Africa,South Georgia and the South Sandwich Islands,Spain,Spratly Islands,Sri Lanka,Sudan,Suriname,Svalbard,Swaziland,Sweden,Switzerland,Syria,Taiwan,Tajikistan,Tanzania,Thailand,Timor-Leste,Togo,Tokelau,Tonga,Trinidad and Tobago,Tromelin Island,Tunisia,Turkey,Turkmenistan,Turks and Caicos Islands,Tuvalu,Uganda,Ukraine,United Arab Emirates,United Kingdom,United States,Uruguay,Uzbekistan,Vanuatu,Venezuela,Vietnam,Virgin Islands,Wake Island,Wallis and Futuna,West Bank,Western Sahara,Yemen,Zambia,Zimbabwe";
arr=arr.split(",");
countrySelect.innerHTML="";
arr.forEach((ele)=>{
    countrySelect.innerHTML+=`<option value="${ele}">${ele}</option>`;
})
let numReg = /^[0-9]{5,20}$/;

form.onsubmit=()=>{

    let valid =true;

    inputBox.forEach((ele,ind)=>{
        if(ind!=4)
        {
            if(ele.value=="")
            {
                ele.parentElement.classList.add("null");
                valid=false;
            }
            else{
                ele.parentElement.classList.remove("null");
            }
        }
    })

    if(!valid)
    {
        return false;
    }

    if(!numReg.test(inputBox[3].value))
    {
        inputBox[3].parentElement.parentElement.classList.add("not-valid");
        return false;
    }
    else{
        inputBox[3].parentElement.parentElement.classList.remove("not-valid");
    }

    let dt =new FormData(form);

    dt.append("addid",add_id)
    
    fetch('../php/acoount/edit_address.php', {
        method: 'POST',
        body: dt
    })
        .then(response => response.text())
        .then(data => {

            if(data.trim() == 'ok')
            {

                window.location.href="../pages/account_my_address.html";



            }

            console.log(data)
            return false;

        })
        .catch(error => {
            console.error(error);
        });

        
    
    return false;

}