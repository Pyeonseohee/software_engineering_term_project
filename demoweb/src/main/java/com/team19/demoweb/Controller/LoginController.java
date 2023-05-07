package com.team19.demoweb.Controller;

import com.team19.demoweb.entity.UserEntity;
import com.team19.demoweb.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
public class LoginController {

    private final UserRepository userRepository;
    
    public LoginController(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    @PersistenceContext
    private EntityManager em;
    
    @GetMapping("/api/login")
    public boolean login(@RequestBody UserEntity user){
        Optional<UserEntity> userEntities = userRepository.findByEmail(user.getEmail());
        if(userEntities.isEmpty() == true) return false;
        if(!userEntities.get().getPw().equals(user.getPw())) return false;
        return true;
    }
    
    //POST로 유저 추가
    @PostMapping ("/api/signIn")
    public UserEntity signIn(@RequestBody UserEntity user){
        System.out.println(user);
        return userRepository.save(user);
    }
    
    @GetMapping("/api/findPwd")
    public String findPwd(@RequestBody UserEntity user){
        Optional<UserEntity> userEntities = userRepository.findByEmail(user.getEmail());
        if(userEntities.isEmpty() == true) return "아이디를 다시 입력해주세요";
        return userEntities.get().getPw();
    }
    @Transactional
    @DeleteMapping("/api/exit")
    public void exit(@RequestBody UserEntity user) {
        userRepository.deleteByEmail(user.getEmail());
    }
}
