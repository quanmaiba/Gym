import { MemberService } from './../../_services/member.service';
import { AlertifyjsService } from './../../_services/alertifyjs.service';
import { Member } from './../../_models/member';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  member: Member;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  submitted = false;
  event : string= ''
  constructor( private router: Router, private alertify: AlertifyjsService,
              private memberService :MemberService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: [false, Validators.required],
      codeMember: ['',],
      fullName: ['', Validators.required],
      dob: [null, Validators.required],
      address: ['', Validators.required],
      registrationDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      status: [true, Validators.required],
      image: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      typeOfServiceId: [null, Validators.required]
    });
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
  }

  _keyPressCode(event: string) {
  console.log(event)
  }



  get f() { 
    return this.registerForm.controls;
    
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {

    console.log(this.registerForm.value)
    this.submitted = true;

    if (this.registerForm.valid) {
      this.member = Object.assign({}, this.registerForm.value);
      this.memberService.createMember(this.member).subscribe(() => {
        this.router.navigate(['/members']);
        this.alertify.success('registration successful');
      }, error => {
          this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.submitted = false;
    this.registerForm.reset();
    this.alertify.message('canceled');
  }

}
