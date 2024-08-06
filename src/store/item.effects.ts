// src/app/items/store/item.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ItemActions from './item.actions';
import { Item } from '../interfaces/item';

@Injectable()
export class ItemEffects {
	private apiUrl = '../assets/items.json'; // Path to the JSON file

	constructor(private actions$: Actions, private http: HttpClient) { }
	// effect 
	loadItems$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ItemActions.loadItems),
			switchMap(() =>
				this.http.get<Item[]>(this.apiUrl).pipe(
					map(items => ItemActions.loadItemsSuccess({ items })),
					catchError(error => of(ItemActions.loadItemsFailure({ error })))
				)
			)
		)
	);
}
