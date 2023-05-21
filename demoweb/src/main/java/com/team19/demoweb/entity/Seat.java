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
    private float x;
    private float y;
    
    public Seat(Long id, Store store, float x, float y) {
        this.id = id;
        this.store = store;
        this.x = x;
        this.y = y;
    }
    
    public Seat(Long id, Store store, boolean available, String item, int seatnum, int time, float x, float y) {
        this.id = id;
        this.store = store;
        this.available = available;
        this.item = item;
        this.seatnum = seatnum;
        this.time = time;
        this.x = x;
        this.y = y;
    }
}