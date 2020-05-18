import { MemberService } from "./../../_services/member.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Member } from "./../../_models/member";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-member-addoredit",
  templateUrl: "./member-addoredit.component.html",
  styleUrls: ["./member-addoredit.component.css"],
})
export class MemberAddoreditComponent implements OnInit {
 formaddedit: FormGroup;
  actionType: string;
 formaddeditTitle: string;
 formaddeditBody: string;
  memberId: number;
  errorMessage: any;
  existingMember: Member;

  constructor(
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router
  ) {
    const idParam = "id";
    this.actionType = "Create";
    if (this.avRoute.snapshot.params[idParam]) {
      this.memberId = this.avRoute.snapshot.params[idParam];
    }

    this.formaddedit = this.formBuilder.group({
      id: 0,
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
      typeOfServiceId: [null, Validators.required],
       
    });
  }

  ngOnInit(): void {
    if (this.memberId > 0) {
      this.actionType = 'Edit';
      this.memberService.getMember(this.memberId)
        .subscribe(data => (
          this.existingMember = data,
          this.formaddedit.controls['id'].setValue(data.id),
          this.formaddedit.controls['sex'].setValue(data.sex),
          this.formaddedit.controls['fullName'].setValue(data.fullName),
          this.formaddedit.controls['codeMember'].setValue(data.codeMember),
          this.formaddedit.controls['dob'].setValue(data.dob),
          this.formaddedit.controls['image'].setValue(data.image),
          this.formaddedit.controls['address'].setValue(data.address),
          this.formaddedit.controls['phoneNumber'].setValue(data.phoneNumber),
          this.formaddedit.controls['registrationDate'].setValue(data.registrationDate),
          this.formaddedit.controls['expirationDate'].setValue(data.expirationDate),
          this.formaddedit.controls['status'].setValue(data.status),
          this.formaddedit.controls['typeOfServiceName'].setValue(data.typeOfServiceName)
        ));
    }

  }

  save() {
    if (!this.formaddedit.valid) {
      return;
    }
    let member = this.formaddedit.value;

    if (this.actionType === 'Add') {    
      this.memberService.createMember(member)
        .subscribe((data) => {
          // this.router.navigate(['/blogmember', data.memberId]);
        });
    }

    if (this.actionType === 'Edit') {
      this.memberService.updateMember(member)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.formaddedit.get(this.formaddeditTitle); }
  get body() { return this.formaddedit.get(this.formaddeditBody); }
}
