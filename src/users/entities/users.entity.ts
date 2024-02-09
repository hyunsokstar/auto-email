import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsersModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true }) // name 속성을 nullable로 설정합니다.
    name: string | null;

    @Column({ nullable: true }) // phoneNumber 속성을 nullable로 설정합니다.
    phoneNumber: string | null;

    @Column()
    password: string;
}
