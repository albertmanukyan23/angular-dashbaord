import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layouts/header/header.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {CategoriesComponent} from './categories/categories.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CategoriesService} from "./services/categories.service";
import {NewPostComponent} from './posts/new-post/new-post.component';
import {AllPostsComponent} from './posts/all-posts/all-posts.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import { PostsService } from './services/posts.service';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SubscribersComponent } from './subscribers/subscribers.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        CategoriesComponent,
        NewPostComponent,
        AllPostsComponent,
        LoginComponent,
        SubscribersComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        AngularEditorModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        AngularFireAuthModule


    ],
    providers: [CategoriesService, PostsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
