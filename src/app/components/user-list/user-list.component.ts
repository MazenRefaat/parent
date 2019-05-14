import {
  Component,
  OnInit
} from '@angular/core';

import {
  faChevronRight,
  faTimes
} from '@fortawesome/fontawesome-free-solid'
import {
  UserService
} from 'src/app/services/user.service';
import {
  ToastrService
} from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  // users (Array) representing users to be listed
  users = [];

  // selectedUser (Object) representing the selected User
  selectedUser = {};

  // currentUser (Object) representing the current User to make action to 
  currentUser: any = {};

  // actionType (String) representing the type of action to be made on user
  actionType = '';

  //Fontawesome Icons
  faChevronRight = faChevronRight;
  faTimes = faTimes;


  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.userService.listUsers()
      .subscribe(usersData => {
        this.users = usersData.data
      })
  }
  editUser(user) {
    event.stopPropagation();
    this.currentUser = user;
    this.actionType = 'edit';
  }

  deleteUser(user) {
    event.stopPropagation();
    this.currentUser = user;
    this.actionType = 'delete';
  }

  createNewUser() {
    this.currentUser = {
      "first_name": "",
      "last_name": ""
    }
    this.actionType = 'new';
  }

  selectUser(user) {
    this.userService.getUser(user.id)
      .subscribe(
        (res) => {
          console.log(res);
          this.selectedUser = res.data;
        },
        (err) => {
          console.log(err);
        }
      )
  }

  closeUser() {
    this.selectedUser = {};
  }

  handleModalAction($event) {
    // console.log($event);
    if ($event.action == 'edit') {
      if ($event.target.id == 'save') {
        let {
          id,
          ...editUser
        } = this.currentUser;

        editUser.first_name = $event.user.first_name;
        editUser.last_name = $event.user.last_name;

        this.userService.editUser(id, editUser)
          .subscribe((res) => {
            this.toaster.success('User Edited Successfully');
            console.log(res);
          })
        this.currentUser = {};
      } else {
        this.currentUser = {};
      }
    } else if ($event.action == 'delete') {
      if ($event.target.id == 'confirm') {
        this.userService.deleteUser(this.currentUser)
          .subscribe(() => {
            this.toaster.success('User Deleted Successfully');
          })

        this.currentUser = {};
      } else {
        this.currentUser = {};
      }
    } else {
      if ($event.target.id == 'save') {
        try {
          this.userService.createUser($event.user)

            .subscribe(
              (res) => {
                console.log(res);
                this.toaster.success('User Created Successfully');
                this.currentUser = {};
              },
              (err) => {
                this.toaster.error(err);
                // console.log(err);
              }
            )
        }
        catch(err) {
          this.toaster.error(err);
        }

        
      } else {
        this.currentUser = {};
      }
    }
  }

  handleUserAction($event) {
    if ($event.id == 'delete') {
      this.deleteUser(this.selectedUser);
    } else {
      this.editUser(this.selectedUser);
    }
  }
}