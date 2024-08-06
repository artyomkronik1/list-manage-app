import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Item } from '../../interfaces/item';

@Component({
	selector: 'app-item-card',
	templateUrl: './item-card.component.html',
	styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
	@Input() item: Item | undefined;
	@ViewChild('container') containerRef!: ElementRef;

	// Method to handle mouse over event
	onMouseOver(): void {
		const itemCard = this.containerRef.nativeElement.querySelector('.item-card');
		if (itemCard) {
			itemCard.classList.add('item-card-grow');
		}

		const itemName = this.containerRef.nativeElement.querySelector('.item-name');
		if (itemName) {
			itemName.classList.add('item-name-grow');
		}


	}

	// Method to handle mouse out event
	onMouseOut(): void {
		const itemCard = this.containerRef.nativeElement.querySelector('.item-card');
		if (itemCard) {
			itemCard.classList.remove('item-card-grow');
		}

		const itemName = this.containerRef.nativeElement.querySelector('.item-name');
		if (itemName) {
			itemName.classList.remove('item-name-grow');
		}
	}
}
