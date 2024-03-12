import { ApiProperty } from "@nestjs/swagger";

export class CreateSelectedServiceDto {
    @ApiProperty()
    clinic_service_id: string;

    @ApiProperty()
    customer_service_id: string;
}
