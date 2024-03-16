import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerServiceDto {
    @ApiProperty({ default: '2024-01-01T00:00:00Z' })
    started_at: Date | null;

    @ApiProperty({ default: '2024-01-01T00:00:00Z' })
    finished_at: Date | null;

    @ApiProperty()
    client_id: string;

    @ApiProperty()
    professional_id: string;
}
