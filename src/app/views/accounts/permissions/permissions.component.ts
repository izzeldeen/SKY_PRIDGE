import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";


@Component({
  selector: 'app-accounts',
  templateUrl: './permissions.component.html',
})
export class PermissionsComponent implements OnInit {
  active = 'Configuration';
  usersArray = ['Admin'];
  userName = '';

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  handleModal(modal) {
    this.modalService.open(modal, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
  }

  clearUsersArray() {
    this.usersArray = ['Admin'];
  }

  deleteUser(i: number) {
    this.usersArray = [...this.usersArray].filter((_, index) => i !== index);
  }

  
  resetAssignPermissionsAddForm() {
    this.userName = '';
  }

  submitAssignPermissionsAddForm() {
    console.log({ User: this.userName });
  }

  submitAddUser() {
    if (this.userName) {
      this.usersArray = [...this.usersArray, this.userName]
      this.userName = '';
    }
  }

  onUserSelected(userValue) {
    this.userName = userValue;
  }

  toggleClass(element: any) {
    element.closest('.parent-toggle').classList.toggle('active');
  }

  toogleViewMode(element: any) {
    element.closest('.customers').classList.toggle('grid-view-mode');
  }

  redirect(event: Event, modal) {
    const target = event.target as HTMLInputElement;
    
    if (!target.closest('.btn-delete')) {
      modal.dismiss('Close');
      this.router.navigateByUrl(target.closest('tr').dataset.link);
    }
  }
}