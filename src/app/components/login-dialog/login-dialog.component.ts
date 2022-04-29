import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AbstractControl, FormGroup ,FormControl, FormGroupDirective, NgForm, Validators, PatternValidator, FormBuilder, Form} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomValidation } from 'src/app/utils/custom.validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>, 
    public formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
  ) { }
  
  //Password Eye
  matcher = new MyErrorStateMatcher();
  pass1Visibility = true;
  pass2Visibility = true;
  passConfVisibility = true;

  //Custom-Validator ========================================================================
  loginForm: FormGroup;
  signinForm: FormGroup;

  private buildForms(){
   //Login Form
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    });

    this.signinForm = this.formBuilder.group({
      username: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required, 
        CustomValidation.patternValidator(/[0-9]/, {hasNumber: true}),
        CustomValidation.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidation.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidation.patternValidator(/[!@#$%^&*()_+-=;':|,.<>/?]/, {hasSpecialCharacter: true}),
        Validators.minLength(8)
      ]),
      confirm: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email,
      ]),
      match: CustomValidation.passwordMatchValidator
    });
  }

  onLogin(){

  }

  onRegister(){

  }

  onReset(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.buildForms();
  }

}
