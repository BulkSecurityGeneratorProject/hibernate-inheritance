package com.kian.digital.service.mapper;

import com.kian.digital.domain.*;
import com.kian.digital.service.dto.GogDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Gog and its DTO GogDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GogMapper extends EntityMapper<GogDTO, Gog> {



    default Gog fromId(Long id) {
        if (id == null) {
            return null;
        }
        Gog gog = new Gog();
        gog.setId(id);
        return gog;
    }
}
