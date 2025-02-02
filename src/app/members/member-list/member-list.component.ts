import { Component, inject } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [FormsModule, MemberCardComponent, PaginationModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  private accountService = inject(AccountService);
  memberService = inject(MembersService);
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]


  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.loadMembers();
  }

  resetFilters(){
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers()
  }

  pageChanged(event: any) {
    if (this.memberService.userParams().pageNumber !== event.page) {
      this.memberService.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
