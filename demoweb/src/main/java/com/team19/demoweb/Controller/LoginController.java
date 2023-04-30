package com.team19.demoweb.Controller;

import com.team19.demoweb.entity.UserEntity;
import com.team19.demoweb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@Controller
@RestController
@RequiredArgsConstructor
public class LoginController {

    private UserRepository userRepository;
    
    public LoginController(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    //POST로 유저 추가
    @PostMapping ("/api/login")
    public UserEntity put(@RequestBody Map<String, Object> param){
        //System.out.println(param);
        return userRepository.save(new UserEntity((String)param.get("email"), (String)param.get("pw")));
    }
}
