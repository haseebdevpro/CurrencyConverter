const BASE_URL = 'https://v6.exchangerate-api.com/v6/cb9b7528a85ba935598d2f43/pair';

const dropdown = document.querySelectorAll(".dropdowns select");
const btn  = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for ( let select of dropdown){
for (let currCode in countryList){

  let newOption = document.createElement("option");
  newOption.innerText = currCode;
  newOption.value = currCode;
  if(select.name === "From" && currCode === "USD"){
    newOption.selected = "selected";
  } else if (select.name=== "To" && currCode === "PKR"){
    newOption.selected = "selected";
  }
  select.append(newOption);
}
select.addEventListener("change",(evt)=>{
  updateFlag(evt.target);
})
}

const updateExchangeRate = ()=>{
let amount =document.querySelector(".amount input");
let amountVal = amount.value;
if(amountVal === "" || amountVal < 1){
  amountVal = 1;
  amount.value = "1";
}
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
fetch(URL)
.then((result)=>{
return result.json()
})
.then ((result)=>{
 let  rate = result.conversion_rate;
 let finalAmount = (amountVal*rate);
 msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})
}

const updateFlag = (element)=>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`
let img = element.parentElement.querySelector("img");
img.src = newSrc;
}

btn.addEventListener("click",(evt)=>{
evt.preventDefault();
updateExchangeRate();
})

window.addEventListener("load",()=>{
  updateExchangeRate();
})