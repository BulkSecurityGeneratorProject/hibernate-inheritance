package com.kian.digital.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kian.digital.service.GogService;
import com.kian.digital.web.rest.errors.BadRequestAlertException;
import com.kian.digital.web.rest.util.HeaderUtil;
import com.kian.digital.service.dto.GogDTO;
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
 * REST controller for managing Gog.
 */
@RestController
@RequestMapping("/api")
public class GogResource {

    private final Logger log = LoggerFactory.getLogger(GogResource.class);

    private static final String ENTITY_NAME = "gog";

    private GogService gogService;

    public GogResource(GogService gogService) {
        this.gogService = gogService;
    }

    /**
     * POST  /gogs : Create a new gog.
     *
     * @param gogDTO the gogDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gogDTO, or with status 400 (Bad Request) if the gog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gogs")
    @Timed
    public ResponseEntity<GogDTO> createGog(@RequestBody GogDTO gogDTO) throws URISyntaxException {
        log.debug("REST request to save Gog : {}", gogDTO);
        if (gogDTO.getId() != null) {
            throw new BadRequestAlertException("A new gog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GogDTO result = gogService.save(gogDTO);
        return ResponseEntity.created(new URI("/api/gogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gogs : Updates an existing gog.
     *
     * @param gogDTO the gogDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gogDTO,
     * or with status 400 (Bad Request) if the gogDTO is not valid,
     * or with status 500 (Internal Server Error) if the gogDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gogs")
    @Timed
    public ResponseEntity<GogDTO> updateGog(@RequestBody GogDTO gogDTO) throws URISyntaxException {
        log.debug("REST request to update Gog : {}", gogDTO);
        if (gogDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GogDTO result = gogService.save(gogDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gogDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gogs : get all the gogs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gogs in body
     */
    @GetMapping("/gogs")
    @Timed
    public List<GogDTO> getAllGogs() {
        log.debug("REST request to get all Gogs");
        return gogService.findAll();
    }

    /**
     * GET  /gogs/:id : get the "id" gog.
     *
     * @param id the id of the gogDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gogDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gogs/{id}")
    @Timed
    public ResponseEntity<GogDTO> getGog(@PathVariable Long id) {
        log.debug("REST request to get Gog : {}", id);
        Optional<GogDTO> gogDTO = gogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gogDTO);
    }

    /**
     * DELETE  /gogs/:id : delete the "id" gog.
     *
     * @param id the id of the gogDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gogs/{id}")
    @Timed
    public ResponseEntity<Void> deleteGog(@PathVariable Long id) {
        log.debug("REST request to delete Gog : {}", id);
        gogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
