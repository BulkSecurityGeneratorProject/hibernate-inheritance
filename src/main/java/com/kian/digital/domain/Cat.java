package com.kian.digital.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Cat.
 */
@Entity
@Table(name = "cat")
@DiscriminatorValue("cat")
public class Cat  extends Animal implements Serializable {

    private static final long serialVersionUID = 1L;



    @Column(name = "skin_coler")
    private String skinColer;



    public String getSkinColer() {
        return skinColer;
    }

    public Cat skinColer(String skinColer) {
        this.skinColer = skinColer;
        return this;
    }

    public void setSkinColer(String skinColer) {
        this.skinColer = skinColer;
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
        Cat cat = (Cat) o;
        if (cat.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cat.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cat{" +
            "id=" + getId() +
            ", skinColer='" + getSkinColer() + "'" +
            "}";
    }
}
