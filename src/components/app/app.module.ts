import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { itemReducer } from 'src/store/item.reducer';
import { ItemEffects } from 'src/store/item.effects';
import { ItemFormComponent } from '../itemForm-component/item-form.component';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { ItemCardComponent } from '../itemCard-component/item-card.component';
import { EditItemDialogComponent } from 'src/dialogs/edit-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListComponent } from '../list-component/list.component';
import { ItemListComponent } from '../itemList-component/item-list-component';

@NgModule({
  declarations: [
    AppComponent,
    ItemFormComponent,
    ListComponent,
    ItemCardComponent,
    ItemListComponent,
    EditItemDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Import Angular Material animations
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    StoreModule.forRoot({ items: itemReducer }),
    EffectsModule.forRoot([ItemEffects]),
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [EditItemDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
