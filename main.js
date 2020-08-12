function main() {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password1 = document.getElementById("password");
  const password2 = document.getElementById("password2");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    checkUsername(username);

    checkEmail(email);

    checkPasswords(password1, password2);
  });
}

function checkUsername(username) {
  Validator.start(username).checkRequired().checkLength(3, 15).end();
}

function checkEmail(email) {
  Validator.start(email).checkRequired().checkValidEmail().end();
}

function checkPasswords(password1, password2) {
  Validator.start(password1).checkRequired().checkLength(6, 25).end();

  Validator.start(password2)
    .checkRequired()
    .checkLength(6, 25)
    .checkPasswordMatch(password1)
    .end();
}

main();
