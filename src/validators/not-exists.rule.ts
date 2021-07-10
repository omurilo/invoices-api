import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityNotFoundError, getConnection } from 'typeorm';

export function NotExists(
  entityClass: any,
  field = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'NotExists',
      constraints: [entityClass, field],
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NotExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'NotExists', async: true })
export class NotExistsRule implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }
    try {
      const [entityClass, field] = args.constraints;
      const connection = getConnection('default');
      const repository = connection.getRepository(entityClass);
      const result = await repository.findOne({
        where: {
          [field]: value,
        },
      });
      if (result) {
        throw new EntityNotFoundError(entityClass, value);
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} not found`;
  }
}
