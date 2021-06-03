function expand(selected) {
  document.querySelectorAll(".image").forEach(function (li) {
    if (li == selected) {
      li.style.flex = 9;
      li.children[1].style.display = "inherit";
      li.style.transition = `flex 1s ease-in`;
    } else {
      li.style.flex = 1;
      li.children[1].style.display = "none";
      li.style.transition = `flex 1s ease-in`;
    }
  });
}

document.querySelectorAll(".image").forEach(function (li) {
  li.onclick = function () {
    expand(li);
  };
});
