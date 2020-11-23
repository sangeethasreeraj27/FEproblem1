import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FalconDashboardRoutingModule } from './falcon-dashboard-routing.module';
import { FalconDashboardComponent } from './falcon-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DescriptionComponent } from './components/description/description.component';
import { TaskComponent } from './components/task/task.component';
import { MatCardModule } from '@angular/material/card';
import { FindComponent } from './components/find/find.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelectorFormComponent } from './components/selector-form/selector-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ResultComponent } from './components/result/result.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [FalconDashboardComponent, HomeComponent, HeaderComponent, DescriptionComponent, TaskComponent, FindComponent, SelectorFormComponent, ResultComponent],
  imports: [
    CommonModule,
    FalconDashboardRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule
  ]
})
export class FalconDashboardModule { }
