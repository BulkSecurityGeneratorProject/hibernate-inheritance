package com.kian.digital.service.mapper;

import com.kian.digital.domain.*;
import com.kian.digital.service.dto.CatDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Cat and its DTO CatDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CatMapper extends EntityMapper<CatDTO, Cat> {



    default Cat fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cat cat = new Cat();
        cat.setId(id);
        return cat;
    }
}
