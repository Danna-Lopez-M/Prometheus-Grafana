import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
export declare class DeliveriesService {
    private readonly deliveryRepo;
    constructor(deliveryRepo: Repository<Delivery>);
    create(createDeliveryDto: CreateDeliveryDto): Promise<{
        message: string;
        delivery: Delivery;
    }>;
    findAll(): Promise<Delivery[]>;
    findOne(id: string): Promise<Delivery>;
    update(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<{
        message: string;
        delivery: Delivery;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
