package com.kian.digital.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kian.digital.service.CatService;
import com.kian.digital.web.rest.errors.BadRequestAlertException;
import com.kian.digital.web.rest.util.HeaderUtil;
import com.kian.digital.service.dto.CatDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cat.
 */
@RestController
@RequestMapping("/api")
public class CatResource {

    private final Logger log = LoggerFactory.getLogger(CatResource.class);

    private static final String ENTITY_NAME = "cat";

    private CatService catService;

    public CatResource(CatService catService) {
        this.catService = catService;
    }

    /**
     * POST  /cats : Create a new cat.
     *
     * @param catDTO the catDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new catDTO, or with status 400 (Bad Request) if the cat has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cats")
    @Timed
    public ResponseEntity<CatDTO> createCat(@RequestBody CatDTO catDTO) throws URISyntaxException {
        log.debug("REST request to save Cat : {}", catDTO);
        if (catDTO.getId() != null) {
            throw new BadRequestAlertException("A new cat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CatDTO result = catService.save(catDTO);
        return ResponseEntity.created(new URI("/api/cats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cats : Updates an existing cat.
     *
     * @param catDTO the catDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated catDTO,
     * or with status 400 (Bad Request) if the catDTO is not valid,
     * or with status 500 (Internal Server Error) if the catDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cats")
    @Timed
    public ResponseEntity<CatDTO> updateCat(@RequestBody CatDTO catDTO) throws URISyntaxException {
        log.debug("REST request to update Cat : {}", catDTO);
        if (catDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CatDTO result = catService.save(catDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, catDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cats : get all the cats.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cats in body
     */
    @GetMapping("/cats")
    @Timed
    public List<CatDTO> getAllCats() {
        log.debug("REST request to get all Cats");
        return catService.findAll();
    }

    /**
     * GET  /cats/:id : get the "id" cat.
     *
     * @param id the id of the catDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the catDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cats/{id}")
    @Timed
    public ResponseEntity<CatDTO> getCat(@PathVariable Long id) {
        log.debug("REST request to get Cat : {}", id);
        Optional<CatDTO> catDTO = catService.findOne(id);
        return ResponseUtil.wrapOrNotFound(catDTO);
    }

    /**
     * DELETE  /cats/:id : delete the "id" cat.
     *
     * @param id the id of the catDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cats/{id}")
    @Timed
    public ResponseEntity<Void> deleteCat(@PathVariable Long id) {
        log.debug("REST request to delete Cat : {}", id);
        catService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
