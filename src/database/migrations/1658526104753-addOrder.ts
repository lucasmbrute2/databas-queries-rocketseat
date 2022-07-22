import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";
import { Query } from "typeorm/driver/Query";

export class addOrder1658526104753 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "orders",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true
        },
        {
          name: "description",
          type: "varchar"
        }
      ]
    }), true)
    await queryRunner.createForeignKey("orders", new TableForeignKey({
      columnNames: ["id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders")
    const table = await queryRunner.getTable("orders")

    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("questionId") !== -1,
    )
    if (!foreignKey) return;

    await queryRunner.dropForeignKey("orders", foreignKey)
  }

}
