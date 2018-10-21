package com.kian.digital.domain;


import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Gog.
 */
@Entity
@Table(name = "gog")
@DynamicInsert
@DynamicUpdate
@DiscriminatorValue("gog")
public class Gog extends Animal implements Serializable {

    private static final long serialVersionUID = 1L;



    @Column(name = "VOICE")
    private String voice;


    public String getVoice() {
        return voice;
    }

    public Gog voice(String voice) {
        this.voice = voice;
        return this;
    }

    public void setVoice(String voice) {
        this.voice = voice;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Gog gog = (Gog) o;
        if (gog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Gog{" +
            "id=" + getId() +
            ", voice='" + getVoice() + "'" +
            "}";
    }
}
