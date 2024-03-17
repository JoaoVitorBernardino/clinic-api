import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerServiceDto } from './dto/create-customer_service.dto';
import { SummaryDTO } from './dto/summary.dto';
import { UpdateCustomerServiceDto } from './dto/update-customer_service.dto';

@Injectable()
export class CustomerServicesService {
    constructor(private prisma: PrismaService) { }

    create(createCustomerServiceDto: CreateCustomerServiceDto) {
        return this.prisma.customer_services.create({ data: createCustomerServiceDto });
    }

    findAll() {
        return this.prisma.customer_services.findMany({ where: { is_deleted: false } });
    }

    findOne(id: string, nested: boolean = false) {
        return this.prisma.customer_services.findUniqueOrThrow({
            where: { id },
            include: { selected_services: nested }
        }).catch(() => {
            throw new NotFoundException('not found customer service');
        });
    }

    async summary(custumerServiceId: string): Promise<SummaryDTO> {
        const [customerService, selectedServices] = await this.prisma.$transaction([
            this.prisma.customer_services.findFirst({
                where: { id: custumerServiceId },
                include: {
                    professional: true,
                },
            }),
            this.prisma.services.findMany({
                where: {
                    clinic_services: {
                        some: { selected_services: { some: { customer_service_id: custumerServiceId } } }
                    },
                },
            }),
        ]);

        let summaryDTO: SummaryDTO = {
            commission_value: 0,
            total_duration_of_service: 0,
            estimated_time: 0
        };

        if (customerService && selectedServices) {
            summaryDTO.estimated_time = selectedServices.reduce((total, data) => total + data.estimated_time, 0)

            summaryDTO.total_duration_of_service = this.calculateMinutesPassed(customerService.started_at, customerService.finished_at);

            const commission = this.sumPrices(selectedServices) * Number(customerService.professional.commission);
            summaryDTO.commission_value = Number(commission.toFixed(2));
        } else {
            throw new NotFoundException('not found customer service summary');
        }

        return summaryDTO;
    }

    update(id: string, updateCustomerServiceDto: UpdateCustomerServiceDto) {
        return this.prisma.customer_services.update({
            where: { id },
            data: updateCustomerServiceDto
        });
    }

    start(id: string) {
        return this.prisma.customer_services.update({
            where: { id },
            data: {
                started_at: new Date(),
            },
        });
    }

    async finish(id: string) {
        await this.prisma.customer_services.update({
            where: { id },
            data: {
                finished_at: new Date()
            },
        }).catch(() => {
            throw new NotFoundException('not found customer service');
        });

        return this.summary(id);
    }

    remove(id: string) {
        return this.prisma.customer_services.update({
            where: { id },
            data: { is_deleted: true }
        });
    }

    private calculateMinutesPassed(startedAt: Date, finishedAt: Date): number {
        const differenceInMilliseconds: number = finishedAt.getTime() - startedAt.getTime();

        const minutesPassed: number = Math.floor(differenceInMilliseconds / 60000);

        return minutesPassed;
    }

    private sumPrices(services: any[]): number {
        return services.reduce((total: number, service) => total + Number(service.price), 0);
    }
}
