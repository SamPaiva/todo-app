import { mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserDto } from 'src/shared/dtos/user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(User, UserDto)
        .forMember(
          (x) => x._id,
          mapFrom((c) => c.getId()),
        )
        .forMember(
          (x) => x.creationDate,
          mapFrom((c) => c.getCreationDate()),
        )
        .forMember(
          (x) => x.email,
          mapFrom((c) => c.getEmail()),
        )
        .forMember(
          (x) => x.lastModification,
          mapFrom((c) => c.getLastModification()),
        )
        .forMember(
          (x) => x.name,
          mapFrom((c) => c.fullName),
        );
    };
  }
}
