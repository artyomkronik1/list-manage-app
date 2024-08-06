// src/app/items/item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	private apiUrl = '../assets/items.json';  // Path to the JSON file

	constructor(private http: HttpClient) { }
	// get items from the file using http service
	getItems(): Observable<Item[]> {
		return this.http.get<Item[]>(this.apiUrl);
	}
}
