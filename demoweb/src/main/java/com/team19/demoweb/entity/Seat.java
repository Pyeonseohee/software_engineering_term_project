package com.team19.demoweb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Seat {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;
    @Column
    private boolean available;
    private String item;//아이템 아이템 참조
    private int seatnum;
    private int time;//아이템 타임 참조
    
    public Seat(int seatnum, Store store, boolean available) {
        this.seatnum = seatnum;
        this.store = store;
        this.available = available;
    }
}
