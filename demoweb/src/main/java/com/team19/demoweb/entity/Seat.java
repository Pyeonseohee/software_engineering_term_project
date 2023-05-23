package com.team19.demoweb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@IdClass(SeatPK.class)
@NoArgsConstructor
public class Seat {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_name", referencedColumnName = "name")
    private Store store;
    @Column
    private boolean available;
    @Id
    private int seatnum;
    private float x;
    private float y;
    
    public Seat(Store store, int seatnum, float x, float y) {
        this.store = store;
        this.seatnum = seatnum;
        this.x = x;
        this.y = y;
    }
    
    public Seat(Store store, int seatnum) {
        this.store = store;
        this.seatnum = seatnum;
    }
}