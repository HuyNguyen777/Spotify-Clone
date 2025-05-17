import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  userList: any[] = [];
  roles: any[] = [];
  selectedFile: File | null = null;
  isModalOpen = false;
  formErrors: { [key: string]: string[] } = {};
  isEditMode = false;
  editUserId: number | null = null;

  constructor(private userService: UserService, private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadRole();
  }

  loadUser(){
    this.userService.getUsers().subscribe((res: any[]) => {
      console.log('Users: ', res);
      this.userList = res.map(user => {
        // Nếu ảnh không có http thì thêm domain backend
        if (user.image_user && !user.image_user.startsWith('http')) {
          user.image_user = `http://127.0.0.1:8000/${user.image_user}`;
        }
        return user;
      });
    });
  }

  loadRole(){
    this.roleService.getRole().subscribe((res: any) => {
      this.roles = res;
    })
  }

  openCreate(){
    this.isModalOpen = true;
  }

  editUser(user: any) {
  this.isModalOpen = true;
  this.isEditMode = true;
  this.editUserId = user.user_id;

  this.newUser = {
      username: user.user_name,
      passwordhash: '', // không điền lại mật khẩu
      fullname: user.fullname,
      birthday: user.birthday,
      accesstoken: '',
      refreshtoken: '',
      email: user.email,
      phone: user.phone,
      image_user: user.image_user,
      is_active: user.is_active,
      role: user.role_id,
    };
  }

  deleteUser(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa user này?')) {
      this.userService.deleteUser(id).subscribe(() => {
        alert('Xóa thành công!');
        this.loadUser();
      });
    }
  }

  closeCreate(){
    this.newUser = {
      username: '', 
      passwordhash: '',
      fullname: '',
      birthday: '', 
      accesstoken: '', 
      refreshtoken: '', 
      email: '',
      phone: '', 
      image_user: '', 
      is_active: true, 
      role: ''
    }
    this.isModalOpen = false;
    this.selectedFile = null;
    this.isEditMode = false;
    this.editUserId = null;
  }

  newUser = { 
      username: '', 
      passwordhash: '',
      fullname: '',
      birthday: '', 
      accesstoken: '', 
      refreshtoken: '', 
      email: '',
      phone: '', 
      image_user: '', 
      is_active: true, 
      role: ''
  }

    // Hàm để tạo ảnh đại diện ngẫu nhiên nếu không có file ảnh
  public generateRandomAvatar(username: string): string {
     const name = encodeURIComponent(username.trim());
    return `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=64`;
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  submitFormUser(){
    // Kiểm tra nếu không chọn ảnh, sẽ tạo ảnh đại diện tự động
    if (!this.selectedFile) {
      this.newUser.image_user = this.generateRandomAvatar(this.newUser.username);
    }

     const formData = new FormData();
    formData.append('user_name', this.newUser.username);
    formData.append('passwordhash', this.newUser.passwordhash);
    formData.append('fullname', this.newUser.fullname);
    formData.append('birthday', this.newUser.birthday);
    formData.append('email', this.newUser.email);
    formData.append('phone', this.newUser.phone);
    formData.append('role', this.newUser.role.toString());
    formData.append('is_active', this.newUser.is_active ? '1' : '0');

    // Nếu có ảnh, thêm vào formData
    if (this.selectedFile) {
      formData.append('image_user', this.selectedFile);
    } else {
      // Nếu không có file, gửi luôn URL ảnh
      formData.append('image_user', this.newUser.image_user);
    }

    if(!this.isEditMode){
      this.userService.createUser(formData).subscribe(() => {
        alert('Thêm Thành công !');
        this.closeCreate();
        this.loadUser();
      });
    } else if (this.editUserId !== null) {
      this.userService.updateUser(this.editUserId, formData).subscribe(() => {
        alert('Cập nhật thành công!');
        this.closeCreate();
        this.loadUser();
      });
    }
  }
}
