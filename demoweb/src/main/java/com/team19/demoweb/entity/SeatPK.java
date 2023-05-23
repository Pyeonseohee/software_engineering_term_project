package com.team19.demoweb.entity;
import lombok.Data;

import java.io.Serializable;

@Data
public class SeatPK implements Serializable {
    private int seatnum;
    private Store store;
}
