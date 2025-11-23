export declare class ComputerSpecsDto {
    processor: string;
    ram: string;
    storage: string;
    os: string;
}
export declare class PrinterSpecsDto {
    printTechnology: string;
    resolution: string;
    connectivity: string;
}
export declare class PhoneSpecsDto {
    screenSize: string;
    battery: string;
    camera: string;
    os: string;
}
export declare class CreateEquipmentDto {
    name: string;
    type: string;
    brand: string;
    model: string;
    description: string;
    price: number;
    stock: number;
    warrantyPeriod: string;
    releaseDate: string;
    image?: string;
    computerSpecs?: ComputerSpecsDto;
    printerSpecs?: PrinterSpecsDto;
    phoneSpecs?: PhoneSpecsDto;
}
