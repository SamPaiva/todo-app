import { mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entities/todo';
import { TodoDto } from 'src/shared/dtos/todo.dto';

@Injectable()
export class TodoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(Todo, TodoDto)
        .forMember(
          (x) => x._id,
          mapFrom((c) => c.getId()),
        )
        .forMember(
          (x) => x.creationDate,
          mapFrom((c) => c.getCreationDate()),
        )
        .forMember(
          (x) => x.description,
          mapFrom((c) => c.getDescription()),
        )
        .forMember(
          (x) => x.lastModification,
          mapFrom((c) => c.getLastModification()),
        )
        .forMember(
          (x) => x.name,
          mapFrom((c) => c.getName()),
        )
        .forMember(
          (x) => x.todoStatus,
          mapFrom((c) => c.getStatus()),
        );
    };
  }
}
