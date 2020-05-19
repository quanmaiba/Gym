import { MemberService } from './../../_services/member.service';
import { Member } from './../../_models/member';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  
  blogPosts: Member[];
  public temp: Object=false;
  constructor(private blogPostService: MemberService) { }

  ngOnInit() {
    
    this.loadBlogPosts();
  }

  loadBlogPosts() {
   this.blogPostService.getAllMembers().subscribe(
      (data => {
        this.blogPosts = data;
        this.temp = true;
      })
    )
    console.log(this.blogPosts)
  }

}
