import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( 
    private firestore:Firestore
  ) { }

  addUser(products:Store){
    const StoreRef = collection(this.firestore, 'UserListData');
    return addDoc(StoreRef, products)    
  }
  
  GetUser():Observable<Store[]>{
    const StoreRef = collection(this.firestore,'UserListData');
    return collectionData(StoreRef, {idField:"id"})as Observable<Store[]>
  }
   
  DeleteUser(products:Store){
   const StoreRef = doc(this.firestore, `UserListData/${products.id}`)
   return deleteDoc(StoreRef)
  }
}
