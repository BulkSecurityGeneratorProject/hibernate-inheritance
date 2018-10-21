package com.kian.digital.service;

import com.kian.digital.service.dto.AnimalDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Animal.
 */
public interface AnimalService {

    /**
     * Save a animal.
     *
     * @param animalDTO the entity to save
     * @return the persisted entity
     */
    AnimalDTO save(AnimalDTO animalDTO);

    /**
     * Get all the animals.
     *
     * @return the list of entities
     */
    List<AnimalDTO> findAll();


    /**
     * Get the "id" animal.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AnimalDTO> findOne(Long id);

    /**
     * Delete the "id" animal.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
