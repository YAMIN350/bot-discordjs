import { WorkSheet } from "xlsx";
import xlsx from 'xlsx'

export const convertJsonToExcel = (data: unknown[]): WorkSheet => {
    return xlsx.utils.json_to_sheet(data);
}

export const writeExcel = (worksheet: WorkSheet) => {
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'dataTest')
    xlsx.write(workbook, {bookType: 'xlsx', type: 'buffer'})
    xlsx.write(workbook, {bookType: 'xlsx', type: 'binary'})
    xlsx.writeFile(workbook, `${process.env.FILENAME_EXCEL}.xlsx`)
    console.log('file generated !')
}