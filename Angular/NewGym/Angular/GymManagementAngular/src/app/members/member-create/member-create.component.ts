import { BlogPostService } from './../../services/blog-post.service';
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
              private memberService :MemberService, private fb: FormBuilder, private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      sex: [false, Validators.required],
      codeMember: ['Hehe',],
      fullName: ['', Validators.required],
      dob: [null, Validators.required],
      address: ['', Validators.required],
      registrationDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      status: [true, Validators.required],
      image: [''],
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

  register() { 
    this.submitted = true;
    
    if (this.registerForm.valid) {
      this.member =  this.registerForm.value;
      this.registerForm.value.sex = true 
      // this.member.status=true;
      this.memberService.createMember(this.member).subscribe(() => {
        // this.router.navigate(['/members']);
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
