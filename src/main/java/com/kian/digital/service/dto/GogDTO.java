package com.kian.digital.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Gog entity.
 */
public class GogDTO implements Serializable {

    private Long id;

    private String voice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVoice() {
        return voice;
    }

    public void setVoice(String voice) {
        this.voice = voice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GogDTO gogDTO = (GogDTO) o;
        if (gogDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gogDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GogDTO{" +
            "id=" + getId() +
            ", voice='" + getVoice() + "'" +
            "}";
    }
}
