import { Component, OnInit } from '@angular/core';
import { Role, RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-group',
  standalone: false,
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.css'
})
export class UserGroupComponent implements OnInit {
 roles : Role[] = [];

 constructor(private roleService: RoleService){}

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

  ngOnInit(): void {
      this.roleService.getRole().subscribe((data) =>{
        console.log("list" ,data);
        this.roles = data;
      });
  }
  
}
