let latitude, longitude = "";

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onFailure);
}else{
    alert("Your browser does not support navigation...");
}

function onSuccess (position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    const api_key = "28747ff133fe4e59baf9dd22832e924d";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;
    alert("latitude : "+position.coords.latitude +" and longitude : "+position.coords.longitude);

    fetch(url)
        .then(response => response.json())
        .then(result => {
            let details = result.results[0].components;
            let {country, postcode, province} = details;
            
            document.getElementById("results").innerHTML = 
            `<p>Country   : ${country}</p>
             <p>Post Code : ${postcode}</p>
             <p>Province  : ${province}</p>
            `;
        });
            

    /*    document.querySelector(".position").textContent = 
     `latitude -> ${position.coords.latitude} longitude -> ${position.coords.longitude}`;

    */     
 }

function onFailure(error){
    if(error.code == 1 ){
        alert("user denied access!");
    } else if (error.code == 2){
        alert("location could not be accessed...");
    } else {
        alert("Unknown error occurred...");
    }
}