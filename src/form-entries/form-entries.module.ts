import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntriesService } from './form-entries.service';
import { FormEntriesController } from './form-entries.controller';
import { FormEntry } from './entities/form-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntry])],
  providers: [FormEntriesService],
  controllers: [FormEntriesController],
})
export class FormEntriesModule { }
