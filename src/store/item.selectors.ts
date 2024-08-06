// src/app/items/store/item.selectors.ts
import { createSelector } from '@ngrx/store';
import { ItemState } from './item.reducer';

export const selectItemState = (state: { items: ItemState }) => state.items;

export const selectAllItems = createSelector(
	selectItemState,
	(state: ItemState) => state.items
);

export const selectItemsLoading = createSelector(
	selectItemState,
	(state: ItemState) => state.loading
);

export const selectItemsError = createSelector(
	selectItemState,
	(state: ItemState) => state.error
);
