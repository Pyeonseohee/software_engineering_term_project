package com.team19.demoweb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Entity
@Setter
@Getter
@IdClass(StorePK.class)
@NoArgsConstructor
public class Store {
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private User user;
    @Id
    private String name;

    @Builder
    public Store(User user, String name) {
        this.user = user;
        this.name = name;;
    }
}