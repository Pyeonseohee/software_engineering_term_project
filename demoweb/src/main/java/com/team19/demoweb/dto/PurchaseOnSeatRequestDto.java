package com.team19.demoweb.dto;

import com.team19.demoweb.entity.Seat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseOnSeatRequestDto {
    private String session;
    private Seat seat;
    private String item;
}
