import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ItemActions from '../store/item.actions';
import { Item } from '../interfaces/item';

@Component({
	selector: 'app-edit-item-dialog',
	templateUrl: './edit-item-dialog.component.html',
	//styleUrls: ['./edit-item-dialog.component.css']
})
export class EditItemDialogComponent {
	itemForm: FormGroup;
	colorCode: string;

	constructor(
		private fb: FormBuilder,
		private store: Store,
		public dialogRef: MatDialogRef<EditItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Item
	) {
		// Initialize the form with the passed item data
		this.itemForm = this.fb.group({
			name: [data.name],
			color: [data.color],
			createdDate: [data.createdDate],
			lastUpdate: [this.formatDate(new Date())],
			createdBy: [data.createdBy]
		});
		this.colorCode = data.color || '#000000';

	}
	onColorChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.colorCode = input.value;
	}

	formatDate(date: Date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}
	onSave(): void {
		// Create an updated item object from the form values
		const updatedItem = { ...this.data, ...this.itemForm.value };
		// Dispatch the update action
		this.store.dispatch(ItemActions.updateItem({ item: updatedItem }));
		// Close the dialog
		this.dialogRef.close();
	}

	onCancel(): void {
		// Close the dialog without making changes
		this.dialogRef.close();
	}
}
