package com.kian.digital.repository;

import com.kian.digital.domain.Gog;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Gog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GogRepository extends JpaRepository<Gog, Long> {

}
