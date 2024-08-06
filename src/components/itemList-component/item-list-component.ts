import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Item } from '../../interfaces/item';

@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
	@Input() item: Item | undefined;
	@ViewChild('container') containerRef!: ElementRef;

	// Method to handle mouse over event
	onMouseOver(): void {
		const itemList = this.containerRef.nativeElement.querySelector('.item-list');
		if (itemList) {
			itemList.classList.add('item-list-grow');
		}

		const itemName = this.containerRef.nativeElement.querySelector('.item-name');
		if (itemName) {
			itemName.classList.add('item-name-grow');
		}


	}

	// Method to handle mouse out event
	onMouseOut(): void {
		const itemList = this.containerRef.nativeElement.querySelector('.item-list');
		if (itemList) {
			itemList.classList.remove('item-list-grow');
		}

		const itemName = this.containerRef.nativeElement.querySelector('.item-name');
		if (itemName) {
			itemName.classList.remove('item-name-grow');
		}
	}
}
