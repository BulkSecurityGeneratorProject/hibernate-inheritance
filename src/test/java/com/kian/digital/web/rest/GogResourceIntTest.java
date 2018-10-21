package com.kian.digital.web.rest;

import com.kian.digital.InheritanceApp;

import com.kian.digital.domain.Gog;
import com.kian.digital.repository.GogRepository;
import com.kian.digital.service.GogService;
import com.kian.digital.service.dto.GogDTO;
import com.kian.digital.service.mapper.GogMapper;
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
 * Test class for the GogResource REST controller.
 *
 * @see GogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InheritanceApp.class)
public class GogResourceIntTest {

    private static final String DEFAULT_VOICE = "AAAAAAAAAA";
    private static final String UPDATED_VOICE = "BBBBBBBBBB";

    @Autowired
    private GogRepository gogRepository;

    @Autowired
    private GogMapper gogMapper;
    
    @Autowired
    private GogService gogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGogMockMvc;

    private Gog gog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GogResource gogResource = new GogResource(gogService);
        this.restGogMockMvc = MockMvcBuilders.standaloneSetup(gogResource)
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
    public static Gog createEntity(EntityManager em) {
        Gog gog = new Gog()
            .voice(DEFAULT_VOICE);
        return gog;
    }

    @Before
    public void initTest() {
        gog = createEntity(em);
    }

    @Test
    @Transactional
    public void createGog() throws Exception {
        int databaseSizeBeforeCreate = gogRepository.findAll().size();

        // Create the Gog
        GogDTO gogDTO = gogMapper.toDto(gog);
        restGogMockMvc.perform(post("/api/gogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gogDTO)))
            .andExpect(status().isCreated());

        // Validate the Gog in the database
        List<Gog> gogList = gogRepository.findAll();
        assertThat(gogList).hasSize(databaseSizeBeforeCreate + 1);
        Gog testGog = gogList.get(gogList.size() - 1);
        assertThat(testGog.getVoice()).isEqualTo(DEFAULT_VOICE);
    }

    @Test
    @Transactional
    public void createGogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gogRepository.findAll().size();

        // Create the Gog with an existing ID
        gog.setId(1L);
        GogDTO gogDTO = gogMapper.toDto(gog);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGogMockMvc.perform(post("/api/gogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gogDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Gog in the database
        List<Gog> gogList = gogRepository.findAll();
        assertThat(gogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGogs() throws Exception {
        // Initialize the database
        gogRepository.saveAndFlush(gog);

        // Get all the gogList
        restGogMockMvc.perform(get("/api/gogs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gog.getId().intValue())))
            .andExpect(jsonPath("$.[*].voice").value(hasItem(DEFAULT_VOICE.toString())));
    }
    
    @Test
    @Transactional
    public void getGog() throws Exception {
        // Initialize the database
        gogRepository.saveAndFlush(gog);

        // Get the gog
        restGogMockMvc.perform(get("/api/gogs/{id}", gog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gog.getId().intValue()))
            .andExpect(jsonPath("$.voice").value(DEFAULT_VOICE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGog() throws Exception {
        // Get the gog
        restGogMockMvc.perform(get("/api/gogs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGog() throws Exception {
        // Initialize the database
        gogRepository.saveAndFlush(gog);

        int databaseSizeBeforeUpdate = gogRepository.findAll().size();

        // Update the gog
        Gog updatedGog = gogRepository.findById(gog.getId()).get();
        // Disconnect from session so that the updates on updatedGog are not directly saved in db
        em.detach(updatedGog);
        updatedGog
            .voice(UPDATED_VOICE);
        GogDTO gogDTO = gogMapper.toDto(updatedGog);

        restGogMockMvc.perform(put("/api/gogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gogDTO)))
            .andExpect(status().isOk());

        // Validate the Gog in the database
        List<Gog> gogList = gogRepository.findAll();
        assertThat(gogList).hasSize(databaseSizeBeforeUpdate);
        Gog testGog = gogList.get(gogList.size() - 1);
        assertThat(testGog.getVoice()).isEqualTo(UPDATED_VOICE);
    }

    @Test
    @Transactional
    public void updateNonExistingGog() throws Exception {
        int databaseSizeBeforeUpdate = gogRepository.findAll().size();

        // Create the Gog
        GogDTO gogDTO = gogMapper.toDto(gog);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGogMockMvc.perform(put("/api/gogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gogDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Gog in the database
        List<Gog> gogList = gogRepository.findAll();
        assertThat(gogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGog() throws Exception {
        // Initialize the database
        gogRepository.saveAndFlush(gog);

        int databaseSizeBeforeDelete = gogRepository.findAll().size();

        // Get the gog
        restGogMockMvc.perform(delete("/api/gogs/{id}", gog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Gog> gogList = gogRepository.findAll();
        assertThat(gogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gog.class);
        Gog gog1 = new Gog();
        gog1.setId(1L);
        Gog gog2 = new Gog();
        gog2.setId(gog1.getId());
        assertThat(gog1).isEqualTo(gog2);
        gog2.setId(2L);
        assertThat(gog1).isNotEqualTo(gog2);
        gog1.setId(null);
        assertThat(gog1).isNotEqualTo(gog2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GogDTO.class);
        GogDTO gogDTO1 = new GogDTO();
        gogDTO1.setId(1L);
        GogDTO gogDTO2 = new GogDTO();
        assertThat(gogDTO1).isNotEqualTo(gogDTO2);
        gogDTO2.setId(gogDTO1.getId());
        assertThat(gogDTO1).isEqualTo(gogDTO2);
        gogDTO2.setId(2L);
        assertThat(gogDTO1).isNotEqualTo(gogDTO2);
        gogDTO1.setId(null);
        assertThat(gogDTO1).isNotEqualTo(gogDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gogMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gogMapper.fromId(null)).isNull();
    }
}
