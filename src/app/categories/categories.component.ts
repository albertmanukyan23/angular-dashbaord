import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../services/categories.service";
import {Category} from "../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<any>;
  formCategory: String | undefined = "";
  formStatus: String = "Add";
  categoryId: string = "";

  ngOnInit() {
    this.categoryService.loadData().subscribe(value => {
      this.categoryArray = value
      console.log(this.categoryArray)
    });
  }

  constructor(private categoryService: CategoriesService) {
    this.categoryArray = new Array<any>();
  }


  onSubmit(categoryForm: NgForm) {
    let categoryData: Category = {
      category: categoryForm.value.category
    }

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(categoryData, this.categoryId)
      this.formStatus = 'Add';
    }
    categoryForm.reset();

  }

  onEdit(category: string | undefined, id: string) {
    this.formCategory = category;
    this.formStatus = "Edit";
    this.categoryId = id;
  }


  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
