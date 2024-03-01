/* Copyright of GENIAL INGELE (2024). This calculator is merely an estimation of what your income tax would cost on a monthly basis. 
    Hence, GENIAL INGELE is not liable for any inaccuracies found in this code. We are trying to guide you in making a decision in the best way we can, 
    but the accurate information will be given to you by your employer or tax consultant.
    NOTE: Data found on this code is based on South African laws and rates of February 2024.
    
    DATE: 27 FEBRUARY 2024
    
    GENIAL INGELE */


    /*TODO 
    * Automatically separate large numbers with comma or point when typed in.
    */

    /* ---- Let's start with some input validations ----- */

    //A validation function to ensure that only numbers between 0 - 9 are entered

// A validation function to ensure that DECIMAL NUMBERS WITH COMMA only entered
function isDecimalNumberWithComma(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;

  // Check if a comma or a period has already been typed.
  var hasComma = evt.target.value.includes(",");
  var hasPeriod = evt.target.value.includes(".");

  // Allow numbers (0-9), the comma (,) character, and the period (.) character if they haven't been typed.
  if ((charCode >= 48 && charCode <= 57) || (charCode === 44 && !hasComma) || (charCode === 46 && !hasPeriod)) {
    // If it's a comma or a period, set the corresponding flags to true.
    if (charCode === 44) {
      hasComma = true;
    }
    if (charCode === 46) {
      hasPeriod = true;
    }
    return true;
  } else {
    return false;
  }
}

//Separating the thousands
// ---- TO DO -----

/* 
//Use the enter key to trigger calculation
for (let i = 0 ; i < input_fields.length ; i++){
//Ensure that there is data when the loop runs
if (input_fields[i].value != null){

  // Execute a function when the user presses a key on the keyboard
  input_fields[i].addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit").click();

      }
  });     
}
} */



/* ------ The TAX CALCULATOR -------*/

//DEDUCTIONS 
let taxableIncome = 0;
let yourBracketMax = 0;
let yourFixedAmount = 0;
let yourRebate = 0;
let UIF = 0;
let UIFCap = 17_712;

//TAX BRACKETS
let incomeBrackets = [1, 237_100, 370_500, 512_800, 673_000, 857_900, 1_817_000];

//RATES OF TAX BASED ON THE BRACKET
let percentOfTax = [(18/100), (26/100), (31/100), (36/100), (39/100), (41/100), (45/100)]

//FIXED AMOUNTS BASED ON THE BRACKET
let fixedAmount = [0, 42_678, 77_362, 121_475, 179_147, 251_258, 644_489]

//TAX REBATES
// Primary , ​Secondary (65 and older), Tertiary (75 and older)
let incomeTaxRebates = [17_235 , 9_444, 3_145]

//TAX THRESHOLDS
// Under 65, ​65 and older, ​75 and older
let incomeThreshold = [95_750, 148_217, 165_689];

//DONATIONS TAX LIMIT
let monthlyDonationsLimit = (100_000/12);
let yearlyDonationsLimit = 100_000;

//------ GET HTML ELEMENTS -----

//PRIMARY BUTTONS
const submitButton = document.getElementById("submit");
const resetButton= document.getElementById("reset");

//SECONDARY BUTTON/LINKS
const seeAdvanced = document.getElementById("seeAdvanced");

//CONTAINERS
const resultsContainer = document.getElementById("resultsContainer");
const additionalContainer = document.getElementById("additionalContainer");
const seeAdvancedToggle = document.getElementById("seeAdvancedToggle");
const mainContainer = document.getElementById("mainContainer");
const thankYou = document.getElementById("thankYou");

//HIDE CONTAINERS BECAUSE SUBMIT BUTTON CLICKED
mainContainer.style.width = "320px";
resultsContainer.style.display = "none";
additionalContainer.style.display = "none";
thankYou.style.display = "none";


//SCREEN SIZE FOR MOBILE VERSIONS
let screenWidth = window.screen.width;

// ----------------- THE MAIN EVENT "SUBMIT BUTTON" STARTS HERE --------------------------------

seeAdvancedToggle.addEventListener("click", function(event){
    additionalContainer.style.display = "block";
    seeAdvancedToggle.style.backgroundColor = "#00003a";
    seeAdvancedToggle.style.color = "#FFFFFF";
    thankYou.style.display = "block";
});

//----- THIS IS THE MAIN FUNCTION -----
submitButton.addEventListener("click", function(event){

event.preventDefault(); //so that it stops refreshing
event.stopPropagation();

//PRIMARY VARIABLES
const age = Number(document.getElementById("age").value);
const mainIncome = Number(document.getElementById("mainIncome").value);

//SECONDARY VARIABLES
   //this is not the cleanest way to get the value but hey we can help each other out. 
   //I do realise there are duplicate declarations. I'm working on it.
    const providentFundValue= Number(document.getElementById("providentFund").value);
    const pensionFundValue = Number(document.getElementById("pensionFund").value);
    const monthlyDonationsValue = Number(document.getElementById("monthlyDonations").value);

//Function to calculate UIF
function yourUIFFunc(mainIncome){
    if(mainIncome >= UIFCap ){
        let UIF = (1/100) * UIFCap;
        UIF = Number(UIF);
        return UIF; 
    }
    else if(mainIncome < UIFCap){
        let UIF =(1/100) * mainIncome;
        UIF = Number(UIF);
        return UIF; 
    }
}

//Function to check if tax is applicable based on mainIncome and age (thresholds)
function shouldPayTaxFunc(ageParam, mainIncomeParam){
    //now let's check if tax is applicable. 
    //We check if the age is less than 65 and if the mainIncome is less than monthly threshold (threshold/12)

    if( ageParam < 65 && mainIncomeParam < (incomeThreshold[0]/12)){
        return false;
    }
    else if( ((ageParam >= 65) && (ageParam <75)) && mainIncomeParam < (incomeThreshold[1]/12)){
        return false;
    }
    else if( ((ageParam >= 75)) && mainIncomeParam < (incomeThreshold[2]/12)){
        return false;
    }
    else{
        return true;
    }
}

//
function yourRebateFunc(age){
    let yearlyRebate;

    if(age < 65 ){
        yearlyRebate = incomeTaxRebates[0];
        return yearlyRebate; 
    }
    else if (age >= 65 && age < 75){
        yearlyRebate = incomeTaxRebates[1];
        return yearlyRebate; 
    }
    else if (age >= 75){
        yearlyRebate = incomeTaxRebates[2];
        return yearlyRebate; 
    }
    else {
        alert("Wrong age used!")
    }
}

//Function to calculate taxable income
function taxableIncomeFunc(mainIncomeParam){
    let taxableIncomeInFunc;

    //temporary validation variable
    let allDeductions =  providentFundValue + pensionFundValue + monthlyDonationsValue;

    //checking that no value entered is greater than the mainIncome
  
    if(allDeductions < mainIncomeParam){

        //now let's check if tax is applicable. 
        if(shouldPayTaxFunc(age, mainIncome)){
            taxableIncomeInFunc = mainIncomeParam - (providentFundValue + pensionFundValue + monthlyDonationsValue);
            taxableIncomeInFunc = Number(taxableIncomeInFunc);
            return taxableIncomeInFunc;
        }
        else {
            return 0;
        }
    }
    else {
        alert("Your deductions cannot be greater than your Income");
    }
}

//A function to find the monthlyTax using the brackets given by SARS.
function yourMonthlyTaxFunc(taxableIncomeParam){

    //for this, I am trying to find a more effective way to select the condition such as a for loop
    let monthlyRebate = yourRebateFunc(age)/12; 
    
    let yearlyTaxableIncome = taxableIncomeParam *12; 
    
    let rateOfTax;

    let monthlyTax; 

    // Bracket 1 : 1 – 237 100 
    if(yearlyTaxableIncome >= incomeBrackets[0] && yearlyTaxableIncome <= incomeBrackets[1]){
        rateOfTax = percentOfTax[0] * yearlyTaxableIncome;
        monthlyTax = (rateOfTax/12) - (monthlyRebate);
        monthlyTax = monthlyTax;
        return monthlyTax;
    }

    // Bracket 2 : 237 101 – 370 500
    else if(yearlyTaxableIncome > incomeBrackets[1] && yearlyTaxableIncome <= incomeBrackets[2]){
        rateOfTax = (percentOfTax[1]) * (yearlyTaxableIncome - incomeBrackets[1]);
        rateOfTax = fixedAmount[1] + rateOfTax;
        monthlyTax =(rateOfTax/12) - (monthlyRebate);
        monthlyTax = monthlyTax;
        return monthlyTax;
    }

    // Bracket 3 : 370 501 – 512 800
    else if(yearlyTaxableIncome > incomeBrackets[2] && yearlyTaxableIncome <= incomeBrackets[3]){
        rateOfTax = (percentOfTax[2]) * (yearlyTaxableIncome - incomeBrackets[2]);
        rateOfTax = fixedAmount[2] + rateOfTax;
        monthlyTax =(rateOfTax/12) - (monthlyRebate);
        monthlyTax = monthlyTax;
        return monthlyTax;
    }    

    // Bracket 4 : 512 801 – 673 000
    else if(yearlyTaxableIncome > incomeBrackets[3] && yearlyTaxableIncome <= incomeBrackets[4]){
        rateOfTax = (percentOfTax[3]) * (yearlyTaxableIncome - incomeBrackets[3]);
        rateOfTax = fixedAmount[3] + rateOfTax;
        monthlyTax =(rateOfTax/12) - (monthlyRebate);
        monthlyTax = monthlyTax;
        return monthlyTax;
    }
    
    // Bracket 5 : 673 001 – 857 900
    else if(yearlyTaxableIncome > incomeBrackets[4] && yearlyTaxableIncome <= incomeBrackets[5]){
        rateOfTax = (percentOfTax[4]) * (yearlyTaxableIncome - incomeBrackets[4]);
        rateOfTax = fixedAmount[4] + rateOfTax;
        monthlyTax =(rateOfTax/12) - (monthlyRebate);
        monthlyTax = monthlyTax;
        return monthlyTax;
    } 

    // Bracket 6 : 857 901 – 1 817 000
    else if(yearlyTaxableIncome > incomeBrackets[5] && yearlyTaxableIncome <= incomeBrackets[6]){
        rateOfTax = (percentOfTax[5]) * (yearlyTaxableIncome - incomeBrackets[5]);
        rateOfTax = fixedAmount[5] + rateOfTax;
        let monthlyTax =(rateOfTax/12) - (monthlyRebate);
        monthlyTax = monthlyTax;
        return monthlyTax;
    } 

    // Bracket 7 : 1 817 001 and above
    else if(yearlyTaxableIncome > incomeBrackets[6]){
        rateOfTax = (percentOfTax[6]) * (yearlyTaxableIncome - incomeBrackets[6]);
        rateOfTax = fixedAmount[6] + rateOfTax;
        monthlyTax =(rateOfTax/12) - (monthlyRebate);
        monthlyTax = monthlyTax;
        return monthlyTax;
    } 

    //This is for those who do not qualify for income tax (i.e. within threshold)
    else if (yearlyTaxableIncome < 1){
       monthlyTax = 0;
       return monthlyTax;
    }
}

    resultsContainer.style.display = "none"; //to the container initially

    //Now, check if we're using a phone

    if (screenWidth <= 420){
        setTimeout(function() {
            mainContainer.style.width = "320px"; //change the size of the main container
            resultsContainer.style.width = "100%"; //change the size of the main container  
        }, 500);
    }

    //check if it is a tablet
    else if (screenWidth > 420 && screenWidth <= 760){
        setTimeout(function() {
            mainContainer.style.width = "100%"; //change the size of the main container
            resultsContainer.style.width = "100%"; //change the size of the main container  
         }, 500);
    }
    else if(screenWidth > 760){
        setTimeout(function() {
            mainContainer.style.width = "900px"; //change the size of the main container
        }, 500);
    }

    //Now we output the information processed above to the HTML page
    //By assigning our variables to each HTML element

    let taxableIncome = taxableIncomeFunc(mainIncome);
    document.getElementById("taxableIncome").textContent = numberWithSpaces(Math.round(taxableIncome));

    //monthly tax
    let monthlyTax;

    //double check if tax is within threshold
    if(yourMonthlyTaxFunc(taxableIncome) < 1){

        monthlyTax =  0;
        document.getElementById("monthlyTax").textContent = numberWithSpaces(monthlyTax);
    }
    else{ 
        monthlyTax = Math.round(yourMonthlyTaxFunc(taxableIncome));
        document.getElementById("monthlyTax").textContent = numberWithSpaces(monthlyTax);
    }

    let UIF = yourUIFFunc(mainIncome);
    document.getElementById("UIF").textContent = Number(UIF.toFixed(2));

    let threshold = shouldPayTaxFunc(age, mainIncome);
    document.getElementById("threshold").textContent = threshold;

    let rebate = yourRebateFunc(age);
    document.getElementById("rebate").textContent = rebate;

    let netPay = mainIncome - monthlyTax - providentFundValue - pensionFundValue - UIF - monthlyDonationsValue;

    document.getElementById("netPay").textContent = numberWithSpaces(Math.round(netPay));

    submitButton.textContent = "Processing...";
 
    //FOR THE "RE-CALCULATE BUTTON"
        //Now, check if we're using a phone

        if (screenWidth <= 420){
            setTimeout(function() {
                submitButton.textContent = "CALCULATE";
        //if you want to scroll automatically 
        //to a section after results button is clicked.
              }, 500); 

              setTimeout(function() {
                window.location.hash = "resultsContainer"; 
        //if you want to scroll automatically 
        //to a section after results button is clicked.
              }, 1000);      
        }
        //check if it is a tablet
        else if (screenWidth > 420 && screenWidth <= 760){
            setTimeout(function() {
                submitButton.textContent = "RE-CALCULATE";
              }, 1000);    
        
        }
        else if(screenWidth > 760){
            setTimeout(function() {
                submitButton.textContent = "RE-CALCULATE";
              }, 1000);    
        
        }
    

    setTimeout(function() {
        resultsContainer.style.display = "block";
      }, 1000);

      /*
      //if you want to scroll automatically to a section after results button is clicked.
          setTimeout(function() {
        window.location.hash = "copyright";
      }, 500);

      */

});

function numberWithSpaces(variable_to_split) {
    return variable_to_split.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }


resetButton.addEventListener("click", 
    //reset form values
    function reset(){
    var form = document.getElementById("calculator_input_form");
    form.reset;
    }
  );
