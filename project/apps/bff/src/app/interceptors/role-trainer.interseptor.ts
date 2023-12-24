import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';

@Injectable()
export class RoleTrainerInterceptor implements NestInterceptor {

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.user.role !== UserRole.Trainer) {
      throw new ConflictException('Доступно только для пользователей с ролью «Тренер»')
    }
    return next.handle();
  }
}
