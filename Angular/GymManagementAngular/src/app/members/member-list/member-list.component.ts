import { MemberService } from './../../_services/member.service';
import { Member } from './../../_models/member';
import { Observable,Subject, Subscription } from 'rxjs';



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
 
  constructor(private memberService: MemberService) { }

  ngOnInit() {  
    
    this.loadBlogPosts();   
  }

  loadBlogPosts() {
  this.memberService.getAllMembers().subscribe(
      (data => {
        this.listMember = data;
        this.temp = true;
      })
    )
  }

    private extractData(res) {
      const body = res.json();
      return body.data || {};
    }
}
