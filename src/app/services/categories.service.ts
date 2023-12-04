import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toaster: ToastrService) {
  }

  saveData(data: any) {
    this.afs.collection('categories').add(data).then(docRef => {
      this.toaster.success('Data insert Successfully')
    }).catch(error => {
      this.toaster.error(error);
    })
  }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  updateData(EditData: any, id: string) {
    this.afs.collection('categories').doc(id).update(EditData).then(docRef => {
      this.toaster.success('Data Updated Successfully ...');
    })
  }

  deleteData(id: string) {
    this.afs.collection('categories').doc(id).delete().then(docRef =>{
      this.toaster.error('Category was Deleted');
    })
  }
}
