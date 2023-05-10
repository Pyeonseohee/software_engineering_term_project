package com.team19.demoweb.Controller;

import com.team19.demoweb.entity.*;
import com.team19.demoweb.repository.ItemRepository;
import com.team19.demoweb.repository.SeatsRepository;
import com.team19.demoweb.repository.StoreRepository;
import com.team19.demoweb.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class StoreController {
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final SeatsRepository seatsRepository;
    private final ItemRepository itemRepository;
    
    public StoreController(StoreRepository storeRepository, UserRepository userRepository, SeatsRepository seatsRepository, ItemRepository itemRepository) {
        this.storeRepository = storeRepository;
        this.userRepository = userRepository;
        this.seatsRepository = seatsRepository;
        this.itemRepository = itemRepository;
    }
    
    @PostMapping("/api/store")//가게정보DB에입력
    public Store postStore(@RequestBody Store store) {
        //Optional<User> user = userRepository.findByStore(store.getUser().getStore());
        Optional<User> user = userRepository.findByEmail(store.getUser().getEmail());
        store.setUser(user.get());
        storeRepository.save(store);
        for (long i = 0; i < store.getSeats(); i++) {
            Seats seats = new Seats(i+1, store, true);
            seatsRepository.save(seats);
        }
        return storeRepository.save(store);//이거해라
    }
    
    @GetMapping("/api/store")//가게정보 클라에 제공
    public Optional<Store> getStore(@RequestBody User user) {
        return storeRepository.findByUser(userRepository.findByEmail(user.getEmail()).get());
    }
    @GetMapping("/api/seatInfo")//처음 접속할때 전체좌석정보 보내줌
    public List<Seats> getseatInfo(@RequestBody Store store) {
        return seatsRepository.findAllByStore(storeRepository.findById(store.getId()).get());
    }
    @PostMapping("/api/seatInfo")//주문 정보=seatInfo, 어느가게의 몇번좌석에서 무슨음료샀는지  클라이언트가보냄
    public SeatInfo postseatInfo(@RequestBody SeatInfo seatInfo) {
        Store store = storeRepository.findById(seatInfo.getStore_id()).get();//가게찾고
        Seats seats = seatsRepository.findByStoreAndId(store, seatInfo.getSeat_id()).get();//가게에따른자리
        Item item = itemRepository.findByStoreAndName(store, seatInfo.getItem()).get();//가게에따른 아이템 찾음
        seats.setAvailable(false);
        seatsRepository.save(seats);//좌석현황최신화
        seatInfo.setTime(item.getTime());
        return seatInfo;
    }
    
    @PutMapping("/api/seatInfo")//좌석시간 끝난거 받음
    public Seats putseatInfo(@RequestBody SeatInfo seatInfo) {
        Store store = storeRepository.findById(seatInfo.getStore_id()).get();//가게찾고
        Seats seats = seatsRepository.findByStoreAndId(store, seatInfo.getSeat_id()).get();//가게에따른자리
        seats.setAvailable(true);
        return seatsRepository.save(seats);//좌석현황최신화
    }
}
