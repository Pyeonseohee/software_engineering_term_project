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
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user")
    private User user;
    @Column(name = "name")
    private String name;
    @Column(name = "seat_num")
    private int seatCnt;

    @Builder
    public Store(User user, String name, int seatCnt) {
        this.user = user;
        this.name = name;
        this.seatCnt = seatCnt;
    }
}
