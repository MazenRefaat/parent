import {
  Component,
  OnInit
} from '@angular/core';

import {faChevronRight} from '@fortawesome/fontawesome-free-solid'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  // users: Object = [{
  //     "id": 4,
  //     "email": "eve.holt@reqres.in",
  //     "first_name": "Eve",
  //     "last_name": "Holt",
  //     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
  //   },
  //   {
  //     "id": 5,
  //     "email": "charles.morris@reqres.in",
  //     "first_name": "Charles",
  //     "last_name": "Morris",
  //     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
  //   },
  //   {
  //     "id": 6,
  //     "email": "tracey.ramos@reqres.in",
  //     "first_name": "Tracey",
  //     "last_name": "Ramos",
  //     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
  //   }
  // ]

  users: Object = [];

  faChevronRight = faChevronRight;
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.listUsers();
    // .subscribe( usersData => {
    //   console.log(usersData);
    // })
  }

  listUsers() {
    this.userService.listUsers()
    .subscribe( usersData => {
      this.users = usersData.data
      // console.log(usersData.data)
    })
  }
  editUser(user) {
    console.log(user);
  }

  deleteUser(user) {
    console.log(user);
  }

  showUser(user) {
    console.log(user);
  }
}