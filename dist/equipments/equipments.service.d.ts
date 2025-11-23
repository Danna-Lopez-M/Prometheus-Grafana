import { Repository } from 'typeorm';
import { Equipment } from './entities/equipment.entity';
import { ComputerSpecs } from './entities/computer-specs.entity';
import { PrinterSpecs } from './entities/printer-specs.entity';
import { PhoneSpecs } from './entities/phone-specs.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { EquipmentResponseDto } from './dto/equipment-response.dto';
export declare class EquipmentsService {
    private readonly equipmentRepo;
    private readonly computerSpecsRepo;
    private readonly printerSpecsRepo;
    private readonly phoneSpecsRepo;
    constructor(equipmentRepo: Repository<Equipment>, computerSpecsRepo: Repository<ComputerSpecs>, printerSpecsRepo: Repository<PrinterSpecs>, phoneSpecsRepo: Repository<PhoneSpecs>);
    create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>;
    findAll(): Promise<EquipmentResponseDto[]>;
    findOne(id: string): Promise<Equipment>;
    update(id: string, data: any): Promise<Equipment>;
    remove(id: string): Promise<void>;
    updateStock(id: string, newStock: number): Promise<Equipment>;
    private toResponseDto;
}
