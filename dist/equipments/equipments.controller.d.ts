import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { EquipmentResponseDto } from './dto/equipment-response.dto';
export declare class EquipmentsController {
    private readonly equipmentsService;
    constructor(equipmentsService: EquipmentsService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>;
    findAll(): Promise<EquipmentResponseDto[]>;
    findOne(id: string): Promise<Equipment>;
    update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment>;
    remove(id: string): Promise<void>;
}
