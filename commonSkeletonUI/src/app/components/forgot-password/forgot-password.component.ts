import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForgotPasswordForm()
  }

  buildForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get email() {
    return this.forgotPasswordForm.get('email')
  }

  onForgotSubmit(formId: NgForm) {
    if(this.forgotPasswordForm.invalid) {
      return false
    } else {
      console.log('Form Data:', this.forgotPasswordForm.value)
      formId.resetForm()
      this.buildForgotPasswordForm()
    }
  }

}
