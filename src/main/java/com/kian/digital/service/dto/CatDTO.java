package com.kian.digital.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Cat entity.
 */
public class CatDTO implements Serializable {

    private Long id;

    private String skinColer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkinColer() {
        return skinColer;
    }

    public void setSkinColer(String skinColer) {
        this.skinColer = skinColer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CatDTO catDTO = (CatDTO) o;
        if (catDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), catDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CatDTO{" +
            "id=" + getId() +
            ", skinColer='" + getSkinColer() + "'" +
            "}";
    }
}
