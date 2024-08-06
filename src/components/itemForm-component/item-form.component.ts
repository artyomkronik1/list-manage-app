import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../interfaces/item';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-item-form',
	templateUrl: './item-form.component.html',
	styleUrls: ['./item-form.component.css'],
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0 })),
			transition(':enter', [
				style({ opacity: 0 }),
				animate('300ms', style({ opacity: 1 }))
			]),
			transition(':leave', [
				style({ opacity: 1 }),
				animate('300ms', style({ opacity: 0 }))
			])
		])
	]
})
export class ItemFormComponent {
	itemForm: FormGroup;
	@Output() close = new EventEmitter<void>();
	@Output() save = new EventEmitter<Item>();

	constructor(private fb: FormBuilder) {
		this.itemForm = this.fb.group({
			name: ['', Validators.required],
			description: [''],
			lastUpdate: [this.formatDate(new Date())],
			createdDate: [this.formatDate(new Date())],
			createdBy: ['', Validators.required],
			color: ['#ffffff'] // Default color value
		});
	}
	formatDate(date: Date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}
	onSave() {
		if (this.itemForm.valid) {
			this.save.emit(this.itemForm.value);
			this.closeForm();
		}
		else {
			alert('Please fill out all required fields.');
		}
	}


	onCancel() {
		this.closeForm();
	}

	private closeForm() {
		this.close.emit();
	}
}
