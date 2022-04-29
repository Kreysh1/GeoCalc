import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AuthService, public _dialog: MatDialog) { }

  public sidebarShow: boolean = false;

  userLogged = this.authService.getUserLogged();

  openLoginDialog(): void {
    const dialogRef = this._dialog.open(LoginDialogComponent, {
      width: '500px'
    });

    dialogRef.afterOpened().subscribe(() => {
      console.log("The dialog was opened successfully.");
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(){
    //this.authService.logout();
  }

  getUserLogged(){
    //this.authService.getUserLogged().subscribe(res =>{
    //  console.log(`Email:${res?.email} Name:${res?.displayName}`);
    //});
  }

  ngOnInit(): void {
  }

}
