import { SweetalertjsService } from './../../_services/sweetalert2.service';
import { MemberService } from "./../../_services/member.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Member } from "./../../_models/member";
import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";
import { AlertifyjsService } from "src/app/_services/alertifyjs.service";

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
  submitted = false;
  values: string = "";
  fullNamePattern = `^[a-z0-9_-]{4,15}$`;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  urlImage: any;

  constructor(
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyjsService, 
    private sweetalertjsService : SweetalertjsService
  ) {
    const idParam = "id";
    this.actionType = "Create";
    if (this.avRoute.snapshot.params[idParam]) {
      this.memberId = this.avRoute.snapshot.params[idParam];
    }

    this.formaddedit = this.formBuilder.group({
      id: 0,
      sex: ["Male", Validators.required],
      codeMember: [
        "",
        Validators.compose([
          Validators.required,
          // Validators.pattern(this.mobnumPattern),
        ]),
      ],
      fullName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
          // Validators.pattern(this.fullNamePattern),
        ])
      ],
      dob: [null, Validators.required],
      address: ["", Validators.required],
      registrationDate: [
        formatDate(Date.now(), "yyyy-MM-dd", "en"),
        Validators.required,
      ],
      expirationDate: ["", Validators.required],
      status: ["Online", Validators.required],
      image: [""],
      phoneNumber: [
        "",
        Validators.compose([
          Validators.required,
          // Validators.pattern(this.mobnumPattern),
        ]),
      ],
      typeOfServiceId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.memberId > 0) {
      this.actionType = "Edit";
      this.memberService.getMember(this.memberId).subscribe(
        (data) => (
          (this.existingMember = data),
          (this.urlImage = data.image),
          (this.formaddedit = this.formBuilder.group({
            id: data.id,
            sex: [data.sex == "Male" ? "Male" : "Female", Validators.required],
            codeMember: [data.codeMember],
            fullName: [
              data.fullName,
              Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(100),
                // Validators.pattern(this.fullNamePattern),
              ])
            ],
            dob: ["", Validators.required],
            address: [data.address, Validators.required],
            registrationDate: [
              formatDate(Date.now(), "yyyy-MM-dd", "en"),
              Validators.required,
            ],
            expirationDate: ["", Validators.required],
            status: [
              data.status == "Online" ? "Online" : "Offline",
              Validators.required,
            ],
            image: [''],
            phoneNumber: [data.phoneNumber, Validators.required],
            typeOfServiceId: [data.typeOfServiceId, Validators.required],
          }))         
        )
      );
    }
  }


  get f() {
    return this.formaddedit.controls;
  }

   
onSelectFile(event) { // called each time file input changes
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.urlImage = event.target.result;
    }
  }
}

  onKey(event: any) {
    const pattern = /[a-zA-Z ]/g;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }

    let value = event.target.value;
    this.values = value.replace(/[^a-zA-Z ]/g, "");
    if (event == null) {
      this.values = "";
    }
  }

  save() {
    this.submitted = true;

    if (!this.formaddedit.valid) {
      return;
    }
    let member = this.formaddedit.value;
    if (this.actionType === "Create") {
      let sex = member.sex == "Male" ? true : false;
      let status = member.status == "Online" ? true : false;

      this.formaddedit.value.sex = sex;
      this.formaddedit.value.status = status;

      if(!this.urlImage){
        this.formaddedit.value.image = "Updating Image";
      }
      this.formaddedit.value.image = this.urlImage;

      this.memberService.createMember(member).subscribe(
        (data) => {
          this.sweetalertjsService.success("Registration successful");
          this.reset();
          // this.router.navigate(['/blogmember', data.memberId]);
        },
        (error) => {
          this.sweetalertjsService.error(error);
        }
      );
    }

    if (this.actionType === "Edit") {
      // console.log(JSON.stringify(member))
      let sex = member.sex == "Male" ? true : false;
      let status = member.status == "Online" ? true : false;

      this.formaddedit.value.sex = sex;
      this.formaddedit.value.status = status;

      if(!this.urlImage){
        this.formaddedit.value.image = "Updating Image";
      }
      this.formaddedit.value.image = this.urlImage;

      this.memberService.updateMember(member).subscribe(
        (data) => {
          this.sweetalertjsService.success("Edit successful");
          this.router.navigate([this.router.url]);
        },
        (error) => {
          this.sweetalertjsService.error(error);
        }
      );
    }
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  cancel() {
    this.submitted = false;
    this.formaddedit.reset();
    // this.sweetalertjsService.message("canceled");
    this.router.navigate(["/"]);
  }

  reset() {
    this.formaddedit.reset();
    this.formaddedit = this.formBuilder.group({
      id: 0,
      sex: ["Male", Validators.required],
      codeMember: ["Hehe"],
      fullName: ["", Validators.required],
      dob: [null, Validators.required],
      address: ["", Validators.required],
      registrationDate: [
        formatDate(Date.now(), "yyyy-MM-dd", "en"),
        Validators.required,
      ],
      expirationDate: ["", Validators.required],
      status: ["Online", Validators.required],
      image: [""],
      phoneNumber: ["", Validators.required],
      typeOfServiceId: [null, Validators.required],
    });
  }

  get title() {
    return this.formaddedit.get(this.formaddeditTitle);
  }
  get body() {
    return this.formaddedit.get(this.formaddeditBody);
  }
}
