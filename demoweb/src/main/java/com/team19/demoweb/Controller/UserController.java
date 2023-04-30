package com.team19.demoweb.Controller;

import com.team19.demoweb.entity.UserEntity;
import com.team19.demoweb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.sql.*;
import java.util.Map;

@Controller
@RestController
@RequiredArgsConstructor
public class UserController {

    private UserRepository userRepository;
    @Autowired
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    //POST로 유저 추가
    @PostMapping ("/api/Login")
    public UserEntity put(@RequestBody Map<String, Object> param){
        System.out.println(param);
        System.out.println(param.get("pw"));
        return userRepository.save(new UserEntity((String)param.get("email"), (String)param.get("pw")));
    }
}
