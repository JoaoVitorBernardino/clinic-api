import { ApiProperty } from "@nestjs/swagger";

export class ClinicEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    is_delete: boolean;
}
