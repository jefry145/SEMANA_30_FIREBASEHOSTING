import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from 'src/app/interfaces/interface';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-postds',
  templateUrl: './postds.component.html',
  styleUrls: ['./postds.component.scss']
})
export class PostdsComponent {
    
    Products!:Store[];

  constructor(
    private database : DatabaseService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit():void{
         this.database.GetUser().subscribe(DataBaseProducts =>{
          this.Products = DataBaseProducts
         })
  }
  Delete(Products: Store){
    console.log(this.Products)
    const response = this.database.DeleteUser(Products)
    console.log(response)
    this._snackBar.open(`Row deleted!`,"ok");
  }



     //TABLA DE CONTENIDO
     displayedColumns: string[] = [ 'id','User','apellido', 'email','website', 'delete'];
     dataSource = this.Products;
     //</>
}
