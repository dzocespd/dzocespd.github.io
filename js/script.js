const enterCity = document.getElementById("enterCity");
const myBtn = document.getElementById("myBtn");
const cityResult = document.getElementById("cityResult");
const weatherResult = document.getElementById("weatherResult");
const weatherDescription = document.getElementById("weatherDescription");
const dateRes = document.getElementById("date");
const resultId = document.getElementById("resultId");
const errImg = document.getElementById("errImg");
const errParag = document.getElementById("errParag");
const loader = document.getElementById("loader");
const key = "d02f63e09ab9ce4f6de597aab7837f68";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const today = new Date().toLocaleDateString();

// Taka treba da se povika
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}



const getData = async () => {
    let response = await fetch(url + enterCity.value + `&units=metric` + `&appid=${key}`);
    if (response.ok){
        let data = await response.json();
        console.log(data);
        printData(data);
        
    }else {
        errParag.innerText = `There is no such city name!`
        errImg.style.display = `inline-block`;   
    };
    
};
const clear = () => {
    errImg.style.display = `none`;  
    errParag.innerText = "";
    cityResult.innerText = "";
    weatherResult.innerText = "";
    dateRes.innerText = "";
    weatherDescription.innerText = "";
};

const printData = (data) => {
    if (data != null) {
        clear()
        resultId.classList.add("everyResult");
        cityResult.innerText = data.name;
        weatherResult.innerText += `${Math.round(data.main.temp)} °c`
        weatherDescription.innerText += `
        ${data.weather[0].main}
        ${data.weather[0].description}`
        dateRes.innerText = `Today date
        ${today}`
    }else{
        errImg.style.display = `inline-block`;  
        errParag.innerText = `Something is wrong mate!`
    }
};


myBtn.addEventListener("click", function () {
    if(Number(enterCity.value) === parseInt(enterCity.value)){
        alert(`You can't enter numbers!`)
    } // Proverka za broevi. Gi faka vo fetch, no 123 pominuva
    else{
        loader.style.display = "block";
        resultId.classList.remove("everyResult");
        clear();
        setTimeout(() => {
            loader.style.display = "none";
            getData();
        }, 2000);
    }
    
});
