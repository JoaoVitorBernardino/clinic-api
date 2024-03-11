import { ApiProperty } from "@nestjs/swagger";

export class CreateClinicDto {
    @ApiProperty()
    name: string;
}
