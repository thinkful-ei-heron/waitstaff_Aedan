'use strict';
const store = {
    lastItem: {
        subTotal: 0,
        tip: 0
    },
    tipTotal: 0,
    mealCount: 0
};

function renderPage() {
    //get form html
    let form = getFormHtml();
    //get section html
    let section = getSectionHtml();
        //get customer charges html
        //get my earnings html
    let main = form + section;
    $('main').html(main);
    //add form and section = biglongstring
    //main.html(biglongstring)
}

function getFormHtml() {
    return `
    <form id = 'js-meals'>
        <header>
            <h2>Enter the Meal Details</h2>
        </header>
        <label for="js-base-meal">Base Meal Price: $
            <input type="text" id = 'js-base-meal'>
        </label><br>
        <label for="js-tax-rate">Tax Rate: %
            <input type="text" id = 'js-tax-rate'>
        </label><br>
        <label for="js-tip-percent">Tip Percentage: %
            <input type="text" id = 'js-tip-percent'>
        </label><br>
        <button type = 'submit' id = 'js-submit-meal'>Submit</button>
        <button type = 'reset' id = 'js-reset-meal'>Cancel</button>
    </form>`;
}

function getSectionHtml() {
    let cc = getCustomerChargesHtml();
    let me = getMyEarningsHtml();

    let section = `<section>${cc}${me}</section>`
    return section;
}

function getCustomerChargesHtml() {
    return `
    <div id = 'js-customer'>
        <header>
            <h2>Customer Charges</h2>
        </header>
        <ul>
            <li>Subtotal<span id = 'js-subtotal'>${store.lastItem.subTotal.toFixed(2)}</span></li>
            <li>Tip<span id = 'js-tip'>${store.lastItem.tip.toFixed(2)}</span></li>
            <li>Total<span id = 'js-subtotal-plus-tip'>${(store.lastItem.subTotal + store.lastItem.tip).toFixed(2)}</span></li>
        </ul>
    </div>`;
}

function getMyEarningsHtml() {
    return `
    <div id = 'js-earnings'>
        <header>
            <h2>My Earnings Info</h2>
        </header>
        <ul>
            <li>Tip Total:<span id = 'js-total-tip'>${store.tipTotal.toFixed(2)}</span></li>
            <li>Meal Count:<span id = 'js-total-meal'>${store.mealCount}</span></li>
            <li>Average Tip Per Meal:<span id = 'js-ave-tip'>${(store.tipTotal / store.mealCount).toFixed(2)}</span></li>
        </ul>
    </div>`;
}

function updateCharges(bmp, tax, tip) {
    let subtotal = (bmp * tax) + bmp;
    let finalTip = subtotal * tip; 

    store.lastItem.subTotal = subtotal;
    store.lastItem.tip = finalTip;

    store.tipTotal += finalTip;
    store.mealCount++;
}

function reset() {
    store.lastItem.subTotal = 0;
    store.lastItem.tip = 0;
    store.mealCount = 0;
    store.tipTotal = 0;
}

function handleFormSubmit() {
    $('main').on('submit', '#js-meals', e => {
        e.preventDefault();
        
        let bmp = parseInt($('#js-base-meal').val());
        let tax = parseInt($('#js-tax-rate').val()) /100;
        let tip = parseInt($('#js-tip-percent').val()) /100;

        if (!isNaN(bmp) && !isNaN(tax) && !isNaN(tip)) {
            updateCharges(bmp, tax, tip);
            renderPage();
        } else alert('Please enter numbers only.');
        
    });
}

function handleReset() {
    $('#js-reset-page').on('click', e => {
        reset();
        renderPage();
    }); 
}

function main() {
    renderPage();
    handleFormSubmit();
    handleReset();
}

$(main);