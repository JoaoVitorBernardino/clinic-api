import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateServiceDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ default: 0 })
    price: Decimal;

    @ApiProperty({ default: 0 })
    estimated_time: number;
}
