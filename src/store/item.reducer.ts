// src/app/items/store/item.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { Item } from '../interfaces/item';
import * as ItemActions from './item.actions';

export interface ItemState {
	items: Item[];
	loading: boolean;
	error: any;
}

export const initialState: ItemState = {
	items: [],
	loading: false,
	error: null,
};

const _itemReducer = createReducer(
	initialState,
	on(ItemActions.loadItems, state => ({ ...state, loading: true })),
	on(ItemActions.loadItemsSuccess, (state, { items }) => ({
		...state,
		items,
		loading: false
	})),
	on(ItemActions.loadItemsFailure, (state, { error }) => ({
		...state,
		loading: false,
		error
	})),
	on(ItemActions.addItem, (state, { item }) => ({
		...state,
		items: [...state.items, item]
	})),
	on(ItemActions.updateItem, (state, { item }) => ({
		...state,
		items: state.items.map(i => (i.id === item.id ? item : i))
	})),
	on(ItemActions.deleteItem, (state, { id }) => ({
		...state,
		items: state.items.filter(item => item.id !== id)
	}))
);

export function itemReducer(state: ItemState | undefined, action: Action) {
	return _itemReducer(state, action);
}
