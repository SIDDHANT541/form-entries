import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { FormEntry } from './entities/form-entry.entity';
import { CreateFormEntryDto } from './dto/create-form-entry.dto';
import { UpdateFormEntryDto } from './dto/update-form-entry.dto';
import { QueryFormEntryDto } from './dto/query-form-entry.dto';

@Injectable()
export class FormEntriesService {
    constructor(
        @InjectRepository(FormEntry)
        private readonly formEntryRepository: Repository<FormEntry>,
    ) { }

    async create(createFormEntryDto: CreateFormEntryDto): Promise<FormEntry> {
        try {
            const formEntry = this.formEntryRepository.create(createFormEntryDto);
            return await this.formEntryRepository.save(formEntry);
        } catch (error) {
            throw new BadRequestException('Failed to create form entry');
        }
    }

    async findAll(queryDto: QueryFormEntryDto) {
        const { page = 1, limit = 10, search, location, equipment } = queryDto;
        const skip = (page - 1) * limit;

        const queryBuilder = this.formEntryRepository.createQueryBuilder('form');

        // Apply filters
        if (search) {
            queryBuilder.where(
                '(form.sno LIKE :search OR form.make_no LIKE :search OR form.model_no LIKE :search)',
                { search: `%${search}%` },
            );
        }

        if (location) {
            queryBuilder.andWhere('form.location LIKE :location', {
                location: `%${location}%`,
            });
        }

        if (equipment) {
            queryBuilder.andWhere('form.equipment LIKE :equipment', {
                equipment: `%${equipment}%`,
            });
        }

        // Get total count and paginated data
        const [data, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .orderBy('form.created_at', 'DESC')
            .getManyAndCount();

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number): Promise<FormEntry> {
        const formEntry = await this.formEntryRepository.findOne({
            where: { id: id.toString() },
        });

        if (!formEntry) {
            throw new NotFoundException(`Form entry with ID ${id} not found`);
        }

        return formEntry;
    }

    async update(
        id: number,
        updateFormEntryDto: UpdateFormEntryDto,
    ): Promise<FormEntry> {
        const formEntry = await this.findOne(id);

        try {
            Object.assign(formEntry, updateFormEntryDto);
            return await this.formEntryRepository.save(formEntry);
        } catch (error) {
            throw new BadRequestException('Failed to update form entry');
        }
    }

    async remove(id: number): Promise<void> {
        const formEntry = await this.findOne(id);
        await this.formEntryRepository.remove(formEntry);
    }
}
