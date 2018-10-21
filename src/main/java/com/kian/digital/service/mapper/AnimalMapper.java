package com.kian.digital.service.mapper;

import com.kian.digital.domain.*;
import com.kian.digital.service.dto.AnimalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Animal and its DTO AnimalDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AnimalMapper extends EntityMapper<AnimalDTO, Animal> {



    default Animal fromId(Long id) {
        if (id == null) {
            return null;
        }
        Animal animal = new Animal();
        animal.setId(id);
        return animal;
    }
}
