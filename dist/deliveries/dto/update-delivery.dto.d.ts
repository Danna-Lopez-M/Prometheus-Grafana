import { CreateDeliveryDto } from './create-delivery.dto';
declare const UpdateDeliveryDto_base: import("@nestjs/common").Type<Partial<CreateDeliveryDto>>;
export declare class UpdateDeliveryDto extends UpdateDeliveryDto_base {
    status?: 'pending' | 'accepted' | 'rejected' | 'in-review';
    technicalObservations?: string;
}
export {};
