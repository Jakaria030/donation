const totalBalanceElement = document.getElementById("initial-balance");
const donationButton = document.getElementById("donation-button");
const historyButton = document.getElementById("history-button");
const donationCardContainer = document.getElementById("donation-card-container")
const donateNowButtons = donationCardContainer.querySelectorAll("#donation-card-container button");
const donationHistory = document.getElementById("donation-history");


// initial total balance
let totalBalance = Number(totalBalanceElement.innerText);

// valid input check
function isValidInput(value){
    if(isNaN(value) || value <= 0){
        return false;
    }

    return true;
}

// balance check
function haveEnoughMoney(value){
    if(totalBalance >= value){
        return true;
    }

    return false;
}

// donation history add
function addHistoryOfDonation(title, amount){
    const history = `
        <div class="p-5 sm:p-8 border rounded-xl space-y-2">
            <h2 class="text-xl font-bold text-secondary">${amount.toFixed(2)} ${title}</h2>
            <p class="text-secondary/70 font-light">Date: <span>${new Date()}</span></p>
        </div>
    `;

    donationHistory.innerHTML += history;
}

// toggle active status
function toggleActiveStatus(fromButton, toButton){
    // remove class list
    fromButton.classList.remove("border-primary", "bg-primary", "hover:bg-primary/80");
    toButton.classList.remove("border-secondary/30", "text-secondary/70","bg-gray-100", "hover:bg-gray-200/80");

    // add class list
    fromButton.classList.add("border-secondary/30", "text-secondary/70","bg-gray-100", "hover:bg-gray-200/80");
    toButton.classList.add("border-primary", "bg-primary", "hover:bg-primary/80");

}

// add event listener on donation button
donationButton.addEventListener("click", function(){
    donationHistory.classList.add("hidden");
    donationCardContainer.classList.remove("hidden");
    toggleActiveStatus(historyButton, donationButton);
});

// add event listener on history button
historyButton.addEventListener("click", function(){
    donationCardContainer.classList.add("hidden");
    donationHistory.classList.remove("hidden");
    toggleActiveStatus(donationButton, historyButton);
});

// collect all donate now button and add event listener
for(const donateNowButton of donateNowButtons){
    donateNowButton.addEventListener("click", function(){
        const currentDonationElement = donateNowButton.parentElement.previousElementSibling.children[1];
        const donationTitle = donateNowButton.parentElement.children[0].innerText;
        const inputField = donateNowButton.previousElementSibling;

        if(isValidInput(inputField.value)){
            const donationAmount = Number(inputField.value);

            if(!haveEnoughMoney(donationAmount)){
                alert("You haven't enough money for donation.");
                return;
            }

            addHistoryOfDonation(donationTitle, donationAmount);

            currentDonationElement.innerText = (Number(currentDonationElement.innerText) + donationAmount).toFixed(2);
            totalBalance = totalBalance - donationAmount;
            totalBalanceElement.innerText = totalBalance.toFixed(2);
            inputField.value = "";
        }else{
            alert("Please input valid amount for donation.");
            return;
        }
        document.getElementById("congrates-model").showModal();
    });
}