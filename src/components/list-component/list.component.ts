import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Item } from '../../interfaces/item';
import * as ItemActions from '../../store/item.actions';
import * as ItemSelectors from '../../store/item.selectors';
import { ItemState } from '../../store/item.reducer';
import { EditItemDialogComponent } from 'src/dialogs/edit-item.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
	// items stream
	items$: Observable<Item[]>;
	// view mode
	viewMode: 'list' | 'tile' = 'list';
	tiledItems$: Observable<Item[]>; // Observable for filtered items in tile view
	selectedItem!: Item; // Store the selected item for editing
	editItemFlag: boolean = false;
	loading$: Observable<boolean>;
	error$: Observable<any>;
	ListItems = new MatTableDataSource<Item>([]);  //items in list view
	displayedColumns: string[] = ['color', 'name', 'createdDate', 'lastUpdate', 'createdBy'];
	searchForm: FormGroup;
	showForm: boolean = false;
	// behavioer subject to listen after filteres such as search value
	private filterSubject = new BehaviorSubject<string>('');

	// listen  after pagination  
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	// listen afte sort by NAME columns in table view
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private dialog: MatDialog,
		private store: Store<{ items: ItemState }>,
		private fb: FormBuilder
	) {
		// set observables
		this.items$ = this.store.pipe(select(ItemSelectors.selectAllItems));
		this.loading$ = this.store.pipe(select(ItemSelectors.selectItemsLoading));
		this.error$ = this.store.pipe(select(ItemSelectors.selectItemsError));
		this.searchForm = this.fb.group({
			search: ['']
		});

		// Initialize tiledItems$ with empty array
		this.tiledItems$ = of([]);
	}

	ngOnInit(): void {
		// get all items
		this.store.dispatch(ItemActions.loadItems());
		// initalize items in list view
		this.items$.subscribe(items => {
			this.ListItems.data = items;
			this.ListItems.paginator = this.paginator;
			this.ListItems.sort = this.sort;

		});
		// // initalzie items in tile view
		// const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
		// const endIndex = startIndex + this.paginator.pageSize;
		// this.tiledItems$ = this.items$.pipe(
		// 	map(items => {
		// 		// Apply search filter
		// 		const filteredItems = items.filter(item =>
		// 			item.name.toLowerCase().includes(this.filterSubject.value)
		// 		);
		// 		// Apply pagination
		// 		return filteredItems.slice(startIndex, endIndex);
		// 	})
		// );



	}

	ngAfterViewInit() {
		// make subscribe on paginator and update filtered items by the neeed
		this.paginator.page.subscribe(() => this.updateFilteredItems());


		// Subscribe to search form value changes
		this.searchForm.get('search')?.valueChanges.subscribe(value => {
			// set observable by search value 
			this.filterSubject.next(value.trim().toLowerCase());
			this.updateFilteredItems(); // Update filtered items when search value changes
		});
	}

	setView(mode: 'list' | 'tile'): void {
		this.viewMode = mode;
		if (this.paginator) {
			this.paginator.pageIndex = 0; // Reset to first page
			this.updateFilteredItems(); // Update filtered items to reflect the change
		}
	}

	updateFilteredItems() {
		// Update filtered items for both list and tile views
		const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
		const endIndex = startIndex + this.paginator.pageSize;

		// Update ListItems by search value
		this.ListItems.filter = this.filterSubject.value;

		// Update tiledItems$ based on current page and filter
		this.tiledItems$ = this.items$.pipe(
			map(items => {
				// Apply search filter
				const filteredItems = items.filter(item =>
					item.name.toLowerCase().includes(this.filterSubject.value)
				);
				// Apply pagination
				return filteredItems.slice(startIndex, endIndex);
			})
		);
	}

	openEditDialog(item: Item): void {
		// open edit item dialog
		const dialogRef = this.dialog.open(EditItemDialogComponent, {
			width: '700px',
			data: item
		});
		// make something after closing dialog (OPTIONAL)
		dialogRef.afterClosed().subscribe(result => {
		});
	}
	// open create item dialog
	openForm(): void {
		this.showForm = true;
	}
	// close dialog
	closeDialog(): void {
		this.showForm = false;
		this.editItemFlag = false;
	}
	// add item to store
	addItem(item: Item) {
		this.store.dispatch(ItemActions.addItem({ item }));
		this.closeDialog();
	}
	// update item in store

	updateItem(item: Item) {
		this.store.dispatch(ItemActions.updateItem({ item }));
		this.closeDialog();
	}
	// delete item (OPTIONAL)
	deleteItem(id: number) {
		this.store.dispatch(ItemActions.deleteItem({ id }));
	}
}
