package com.kian.digital.web.rest;

import com.kian.digital.InheritanceApp;

import com.kian.digital.domain.Cat;
import com.kian.digital.repository.CatRepository;
import com.kian.digital.service.CatService;
import com.kian.digital.service.dto.CatDTO;
import com.kian.digital.service.mapper.CatMapper;
import com.kian.digital.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.kian.digital.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CatResource REST controller.
 *
 * @see CatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InheritanceApp.class)
public class CatResourceIntTest {

    private static final String DEFAULT_SKIN_COLER = "AAAAAAAAAA";
    private static final String UPDATED_SKIN_COLER = "BBBBBBBBBB";

    @Autowired
    private CatRepository catRepository;

    @Autowired
    private CatMapper catMapper;
    
    @Autowired
    private CatService catService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCatMockMvc;

    private Cat cat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CatResource catResource = new CatResource(catService);
        this.restCatMockMvc = MockMvcBuilders.standaloneSetup(catResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cat createEntity(EntityManager em) {
        Cat cat = new Cat()
            .skinColer(DEFAULT_SKIN_COLER);
        return cat;
    }

    @Before
    public void initTest() {
        cat = createEntity(em);
    }

    @Test
    @Transactional
    public void createCat() throws Exception {
        int databaseSizeBeforeCreate = catRepository.findAll().size();

        // Create the Cat
        CatDTO catDTO = catMapper.toDto(cat);
        restCatMockMvc.perform(post("/api/cats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(catDTO)))
            .andExpect(status().isCreated());

        // Validate the Cat in the database
        List<Cat> catList = catRepository.findAll();
        assertThat(catList).hasSize(databaseSizeBeforeCreate + 1);
        Cat testCat = catList.get(catList.size() - 1);
        assertThat(testCat.getSkinColer()).isEqualTo(DEFAULT_SKIN_COLER);
    }

    @Test
    @Transactional
    public void createCatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = catRepository.findAll().size();

        // Create the Cat with an existing ID
        cat.setId(1L);
        CatDTO catDTO = catMapper.toDto(cat);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCatMockMvc.perform(post("/api/cats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(catDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Cat in the database
        List<Cat> catList = catRepository.findAll();
        assertThat(catList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCats() throws Exception {
        // Initialize the database
        catRepository.saveAndFlush(cat);

        // Get all the catList
        restCatMockMvc.perform(get("/api/cats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cat.getId().intValue())))
            .andExpect(jsonPath("$.[*].skinColer").value(hasItem(DEFAULT_SKIN_COLER.toString())));
    }
    
    @Test
    @Transactional
    public void getCat() throws Exception {
        // Initialize the database
        catRepository.saveAndFlush(cat);

        // Get the cat
        restCatMockMvc.perform(get("/api/cats/{id}", cat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cat.getId().intValue()))
            .andExpect(jsonPath("$.skinColer").value(DEFAULT_SKIN_COLER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCat() throws Exception {
        // Get the cat
        restCatMockMvc.perform(get("/api/cats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCat() throws Exception {
        // Initialize the database
        catRepository.saveAndFlush(cat);

        int databaseSizeBeforeUpdate = catRepository.findAll().size();

        // Update the cat
        Cat updatedCat = catRepository.findById(cat.getId()).get();
        // Disconnect from session so that the updates on updatedCat are not directly saved in db
        em.detach(updatedCat);
        updatedCat
            .skinColer(UPDATED_SKIN_COLER);
        CatDTO catDTO = catMapper.toDto(updatedCat);

        restCatMockMvc.perform(put("/api/cats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(catDTO)))
            .andExpect(status().isOk());

        // Validate the Cat in the database
        List<Cat> catList = catRepository.findAll();
        assertThat(catList).hasSize(databaseSizeBeforeUpdate);
        Cat testCat = catList.get(catList.size() - 1);
        assertThat(testCat.getSkinColer()).isEqualTo(UPDATED_SKIN_COLER);
    }

    @Test
    @Transactional
    public void updateNonExistingCat() throws Exception {
        int databaseSizeBeforeUpdate = catRepository.findAll().size();

        // Create the Cat
        CatDTO catDTO = catMapper.toDto(cat);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCatMockMvc.perform(put("/api/cats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(catDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Cat in the database
        List<Cat> catList = catRepository.findAll();
        assertThat(catList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCat() throws Exception {
        // Initialize the database
        catRepository.saveAndFlush(cat);

        int databaseSizeBeforeDelete = catRepository.findAll().size();

        // Get the cat
        restCatMockMvc.perform(delete("/api/cats/{id}", cat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cat> catList = catRepository.findAll();
        assertThat(catList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cat.class);
        Cat cat1 = new Cat();
        cat1.setId(1L);
        Cat cat2 = new Cat();
        cat2.setId(cat1.getId());
        assertThat(cat1).isEqualTo(cat2);
        cat2.setId(2L);
        assertThat(cat1).isNotEqualTo(cat2);
        cat1.setId(null);
        assertThat(cat1).isNotEqualTo(cat2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CatDTO.class);
        CatDTO catDTO1 = new CatDTO();
        catDTO1.setId(1L);
        CatDTO catDTO2 = new CatDTO();
        assertThat(catDTO1).isNotEqualTo(catDTO2);
        catDTO2.setId(catDTO1.getId());
        assertThat(catDTO1).isEqualTo(catDTO2);
        catDTO2.setId(2L);
        assertThat(catDTO1).isNotEqualTo(catDTO2);
        catDTO1.setId(null);
        assertThat(catDTO1).isNotEqualTo(catDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(catMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(catMapper.fromId(null)).isNull();
    }
}
