import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class DataProvider {

    static getTestDataFromJson(filePath: string): any {
        try {
            // Use path.join for cross-platform compatibility
            const fullPath = path.resolve(process.cwd(), filePath);
            console.log(`Reading JSON file from: ${fullPath}`);
            const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            return data;
        } catch (error) {
            console.error(`Error reading JSON file: ${filePath}`, error);
            console.error(`Resolved path: ${path.resolve(filePath)}`);
            throw error;
        }
    }

    static getTestDataFromCsv(filePath: string): any[] {
        try {
            // Use path.join for cross-platform compatibility
            const fullPath = path.resolve(process.cwd(), filePath);
            console.log(`Reading CSV file from: ${fullPath}`);
            const fileContent = fs.readFileSync(fullPath, 'utf8');
            
            const data = parse(fileContent, {
                columns: true,
                skip_empty_lines: true,
                trim: true,
                relax_column_count: true,
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