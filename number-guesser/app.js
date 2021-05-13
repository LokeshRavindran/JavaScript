// getting the input value
let enteredValue = document.querySelector("#number");

//submit button
const submit = document.querySelector("#game-wrap").children[4];

//guesses left
let guesses = 3;

// generate a random number
let rand = Math.ceil(Math.random() * 10);
console.log(rand);

submit.addEventListener("click", function (e) {
  // check if number is in range
  if (enteredValue.value > 10) {
    alert("Please enter a valid number");
  } else {
    const section = document.querySelector("#game-wrap");

    if (rand == enteredValue.value) {
      //   setting styles for the input box
      section.children[2].setAttribute("type", "text");
      section.children[2].style.border = "1px solid green";
      section.children[2].style.borderRadius = "2px";

      // changin submit button to play again
      submit.innerText = "Play again";

      //   displaying the output result
      section.lastElementChild.setAttribute("id", "output-correct");
      section.lastElementChild.innerText = `${enteredValue.value} is correct!`;

      //   play again
      submit.addEventListener("click", function (e) {
        section.lastElementChild.style.display = "None";
        location.reload();
      });
    } else {
      //   reducing guesses
      guesses -= 1;

      // checking if guesses are exhausted
      if (guesses == 0) {
        // changin submit button to play again
        submit.innerText = "Play again";
        section.lastElementChild.innerText = `Sorry game over, the correct answer was ${rand}`;
        submit.addEventListener("click", function (e) {
          section.lastElementChild.style.display = "None";
          location.reload();
        });
      } else {
        section.lastElementChild.setAttribute("id", "output-wrong");
        //   setting output for wrong answer
        section.lastElementChild.innerText = `${enteredValue.value} is not correct, you have ${guesses} guesses left`;
      }
    }
    e.preventDefault();
  }
});
