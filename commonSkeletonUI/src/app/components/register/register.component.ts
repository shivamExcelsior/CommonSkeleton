import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  genders: string[] = ['Male', 'Femail', 'Other']
  hide = true
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildRegisterForm()
  }

  buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      selectGender: ['Male', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    }, { Validator: this.checkIfMatchingPasswords('password', 'cpassword') })
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  get name() {
    return this.registerForm.get('name')
  }

  get username() {
    return this.registerForm.get('username')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get dob() {
    return this.registerForm.get('dob')
  }

  get selectGender() {
    return this.registerForm.get('selectGender')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get cpassword() {
    return this.registerForm.get('cpassword')
  }

  onRegisterSubmit(formId: NgForm) {
    if(this.registerForm.invalid) {
      return false
    } else {
      console.log('Form Data:', this.registerForm.value)
      formId.resetForm()
      this.buildRegisterForm()
    }
  }

}
