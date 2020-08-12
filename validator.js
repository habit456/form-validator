/**
 * Validates a form control.
 * Designed to be used as Validator.start(e).checkFunctions().end();
 */
class Validator {
  /**
   * Not meant to be instantiated! Use Validator.start().
   */
  constructor(input, isValid, messageArr) {
    this.input = input;
    this.isValid = isValid;
    this.messageArr = messageArr;
  }

  static start(input) {
    return new Validator(input, true, []);
  }

  checkValidEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(this.input.value.trim().toLowerCase())) {
      this.isValid = false;
      this.messageArr.push("Invalid email");
    }

    return this.clone();
  }

  checkPasswordMatch(compareWith) {
    if (this.input.value != compareWith.value) {
      this.isValid = false;
      this.messageArr.push("Passwords do not match");
    }

    return this.clone();
  }

  checkRequired() {
    if (this.input.value.trim() === "") {
      this.isValid = false;
      this.messageArr.push(`${this.getFieldName(this.input)} is required`);
    }

    return this.clone();
  }

  checkLength(min, max) {
    const length = this.input.value.length;
    const name = this.getFieldName(this.input);

    if (length < min) {
      this.messageArr.push(`${name} must be at least ${min} characters`);
      this.isValid = false;
    }

    if (length > max) {
      this.messageArr.push(`${name} must be less than ${max} characters`);
      this.isValid = false;
    }

    return this.clone();
  }

  getFieldName(input) {
    const id = input.id;
    return id.charAt(0).toUpperCase() + id.slice(1, id.length);
  }

  clone() {
    return new Validator(this.input, this.isValid, this.messageArr);
  }

  end() {
    const formControl = this.input.parentElement;

    if (this.isValid) {
      formControl.className = "form-control success";
    } else {
      formControl.className = "form-control error";

      const small = formControl.querySelector("small");
      small.innerText = this.messageArr[0];
    }
  }
}
