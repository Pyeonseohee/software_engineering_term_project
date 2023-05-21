package com.team19.demoweb.Controller;

import com.team19.demoweb.dto.*;
import com.team19.demoweb.entity.*;
import com.team19.demoweb.repository.ItemRepository;
import com.team19.demoweb.repository.SeatRepository;
import com.team19.demoweb.repository.StoreRepository;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("http://localhost:3000")
@Controller
@RestController
public class StoreController {
    private final StoreRepository storeRepository;
    private final SeatRepository seatRepository;
    private final ItemRepository itemRepository;
    private final UserController userController;
    
    public StoreController(StoreRepository storeRepository, SeatRepository seatRepository, ItemRepository itemRepository, UserController userController) {
        this.storeRepository = storeRepository;
        this.seatRepository = seatRepository;
        this.itemRepository = itemRepository;
        this.userController = userController;
    }
    //store정보 설정
    @PostMapping("/api/setstore")
    public String setStore(@RequestBody SetStoreRequestDto dto) {
        //Optional<User> user = userRepository.findByStore(store.getUser().getStore());
        //session 검증 후 user 정보 가져오기
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return "Invalid Session";
        } 

        /* 
         **사업자 번호 검증 부분 추가 필요
        */

        //store정보 기반으로 객체 생성후, user와 관계 설정 후 저장
        Store store = new Store(user, dto.getName());
        storeRepository.save(store);
//        for (int i = 0; i < dto.getSeatCnt(); i++) {
//            Seat seat = new Seat(i+1, store, true);
//            seatRepository.save(seat);
//        }
        return "Store information setting Sucessful";
    }
    
    @PostMapping("/api/setseat")
    public String setStore(@RequestBody SetSeatRequestDto[] dto) {
        User user;
        for (int i = 1; i <= dto.length; i++) {
            try {
                user = userController.checkSession(dto[i].getSession());
            } catch (Exception e) {
                return "Invalid Session";
            }
            
            //session, List<x, y>
            
        }
        return "아직개발중";
    }
    //store정보 클라에 제공
    @PostMapping("/api/storeinfo")
    public Store getStore(@RequestBody StoreInfoRequestDto dto) {
        //session 검증
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return null;
        } 
        // user와 연결된 store 검색 후 반환
        Store store = storeRepository.findByUser(user);
        return store;
    }
    //해당 store의 전체 seat정보 제공
    @PostMapping("/api/seatinfo")
    public List<Seat> getseatInfo(@RequestBody SeatInfoRequestDto dto) {
        //session 검증
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return null;
        }
        //user와 조인된 store 정보를 기반으로 전체 seat정보 반환
        return seatRepository.findAllByStore(storeRepository.findByUser(user));
    }
    //주문 정보=seatInfo, 어느가게의 몇번좌석에서 무슨음료샀는지  클라이언트가보냄
    @PostMapping("/api/setpurchase")
    public String purchaseOnSeat(@RequestBody PurchaseOnSeatRequestDto dto) {
        //session 검증
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return null;
        }
        Seat seat = dto.getSeat();
        seat.setItem(dto.getItem());
        seat.setTime(itemRepository.findByName(dto.getItem()).getTime());
        return "";
    }
    
    /*@PutMapping("/api/seatInfo")//좌석시간 끝난거 받음
    public Seat putseatInfo(@RequestBody Seat seat) {
    }*/
}