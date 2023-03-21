import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public checkboxes: any[] = [];

    public checkboxChange(data: any): void {
        this.checkboxes = data;
    }
}
