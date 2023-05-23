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
    
    @PostMapping("/api/setseat")//seat 생성
    public String setSeat(@RequestBody SetSeatRequestDto dto) {
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return "Invalid Session";
        }
        StorePK storePK = new StorePK(user, dto.getName());
        Optional<Store> store = storeRepository.findById(storePK);
        Seat seat = new Seat(store.get(), dto.getSeatnum(), dto.getX(), dto.getY());
        seatRepository.save(seat);
        return "Success";
    }
    
    @DeleteMapping("/api/setseat")//seat 제거
    public String deleteSeat(@RequestBody DeleteSeatDto dto) {
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return "Invalid Session";
        }
        StorePK storePK = new StorePK(user, dto.getName());
        Optional<Store> store = storeRepository.findById(storePK);
        Seat seat = new Seat(store.get(), dto.getSeatnum());
        seatRepository.delete(seat);
        return "Success";
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
        StorePK storePK = new StorePK(user, dto.getName());
        Optional<Store> store = storeRepository.findById(storePK);
        return seatRepository.findAllByStore(store.get());
    }
    
    //어느가게의 몇번좌석에서 무슨음료샀는지 클라이언트가보내면
    @PostMapping("/api/setpurchase")
    public int purchaseOnSeat(@RequestBody PurchaseOnSeatRequestDto dto) {
        //session 검증
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return 0;
        }
        StorePK storePK = new StorePK(user, dto.getName());
        Optional<Store> store = storeRepository.findById(storePK);
        Seat seat = seatRepository.findAllByStoreAndSeatnum(store.get(), dto.getSeatnum());
        seat.setAvailable(false);
        seatRepository.save(seat);//좌석현황최신화
        Item item = itemRepository.findByStoreAndName(store.get(), dto.getItem());
        return item.getTime();
    }
    
    @PostMapping("/api/timeover")//좌석시간 끝난거 받음
    public String endseatInfo(@RequestBody TimeoverDto dto) {
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return null;
        }
        StorePK storePK = new StorePK(user, dto.getName());
        Optional<Store> store = storeRepository.findById(storePK);
        Seat seat = seatRepository.findAllByStoreAndSeatnum(store.get(), dto.getSeatnum());
        seat.setAvailable(true);
        seatRepository.save(seat);//좌석현황최신화
        return  "Success";
    }
    
    @PostMapping("/api/additem")
    public String additem(@RequestBody AddItemDto dto) {
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return null;
        }
        StorePK storePK = new StorePK(user, dto.getStorename());
        Optional<Store> store = storeRepository.findById(storePK);
        Item item = new Item(store.get(), dto.getItemname(), dto.getPrice(), dto.getTime());
        itemRepository.save(item);
        return "Add item success";
    }
    
    //유저에 따른 store정보 클라에 제공
    @PostMapping("/api/storeinfo")
    public List<String> getStore(@RequestBody StoreInfoRequestDto dto) {
        //session 검증
        User user;
        try {
            user = userController.checkSession(dto.getSession());
        } catch (Exception e) {
            return null;
        }
        // user와 연결된 store 검색 후 반환
        List<Store> store = storeRepository.findByUser(user);
        List<String> name = new ArrayList<>();
        for (int i = 0; i < store.size(); i++) {
            name.add(store.get(i).getName());
            
        }
        return name;
    }
}