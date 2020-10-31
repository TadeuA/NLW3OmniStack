import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate}from 'typeorm';
import bcrypt from "bcryptjs";


@Entity('user')
export default class User{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    passwordResetToken: string;

    @Column()
    passwordResetExpires:Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}