import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-component',
  templateUrl: './excel-component.component.html',
  styleUrls: ['./excel-component.component.css'],
})
export class ExcelComponentComponent {
  excelData: any;

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
    };
  }
}
