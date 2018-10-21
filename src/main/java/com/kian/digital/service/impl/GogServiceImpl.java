package com.kian.digital.service.impl;

import com.kian.digital.service.GogService;
import com.kian.digital.domain.Gog;
import com.kian.digital.repository.GogRepository;
import com.kian.digital.service.dto.GogDTO;
import com.kian.digital.service.mapper.GogMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Gog.
 */
@Service
@Transactional
public class GogServiceImpl implements GogService {

    private final Logger log = LoggerFactory.getLogger(GogServiceImpl.class);

    private GogRepository gogRepository;

    private GogMapper gogMapper;

    public GogServiceImpl(GogRepository gogRepository, GogMapper gogMapper) {
        this.gogRepository = gogRepository;
        this.gogMapper = gogMapper;
    }

    /**
     * Save a gog.
     *
     * @param gogDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GogDTO save(GogDTO gogDTO) {
        log.debug("Request to save Gog : {}", gogDTO);

        Gog gog = gogMapper.toEntity(gogDTO);
        gog = gogRepository.save(gog);
        return gogMapper.toDto(gog);
    }

    /**
     * Get all the gogs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GogDTO> findAll() {
        log.debug("Request to get all Gogs");
        return gogRepository.findAll().stream()
            .map(gogMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gog by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GogDTO> findOne(Long id) {
        log.debug("Request to get Gog : {}", id);
        return gogRepository.findById(id)
            .map(gogMapper::toDto);
    }

    /**
     * Delete the gog by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Gog : {}", id);
        gogRepository.deleteById(id);
    }
}
