import { Component, OnInit } from '@angular/core';
import { Role, RoleService } from '../../services/role.service';

export interface NewRole {
  role_name: string;
  deception: string;
}

@Component({
  selector: 'app-user-group',
  standalone: false,
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.css'
})
export class UserGroupComponent implements OnInit {
 roles : Role[] = [];
 isEditMode = false;
 editRoleId: number | null = null;

 constructor(private roleService: RoleService){}

  isModalOpen = false;

  openCreate(){
    this.isModalOpen = true;
  }

  closeCreate(){
    this.isModalOpen = false;
  }

  editRole(role: Role) {
    this.isEditMode = true;
    this.isModalOpen = true;
    this.editRoleId = role.role_id;
    this.newRole = {
      role_name: role.role_name,
      deception: role.deception
    };
  }

  newRole: NewRole = {
    role_name: '',
    deception: ''
  };

  submitFormRole(){
    if(this.isEditMode && this.editRoleId !== null){
      this.roleService.updateRole(this.editRoleId, this.newRole).subscribe({
        next: () => {
          this.fetchRole();
          this.closeCreate();
        }
      })
    } else{
      this.roleService.createRole(this.newRole).subscribe({
        next: () =>{
          this.closeCreate();
          this.fetchRole();
        },
        error: (err) => {
          console.log('loi', err);
        }
       });
    }
  }

  deleteRole(id: number) {
    if (confirm("Bạn có chắc muốn xoá không?")) {
      this.roleService.deleteRole(id).subscribe({
        next: () => this.fetchRole(),
        error: (err) => console.error("Xoá thất bại", err)
      });
    }
  }

  //load lai ds
  fetchRole(){
    this.roleService.getRole().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) =>{
        console.log('Loi load danh sach', err);
      }
    });
  }

  ngOnInit(): void {
      this.roleService.getRole().subscribe(
        { next:(data) =>{
          console.log("list" ,data);
          this.roles = data;
        },
        error: (err) =>{
          console.error('Loi ', err);
        }
      });
  }
  
}
