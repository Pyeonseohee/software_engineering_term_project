package com.team19.demoweb.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class SeatInfo {
    private Long store_id;//가게의 id참조
    private Long seat_id;//좌석id참조
    private String item;//아이템 아이템 참조
    private int time;//아이템 타임 참조
    
    public SeatInfo(Long store_id, Long seat_id, String item, int time) {
        this.store_id = store_id;
        this.seat_id = seat_id;
        this.item = item;
        this.time = time;
    }
}
