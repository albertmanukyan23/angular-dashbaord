import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(
    selectedImage: string,
    postData: any,
    formStatus: string,
    id: string
  ) {
    const filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('image loaded');
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          if (formStatus === 'Add New') {
            this.saveData(postData);
          } else {
            this.updateData(id, postData);
          }
        });
    });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Data Insert Successfully');
        this.router.navigate(['/posts']);
      });
  }

  loadData() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadDataById(id: string) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }

  updateData(id: string, postData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Data Updated Successfully');
        this.router.navigate(['/posts']);
      });
  }

  deleteImage(postImagePath: string, id: string) {
    this.storage.storage
      .refFromURL(postImagePath)
      .delete() .then(() => {
        this.deleteData(id);
      });
  }

  deleteData(id: string) {
    this.afs
      .collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        this.toastr.warning('Data was deleted successfully...');
      });
  }
  
  markFeatured(id:string, featuredData:any){
    this.afs.doc(`posts/${id}`).update(featuredData).then(()=>{
      this.toastr.info('Featured status updated');
    })
  }

}
