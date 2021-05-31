//
// module pattern
//
const UIModule = (function () {
  let mealBefore;
  let caloriesBefore;

  const UIaddState = function () {
    console.log("inside add state");
    document.querySelector("#meal").value = "";
    document.querySelector("#calories").value = "";
    document.querySelector("#add").style.display = "initial";
    document.querySelector("#edit").style.display = "none";
  };

  // edit button state
  const UIeditState = function (e) {
    console.log("inside edit state");
    document.querySelector("#add").style.display = "none";
    document.querySelector("#edit").style.display = "flex";
    const parent = e;

    //displaying value to input fields
    mealBefore = parent.children[0].children[0].innerHTML;
    caloriesBefore = parent.children[0].children[1].innerHTML;

    mealBefore = mealBefore.replace(":", "");
    caloriesBefore = caloriesBefore.replace(" calories", "");

    document.querySelector("#meal").value = mealBefore;
    document.querySelector("#calories").value = Number(caloriesBefore);
  };

  //adding to local storage
  const addToStorage = function (currentMeal) {
    console.log("inside add to storage");
    if (JSON.parse(localStorage.getItem("meals")) === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }
    meals.push(currentMeal);

    localStorage.setItem("meals", JSON.stringify(meals));

    document.querySelector("#meal").value = "";
    document.querySelector("#calories").value = "";
  };

  //display from storage
  const displayFromStorage = function () {
    console.log("inside display from storage");
    document.querySelector("#items").innerHTML = "";
    const meals = JSON.parse(localStorage.getItem("meals"));
    if (meals != null) {
      let items = "";
      meals.forEach(function (meal) {
        for (key in meal) {
          items += `<li>
                    <p><strong>${key}:</strong><em> ${meal[key]} calories</em></p>
                    <i class="fas fa-pen  edit"></i>
                  </li>`;
        }
      });
      document.querySelector("#items").innerHTML = items;
    }
  };

  //edit button clicked for updating values
  const updating = function (updatedMeal, updatedCalories) {
    console.log("inside updating");
    let meals = JSON.parse(localStorage.getItem("meals"));
    const updated = {};
    updated[updatedMeal] = updatedCalories;
    let count = 0;
    let flag = false;
    for (let i = 0; i < meals.length; i++) {
      let meal = meals[i];
      for (key in meal) {
        {
          if (key === mealBefore) {
            meals[count] = updated;
            flag = true;
            break;
          } else {
            count++;
          }
        }
      }
      if (flag) {
        break;
      }
    }
    localStorage.setItem("meals", JSON.stringify(meals));
    displayFromStorage();
    UIaddState();
  };

  //delete particular meal from storage
  const deleting = function (currentMeal) {
    console.log("inside deleting");
    let meals = JSON.parse(localStorage.getItem("meals"));
    let count = 0;
    let flag = false;
    for (let i = 0; i < meals.length; i++) {
      let meal = meals[i];
      for (key in meal) {
        if (key === currentMeal) {
          meals.splice(count, 1);
          flag = true;
          break;
        } else {
          count++;
        }
      }
      if (flag) {
        break;
      }
    }

    localStorage.setItem("meals", JSON.stringify(meals));
    displayFromStorage();
    UIaddState();
  };
  //remove everything from storage
  const removeAllFromStorage = function () {
    localStorage.clear();
  };

  //calculate the total calories
  const calculateTotalCalories = function () {
    console.log("inside total calories");
    let total = 0;
    if (JSON.parse(localStorage.getItem("meals")) != null) {
      const meals = JSON.parse(localStorage.getItem("meals"));
      meals.forEach(function (meal) {
        for (key in meal) {
          total += Number(meal[key]);
        }
      });
    }
    document.querySelector("#total-calories").innerHTML = "";
    document.querySelector(
      "#total-calories"
    ).innerHTML = `Total Calories : ${total}`;
  };

  return {
    addState: function () {
      UIaddState();
    },
    editState: function (e) {
      UIeditState(e);
    },
    addToStorage: function (currentMeal) {
      addToStorage(currentMeal);
    },
    displayFromStorage: function () {
      displayFromStorage();
    },
    removeAllFromStorage: function () {
      removeAllFromStorage();
    },
    deleting: function (meal) {
      deleting(meal);
    },
    updating: function (updatedMeal, updatedCalories) {
      updating(updatedMeal, updatedCalories);
    },
    calculateTotalCalories: function () {
      calculateTotalCalories();
    },
  };
})();

//
// starting events
//
UIModule.addState();
UIModule.displayFromStorage();
UIModule.calculateTotalCalories();
//
// Event listeners
//

// Event listener for edit button for added values
document.querySelector("#items").addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-pen")) {
    UIModule.editState(e.target.parentElement);
  }
  e.preventDefault();
});

// Event listener for the back button
document.querySelector("#back").addEventListener("click", function (e) {
  UIModule.addState();
  e.preventDefault();
});

// Event listerner for clear button
document.querySelector("#clear-all").addEventListener("click", function (e) {
  UIModule.removeAllFromStorage();
  document.querySelector("#items").innerHTML = "";
  UIModule.addState();
  UIModule.calculateTotalCalories();
  e.preventDefault();
});

// Event listerner for add meal
document.querySelector("#add-meal").addEventListener("click", function (e) {
  let meal = document.querySelector("#meal").value;
  let calories = document.querySelector("#calories").value;

  if (meal === "" || calories === "") {
    alert("Enter all the values");
  } else {
    let currentMeal = {};
    currentMeal[meal] = calories;

    UIModule.addToStorage(currentMeal);
    UIModule.displayFromStorage();
    UIModule.calculateTotalCalories();
  }
  e.preventDefault();
});

// Event listerner for delete meal
document.querySelector("#delete-meal").addEventListener("click", function (e) {
  let meal = document.querySelector("#meal").value;
  UIModule.deleting(meal);
  UIModule.calculateTotalCalories();
  e.preventDefault();
});

// Event listerner for edit meal
document.querySelector("#edit-meal").addEventListener("click", function (e) {
  let meal = document.querySelector("#meal").value;
  let calories = document.querySelector("#calories").value;
  UIModule.updating(meal, calories);
  UIModule.calculateTotalCalories();
  e.preventDefault();
});
