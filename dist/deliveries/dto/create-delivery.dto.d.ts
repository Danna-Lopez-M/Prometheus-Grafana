declare class RelationDto {
    id: string;
}
export declare class CreateDeliveryDto {
    rental: RelationDto;
    technician: RelationDto;
    client: RelationDto;
    actDocumentUrl?: string;
    clientSignatureUrl?: string;
    visualObservations?: string;
    technicalObservations?: string;
}
export {};
