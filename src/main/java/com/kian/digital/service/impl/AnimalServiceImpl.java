package com.kian.digital.service.impl;

import com.kian.digital.service.AnimalService;
import com.kian.digital.domain.Animal;
import com.kian.digital.repository.AnimalRepository;
import com.kian.digital.service.dto.AnimalDTO;
import com.kian.digital.service.mapper.AnimalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Animal.
 */
@Service
@Transactional
public class AnimalServiceImpl implements AnimalService {

    private final Logger log = LoggerFactory.getLogger(AnimalServiceImpl.class);

    private AnimalRepository animalRepository;

    private AnimalMapper animalMapper;

    public AnimalServiceImpl(AnimalRepository animalRepository, AnimalMapper animalMapper) {
        this.animalRepository = animalRepository;
        this.animalMapper = animalMapper;
    }

    /**
     * Save a animal.
     *
     * @param animalDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AnimalDTO save(AnimalDTO animalDTO) {
        log.debug("Request to save Animal : {}", animalDTO);

        Animal animal = animalMapper.toEntity(animalDTO);
        animal = animalRepository.save(animal);
        return animalMapper.toDto(animal);
    }

    /**
     * Get all the animals.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AnimalDTO> findAll() {
        log.debug("Request to get all Animals");
        return animalRepository.findAll().stream()
            .map(animalMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one animal by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AnimalDTO> findOne(Long id) {
        log.debug("Request to get Animal : {}", id);
        return animalRepository.findById(id)
            .map(animalMapper::toDto);
    }

    /**
     * Delete the animal by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Animal : {}", id);
        animalRepository.deleteById(id);
    }
}
