import { ComputerSpecs } from './computer-specs.entity';
import { PrinterSpecs } from './printer-specs.entity';
import { PhoneSpecs } from './phone-specs.entity';
export declare class Equipment {
    id: string;
    name: string;
    type: string;
    brand: string;
    model: string;
    description: string;
    price: number;
    stock: number;
    warrantyPeriod: string;
    releaseDate: Date;
    image?: string;
    isInRepair: boolean;
    computerSpecs: ComputerSpecs;
    printerSpecs: PrinterSpecs;
    phoneSpecs: PhoneSpecs;
}
