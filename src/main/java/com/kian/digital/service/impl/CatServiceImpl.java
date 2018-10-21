package com.kian.digital.service.impl;

import com.kian.digital.service.CatService;
import com.kian.digital.domain.Cat;
import com.kian.digital.repository.CatRepository;
import com.kian.digital.service.dto.CatDTO;
import com.kian.digital.service.mapper.CatMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Cat.
 */
@Service
@Transactional
public class CatServiceImpl implements CatService {

    private final Logger log = LoggerFactory.getLogger(CatServiceImpl.class);

    private CatRepository catRepository;

    private CatMapper catMapper;

    public CatServiceImpl(CatRepository catRepository, CatMapper catMapper) {
        this.catRepository = catRepository;
        this.catMapper = catMapper;
    }

    /**
     * Save a cat.
     *
     * @param catDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CatDTO save(CatDTO catDTO) {
        log.debug("Request to save Cat : {}", catDTO);

        Cat cat = catMapper.toEntity(catDTO);
        cat = catRepository.save(cat);
        return catMapper.toDto(cat);
    }

    /**
     * Get all the cats.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CatDTO> findAll() {
        log.debug("Request to get all Cats");
        return catRepository.findAll().stream()
            .map(catMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one cat by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CatDTO> findOne(Long id) {
        log.debug("Request to get Cat : {}", id);
        return catRepository.findById(id)
            .map(catMapper::toDto);
    }

    /**
     * Delete the cat by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cat : {}", id);
        catRepository.deleteById(id);
    }
}
