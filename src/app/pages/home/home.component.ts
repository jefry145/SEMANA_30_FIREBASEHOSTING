import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/servicios/database.service';


import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(
    private database : DatabaseService,
    private routes : Router,
    public dialog: MatDialog,
    
  ){}


  ngOnInit(): void {
    this.routes.navigate(["/home/posts"])
  }


 //DIALOGO
  openDialog(): void {
    this.dialog.open(DialogHomeComponent);
  }


}
@Component({
  selector: 'dialog-home-component',
  templateUrl: 'home.dialog.component.html',
})
export class DialogHomeComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogHomeComponent>,
    private database : DatabaseService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  //FORMULARIO
  public formLogin!: FormGroup;

  ngOnInit(): void {
  this.formLogin = this.formBuilder.group({
    user: ["", [Validators.required , Validators.minLength(3) , Validators.maxLength(25)]],
    apellido:["" ,[Validators.required , Validators.minLength(2)] ],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    website:["",[Validators.required]]
  });
  }

  async onSubmit(){
    const response = this.database.addUser(this.formLogin.value)
    console.log(response)
    this._snackBar.open(`Added User!`,"ok");
 }


}
