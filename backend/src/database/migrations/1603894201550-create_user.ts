import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createUser1603894201550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"user",
            columns:[
              {
                name: "id",
                type: "integer", 
                unsigned:true,
                isPrimary:true,
                isGenerated: true,
                generationStrategy: "increment"
              },
              {
                name:"name",
                type: "varchar"
              },
              {
                name:"email",
                type: "varchar"
              },
              {
                name:"password",
                type: "varchar"
              },
              {
                name:"passwordResetToken",
                type: "varchar",
                default:null,
                isNullable:true
              },
              {
                name:"passwordResetExpires",
                type: "date",
                default: null,
                isNullable:true
              }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user")

    }

}
