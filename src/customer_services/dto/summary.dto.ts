import { ApiProperty } from "@nestjs/swagger";

export class SummaryDTO {
    @ApiProperty()
    total_duration_of_service: number;

    @ApiProperty()
    commission_value: number;
}