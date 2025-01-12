function validateForm() {
  const name = document.getElementsByName("name")[0];
  const surname = document.getElementsByName("surname")[0];
  const review = document.getElementsByName("review")[0];
  const date = document.getElementsByName("date")[0];
  console.log(name, surname, review, date);

  if (name.value.replace(/\s/g, "").length < 2) {
    alert("Please enter a valid name (at least 2 non-space characters).");
    return false;
  }

  if (surname.value.replace(/\s/g, "").length < 2) {
    alert("Please enter a valid Surname (at least 2 non-space characters).");
    return false;
  }

  if (review.value.replace(/\s/g, "").length < 10) {
    alert("Please enter at least 10 characters.");
    return false;
  }

  return true;
}
