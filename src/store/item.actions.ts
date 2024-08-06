// src/app/items/store/item.actions.ts
import { createAction, props } from '@ngrx/store';
import { Item } from '../interfaces/item';

export const loadItems = createAction('[Item List] Load Items');

export const loadItemsSuccess = createAction(
	'[Item List] Load Items Success',
	props<{ items: Item[] }>()
);

export const loadItemsFailure = createAction(
	'[Item List] Load Items Failure',
	props<{ error: any }>()
);
// add item
export const addItem = createAction(
	'[Item List] Add Item',
	props<{ item: Item }>()
);
// update item
export const updateItem = createAction(
	'[Item List] Update Item',
	props<{ item: Item }>()
);
//  delete item (OPTIONAL)
export const deleteItem = createAction(
	'[Item List] Delete Item',
	props<{ id: number }>()
);
