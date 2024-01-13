// Targeting the elements that we need to update dynamically
const updateBalance = document.querySelector('#upBalance');
const updateIncome = document.querySelector("#upIncome");
const updateExpense = document.querySelector("#upExpense");
const updateList = document.querySelector("#Items");
const formData = document.querySelector("#userForm");
const desc = document.querySelector("#description");
const amount = document.querySelector("#amount");
const btn = document.querySelector("#submitForm");
const text = document.querySelector("#headingBalance");

// Function to update total balance available
function updateTotal(currIncome, currExpense) {
    let total = currIncome - currExpense;
    console.log(total);
    updateBalance.innerText = `$${(currIncome - currExpense).toFixed(2)}`;
    if (total > 0) {
        updateBalance.style.color = "green";

    }
    else if(parseInt(total)==0){
        updateBalance.style.color = "black";
    }
    else if (total < 0) {
        updateBalance.style.color = "red";
        text.innerText = "Your Debt";
    }

}

// Function to update overall balance parameters-- Income and Expense
function funcBalance(value) {
    let currIncome = parseFloat(updateIncome.innerText.slice(1));
    let currExpense = parseFloat(updateExpense.innerText.slice(1));
    if (value > 0) {
        currIncome += parseFloat(value);
        updateIncome.innerText = `$${currIncome.toFixed(2)}`;
    }
    else {
        currExpense += -1 * parseFloat(value);
        updateExpense.innerText = `$${currExpense.toFixed(2)}`;
    }
    updateTotal(currIncome, currExpense);

}

// Function to handle Income and Expense parameters after deleting some transaction
function updateAfterDelete(value) {
    const prevTotal = parseFloat(updateBalance.innerText.slice(1));
    if (value > 0) {
        const prevIncome = parseFloat(updateIncome.innerText.slice(1));
        updateIncome.innerText = `$${(prevIncome - value).toFixed(2)}`;
        updateBalance.innerText = `$${(prevTotal - value).toFixed(2)}`;

    }
    
    else {
        const prevExpense = parseFloat(updateExpense.innerText.slice(1));
        updateExpense.innerText = `$${(prevExpense - -1 * value).toFixed(2)}`;
        updateBalance.innerText = `$${(prevTotal - value).toFixed(2)}`;
    }
    const newValIncome = parseFloat(updateIncome.innerText.slice(1));
    const newValExpense = parseFloat(updateExpense.innerText.slice(1));
    updateTotal(newValIncome,newValExpense);
} 

// Adding event listener to add new transaction in the history section
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let descrip = desc.value;
    let amt = amount.value;
    if (descrip != "" && amt != 0) {
        const newDiv = document.createElement('div');
        const newEle = document.createElement("li");
        const newSpan = document.createElement("span");
        const newBtn = document.createElement("button");
        newEle.classList.add("listEle");
        newBtn.innerText = "Remove";
        newEle.append(`${descrip} :- `);
        newSpan.innerText = `$${parseFloat(amt).toFixed(2)}`;
        newEle.appendChild(newSpan);
        newBtn.classList.add('deleteHistory');
        newEle.append(newBtn);
        newDiv.append(newEle);
        newDiv.classList.add("liItems");
        updateList.appendChild(newDiv);
        funcBalance(amount.value);
        amount.value = "";
        desc.value = "";


    }
    else {
        alert("Empty item cannot be added!");
    }
})

// Event listener to handle clicking of remove button to remove transactions
updateList.addEventListener('click', (e) => {
    if (e.target.nodeName == "BUTTON") {
        const userAns = confirm("Are you sure!");
        if (userAns == true) {
            const deleEle = e.target.parentElement.parentElement;
            const deleAmt = parseFloat(e.target.previousSibling.innerText.slice(1));
            updateAfterDelete(deleAmt);
            deleEle.remove();
        }
    }
})