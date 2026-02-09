export class Role {
  // @ApiProperty({ example: 'READ', description: 'The name of the role' })
  name!: string;

  description?: string;

  createdAt!: Date;

  updatedAt?: Date;
}
