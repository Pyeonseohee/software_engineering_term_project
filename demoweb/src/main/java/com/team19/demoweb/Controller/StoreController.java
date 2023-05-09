package com.team19.demoweb.Controller;

import com.team19.demoweb.entity.Store;
import com.team19.demoweb.repository.StoreRepository;
import com.team19.demoweb.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class StoreController {
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    
    public StoreController(StoreRepository storeRepository, UserRepository userRepository) {
        this.storeRepository = storeRepository;
        this.userRepository = userRepository;
    }
    
    @PutMapping("/api/store")
    public Store postStore(@RequestBody Store store) {
        store.setId(storeRepository.findByStore(store.getStore()).get().getId());
        return storeRepository.save(store);
    }
    
    @GetMapping("/api/store")
    public void getStore() {
    
    }
}
