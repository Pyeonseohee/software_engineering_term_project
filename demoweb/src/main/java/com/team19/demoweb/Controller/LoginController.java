package com.team19.demoweb.Controller;

import com.team19.demoweb.entity.User;
import com.team19.demoweb.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
public class LoginController {

    private final UserRepository userRepository;
    
    public LoginController(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    
    @GetMapping("/api/login")
    public boolean login(@RequestBody User user){
        Optional<User> userEntities = userRepository.findByEmail(user.getEmail());
        if(userEntities.isEmpty() == true) return false;
        if(!userEntities.get().getPw().equals(user.getPw())) return false;
        return true;
    }
    
    //POST로 유저 추가
    @PostMapping ("/api/signIn")
    public User signIn(@RequestBody User user){
        System.out.println(user);
        if(userRepository.findByEmail(user.getEmail()).isPresent()) return null;//중복방지
        return userRepository.save(user);
    }
    
    @GetMapping("/api/findPwd")
    public String findPwd(@RequestBody User user){
        Optional<User> userEntities = userRepository.findByEmail(user.getEmail());
        if(userEntities.isEmpty() == true) return "아이디를 다시 입력해주세요";
        return userEntities.get().getPw();
    }
    @Transactional
    @DeleteMapping("/api/exit")
    public boolean exit(@RequestBody User user) {
        if(userRepository.deleteByEmail(user.getEmail()).isEmpty()) return false;
        return true;
    }
    
}
