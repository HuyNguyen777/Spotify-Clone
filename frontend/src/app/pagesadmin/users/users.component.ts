import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userList =[
    {
      userid: '1', 
      username: 'thai', 
      passwordhash: 'wwww',
      fullname: 'www',
      birthday: '12/09/2003', 
      accesstoken: 'dddd', 
      refreshtoken: 'ddd', 
      email: 'ddd',
      phone: '265848916591', 
      image_user: 'https://i.pravatar.cc/40?img=1', 
      is_active: '1', 
      role: '2'
    }
  ];

  isModalOpen = false;

  openCreate(){
    this.isModalOpen = true;
  }

  closeCreate(){
    this.isModalOpen = false;
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
      is_active: '', 
      role: ''
  }

  submitFormSong(){
    if (this.newUser.username && this.newUser.fullname) {
      const newUserId = 'U' + (this.userList.length + 1).toString().padStart(5, '0');
      this.userList.push({
        userid: newUserId,
        ...this.newUser
      });
  
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
        is_active: '', 
        role: ''
      };
      this.closeCreate();
    }
  }
}
