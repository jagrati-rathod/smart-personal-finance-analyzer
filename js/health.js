function checkHealthAlert(){

const health =
localStorage.getItem("healthConcern")

const expenses =
JSON.parse(localStorage.getItem("expenses")) || []

let fastFoodTotal = 0

expenses.forEach(exp=>{

if(exp.category === "Fast Food"){

fastFoodTotal += Number(exp.amount)

}

})

if(health === "digestion" && fastFoodTotal > 1000){

alert("⚠️ Health Alert: Fast food may worsen digestion!")

}

else if(health === "diabetes" && fastFoodTotal > 1000){

alert("⚠️ Health Alert: Fast food increases diabetes risk!")

}

else if(health === "heart" && fastFoodTotal > 1000){

alert("⚠️ Health Alert: Fast food affects heart health!")

}

else if(health === "weight" && fastFoodTotal > 1500){

alert("⚠️ Health Alert: Fast food may affect weight control!")

}

}