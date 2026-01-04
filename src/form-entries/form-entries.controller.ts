import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
} from '@nestjs/common';
import { FormEntriesService } from './form-entries.service';
import { CreateFormEntryDto } from './dto/create-form-entry.dto';
import { UpdateFormEntryDto } from './dto/update-form-entry.dto';
import { QueryFormEntryDto } from './dto/query-form-entry.dto';

@Controller('form-entries')
export class FormEntriesController {
    constructor(private readonly formEntriesService: FormEntriesService) { }

    @Post('create-entry')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createFormEntryDto: CreateFormEntryDto) {
        return this.formEntriesService.create(createFormEntryDto);
    }

    @Get('get-all')
    findAll(@Query() queryDto: QueryFormEntryDto) {
        return this.formEntriesService.findAll(queryDto);
    }

    @Get('find/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.formEntriesService.findOne(id);
    }

    @Patch('update/:id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFormEntryDto: UpdateFormEntryDto,
    ) {
        return this.formEntriesService.update(id, updateFormEntryDto);
    }

    @Delete('delete/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.formEntriesService.remove(id);
    }
}
