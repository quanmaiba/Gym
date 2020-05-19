import { SweetalertjsService } from './../../_services/sweetalert2.service';
import { MemberService } from './../../_services/member.service';
import { Member } from './../../_models/member';
import { Observable,Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';


import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  listMember: Member[];
  public temp: Object=false;
  dtOptions: DataTables.Settings = {};

  constructor(private memberService: MemberService, private sweetalertjsService : SweetalertjsService) { }

  ngOnInit() {  
    
    this.loadMembers();   
  }

  loadMembers() {
  this.memberService.getAllMembers().subscribe(
      (data => {
        this.listMember = data;
        this.temp = true;
      })
    )
  }
  
  delete(memberId : number, memberName: string){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        this.memberService.deleteMember(memberId).subscribe((data) => 
        console.log(""));
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
  }

    private extractData(res) {
      const body = res.json();
      return body.data || {};
    }
}
