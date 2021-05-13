// hiding section 2
const sec2 = document.querySelector(".section-2");
sec2.style.display = "None";
// hiding error section
const error = document.querySelector("#error-section");
error.style.display = "None";
// hidding loading section
const load = document.querySelector("#loading-section");
load.style.display = "None";

// calculate button
const calculateButton = document.querySelector("#section-1").lastElementChild;

calculateButton.addEventListener("click", function (e) {
  // getting input values
  const loanAmount = Number(document.querySelector("#amount").value);
  const interest = Number(document.querySelector("#interest").value);
  const years = Number(document.querySelector("#repay-years").value);

  if (
    loanAmount === 0 ||
    years === 0 ||
    isNaN(loanAmount) ||
    isNaN(interest) ||
    isNaN(years)
  ) {
    error.style.display = "inherit";
    sec2.style.display = "None";
    setTimeout(function () {
      error.style.display = "none";
    }, 3000);
  } else {
    // displaying loading for 2 sec and output after that
    load.style.display = "inherit";
    sec2.style.display = "None";
    setTimeout(function () {
      load.style.display = "None";
      sec2.style.display = "inherit";
    }, 2000);

    const totalInterest = (loanAmount * interest * years) / 100;
    const totalAmount = totalInterest + loanAmount;
    const perMonthCost = totalAmount / (years * 12);

    // setting output in ui
    //   1) Monthly payment

    const x = document.querySelector(".section-2").children[1].children[1];
    x.innerText = String(perMonthCost.toFixed(2));

    //  2) Total Payment
    const y = document.querySelector(".section-2").children[2].children[1];
    y.innerText = String(totalAmount.toFixed(2));

    //  3) Total Interest
    const z = document.querySelector(".section-2").children[3].children[1];
    z.innerText = String(totalInterest.toFixed(2));

    // sec2.style.display = "inherit";
    error.style.display = "None";

    //   resetting input values
    document.querySelector("#amount").value = "";
    document.querySelector("#interest").value = "";
    document.querySelector("#repay-years").value = "";
  }
  e.preventDefault();
});
