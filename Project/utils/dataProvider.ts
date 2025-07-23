import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class DataProvider {

    static getTestDataFromJson(filePath: string): any {
        try {
            const fullPath = path.resolve(filePath);
            const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            return data;
        } catch (error) {
            console.error(`Error reading JSON file: ${filePath}`, error);
            throw error;
        }
    }

    static getTestDataFromCsv(filePath: string): any[] {
        try {
            const fullPath = path.resolve(filePath);
            const fileContent = fs.readFileSync(fullPath, 'utf8');
            
            // More flexible CSV parsing options
            const data = parse(fileContent, {
                columns: true,
                skip_empty_lines: true,
                trim: true,
                skip_records_with_error: true
            });
            return data;
        } catch (error) {
            console.error(`Error reading CSV file: ${filePath}`, error);
            console.error(`Resolved path: ${path.resolve(filePath)}`);
            throw error;
        }
    }
}