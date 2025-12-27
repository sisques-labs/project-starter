import { AuthProfileMeQuery } from '@/generic/auth/application/queries/auth-profile-me/auth-profile-me.query';
import { FindAuthsByCriteriaQuery } from '@/generic/auth/application/queries/find-auths-by-criteria/find-auths-by-criteria.query';
import { CurrentUser } from '@/generic/auth/infrastructure/decorators/current-user/current-user.decorator';
import { JwtAuthGuard } from '@/generic/auth/infrastructure/auth/jwt-auth.guard';
import { Roles } from '@/generic/auth/infrastructure/decorators/roles/roles.decorator';
import { RolesGuard } from '@/generic/auth/infrastructure/guards/roles/roles.guard';
import { AuthAggregate } from '@/generic/auth/domain/aggregate/auth.aggregate';
import { AuthFindByCriteriaRequestDto } from '@/generic/auth/transport/graphql/dtos/requests/auth-find-by-criteria.request.dto';
import { AuthUserProfileResponseDto } from '@/generic/auth/transport/graphql/dtos/responses/auth-user-profile.response.dto';
import { PaginatedAuthResultDto } from '@/generic/auth/transport/graphql/dtos/responses/auth.response.dto';
import { AuthUserProfileGraphQLMapper } from '@/generic/auth/transport/graphql/mappers/auth-user-profile/auth-user-profile.mapper';
import { AuthGraphQLMapper } from '@/generic/auth/transport/graphql/mappers/auth/auth.mapper';
import { Criteria } from '@/shared/domain/entities/criteria';
import { UserRoleEnum } from '@/shared/domain/enums/user-context/user/user-role/user-role.enum';
import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthQueryResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly authGraphQLMapper: AuthGraphQLMapper,
    private readonly authUserProfileGraphQLMapper: AuthUserProfileGraphQLMapper,
  ) {}

  @Query(() => AuthUserProfileResponseDto)
  async authProfileMe(
    @CurrentUser() user: AuthAggregate,
  ): Promise<AuthUserProfileResponseDto> {
    // 01: Extract userId from JWT (stored in user object by JwtStrategy)
    const userId = (user as any).userId;

    // 02: Execute query
    const result = await this.queryBus.execute(
      new AuthProfileMeQuery({ userId }),
    );

    // 03: Convert to response DTO
    return this.authUserProfileGraphQLMapper.toResponseDto(result);
  }

  @Query(() => PaginatedAuthResultDto)
  @Roles(UserRoleEnum.ADMIN)
  async findAuthsByCriteria(
    @Args('input', { nullable: true }) input?: AuthFindByCriteriaRequestDto,
  ): Promise<PaginatedAuthResultDto> {
    // 01: Convert DTO to domain Criteria
    const criteria = new Criteria(
      input?.filters,
      input?.sorts,
      input?.pagination,
    );

    // 02: Execute query
    const result = await this.queryBus.execute(
      new FindAuthsByCriteriaQuery(criteria),
    );

    // 03: Convert to response DTO
    return this.authGraphQLMapper.toPaginatedResponseDto(result);
  }
}
