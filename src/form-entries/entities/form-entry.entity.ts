import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('form_entries')
export class FormEntry {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    sno: string;

    @Column()
    make_no: string;

    @Column('decimal', { precision: 10, scale: 2 })
    kw: number;

    @Column()
    location: string;

    @Column()
    model_no: string;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ default: 'VFD' }) // to remove default
    equipment: string;
}

