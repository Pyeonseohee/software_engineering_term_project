package com.team19.demoweb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
public class Store {
    @Id
    private Long id;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private User user;
    @Column(name = "name")
    private String name;
    @Column(name = "seats")
    private int seats;

    @Builder
    public Store(User user, String name, int seats) {
        this.user = user;
        this.name = name;
        this.seats = seats;
    }
}
