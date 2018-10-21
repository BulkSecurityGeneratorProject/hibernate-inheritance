package com.kian.digital.service;

import com.kian.digital.service.dto.GogDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Gog.
 */
public interface GogService {

    /**
     * Save a gog.
     *
     * @param gogDTO the entity to save
     * @return the persisted entity
     */
    GogDTO save(GogDTO gogDTO);

    /**
     * Get all the gogs.
     *
     * @return the list of entities
     */
    List<GogDTO> findAll();


    /**
     * Get the "id" gog.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GogDTO> findOne(Long id);

    /**
     * Delete the "id" gog.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
