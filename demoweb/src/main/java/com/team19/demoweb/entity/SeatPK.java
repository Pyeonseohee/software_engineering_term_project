package com.team19.demoweb.entity;
import lombok.Data;

import java.io.Serializable;

@Data
public class SeatPK implements Serializable {
    private final int seatnum;
    private final Store store;
}
