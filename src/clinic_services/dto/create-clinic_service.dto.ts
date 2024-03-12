import { ApiProperty } from "@nestjs/swagger";

export class CreateClinicServiceDto {
    @ApiProperty()
    clinic_id: string;

    @ApiProperty()
    service_id: string;
}