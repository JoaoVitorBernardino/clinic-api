import { ApiProperty } from "@nestjs/swagger";

export class SelectedServiceEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    clinic_service_id: string;

    @ApiProperty()
    customer_service_id: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    is_deleted: boolean;
}
