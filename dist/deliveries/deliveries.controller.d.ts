import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveriesController {
    private readonly deliveriesService;
    constructor(deliveriesService: DeliveriesService);
    create(createDeliveryDto: CreateDeliveryDto): Promise<{
        message: string;
        delivery: import("./entities/delivery.entity").Delivery;
    }>;
    findAll(): Promise<import("./entities/delivery.entity").Delivery[]>;
    findOne(id: string): Promise<import("./entities/delivery.entity").Delivery>;
    update(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<{
        message: string;
        delivery: import("./entities/delivery.entity").Delivery;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
