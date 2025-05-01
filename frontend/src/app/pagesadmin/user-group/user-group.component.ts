import { Component } from '@angular/core';

@Component({
  selector: 'app-user-group',
  standalone: false,
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.css'
})
export class UserGroupComponent {
  usergroupList = [{
    role_id: '1',
    role_name: 'admin',
    deception: 'quyen admin'
  }];

  isModalOpen = false;

  openCreate(){
    this.isModalOpen = true;
  }

  closeCreate(){
    this.isModalOpen = false;
  }

  newRole = {
    roleid: '',
    roleName: '',
    deception: ''
  }

  submitFormSong(){
    if (this.newRole.roleid && this.newRole.deception) {
      this.newRole= { 
        roleid: '',
        roleName: '',
        deception: ''
      };
      this.closeCreate();
    }
  }
  
}
