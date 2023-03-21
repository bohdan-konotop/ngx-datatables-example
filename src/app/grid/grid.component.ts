import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GridDataService } from './grid-data.service';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('table') table: any;

    @Input()
    public checkboxes: any;

    public data: any[] = [];
    public columns: any = {};

    public selectionType = SelectionType.multi;
    public treeColumnsExample = [
        { name: 'name', prop: 'name' },
        { name: 'pet', prop: 'pet' },
        { name: 'pet name', prop: 'pet name' },
    ];
    public treeRowsExample = [
        {
            name: 'Emilia',
            pet: 'dog',
            'pet name': 'Lord',
        },
        {
            name: 'John',
            pet: 'cat',
            'pet name': 'Alex',
        },
        {
            name: 'Alexa',
            pet: 'Golden Fish',
            'pet name': 'Spike',
        },
    ];
    private subscription$ = new Subscription();

    constructor(
        private dataService: GridDataService,
        private cdR: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.subscription$.add(
            this.dataService.rowsData$.subscribe((data) => {
                this.data = data;
            })
        );

        this.columns = [
            { name: 'id', prop: 'id' },
            { name: 'name', prop: 'name' },
            { name: 'phone', prop: 'phone' },
            { name: 'company', prop: 'company' },
            { name: 'date', prop: 'date' },
            { name: 'city', prop: 'city' },
            { name: 'country', prop: 'country' },
        ];
    }

    public ngOnChanges(changes: any) {
        if (!this.columns.length) return;

        if (changes.checkboxes.currentValue.pinnedCol) {
            this.columns[0].frozenLeft = true;
            console.log('id column was pinned');
        } else if (changes.checkboxes.currentValue.pinnedCol === undefined) {
            this.columns[0].frozenLeft = false;
            console.log('id column was unpinned');
        }

        if (changes.checkboxes.currentValue.nestedRow) {
            this.columns[1].treeColumn = true;
        } else if (!changes.checkboxes.currentValue.nestedRow) {
            this.columns[1].treeColumn = false;
        }
    }

    public ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    treeAction(event: any): void {
        const index = event.rowIndex;
        const row = event.row;
        if (row.treeStatus === 'collapsed' || !row.treeStatus) {
            row.treeStatus = 'expanded';
        } else {
            row.treeStatus = 'collapsed';
        }

        // this.columns[1].treeColumn = true;
        // this.columns[1].isTreeColumn = true;

        this.data = [...this.data];
    }

    public selectedColumns(event: any): void {
        console.log(event);
    }

    public toggleExpandRow(row: any) {
        this.table.rowDetail.toggleExpandRow(row);
    }

    public onDetailToggle(event: any): void {
        console.log('Detail Toggled', event);
    }
}
