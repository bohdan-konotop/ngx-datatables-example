import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    declarations: [GridComponent],
    exports: [GridComponent],
    imports: [CommonModule, NgxDatatableModule],
})
export class GridModule {}
