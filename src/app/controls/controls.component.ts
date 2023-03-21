import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit, OnDestroy {
    @Output()
    public checkboxChangeEvent = new EventEmitter<any>();

    public checkboxes = this.fb.group({
        customCell: false,
        customHeader: false,
        treeTable: false,
        nestedRow: false,
        pagination: false,
        colPicking: false,
        pinnedCol: false,
        overlays: false,
        styles: false,
    });
    private subscription$ = new Subscription();

    constructor(private fb: FormBuilder) {}

    public ngOnInit(): void {
        this.subscription$.add(
            this.checkboxes.valueChanges.subscribe((data) => {
                this.checkboxChangeEvent.emit(data);
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}
