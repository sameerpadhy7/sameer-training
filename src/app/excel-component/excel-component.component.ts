import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-component',
  // templateUrl: './excel-component.component.html'

template:`<div>
<input type="file" (change)="onFileSelected($event)" accept=".xlsx, .xls" />
<hr>

<div *ngIf="excelData">

    <thead>
        <th *ngFor="let data of table_headers">
            <tr>{{data}}</tr>
        </th>
    </thead>
    <tbody>
        <tr *ngFor="let data of excelData">
            <td *ngFor="let item of data | keyvalue">{{ item.value }}</td>
        </tr>
    </tbody>

</div>  
</div>`  
})
export class ExcelComponentComponent {
  excelData: any;
  table_headers:any;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      //console.log(event.target.result.)

      const sheetName = workbook.SheetNames;

      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
      console.log('excel data', this.excelData);
      
      this.table_headers=Object.keys(this.excelData[0]).sort()
      console.log('table_headers:',this.table_headers)
    };
  }
}
