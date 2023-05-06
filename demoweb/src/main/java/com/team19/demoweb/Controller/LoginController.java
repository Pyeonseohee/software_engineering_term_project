package com.team19.demoweb.Controller;

import com.team19.demoweb.entity.UserEntity;
import com.team19.demoweb.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@Transactional(readOnly = true)
public class LoginController {

    private final UserRepository userRepository;
    
    public LoginController(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    @PersistenceContext
    private EntityManager em;
    
    @PostMapping("/api/login")
    public boolean login(@RequestBody Map<String, Object> param){
        List<UserEntity> userEntities = em.createQuery("select m from UserEntity m where m.userid = :userid and m.password = :password", UserEntity.class)
                .setParameter("userid", param.get("email")).getResultList();//"password", param.get("email")
        if(userEntities.isEmpty() == true) return false;
        if(!userEntities.get(0).getPassword().equals((param.get("pw")))) return false;
        return true;
    }
    
    //POST로 유저 추가
    @PostMapping ("/api/signIn")
    public UserEntity put(@RequestBody Map<String, Object> param){
        System.out.println(param);
        return userRepository.save(new UserEntity((String)param.get("email"), (String)param.get("pw"), (String)param.get("name"), (String)param.get("store")));
    }
    
    @PostMapping("/api/findPwd")
    public String findpwd(@RequestBody Map<String, Object> param){
        List<UserEntity> userEntities = em.createQuery("select m from UserEntity m where m.userid = :userid", UserEntity.class)
                .setParameter("userid", param.get("email")).getResultList();
        if(userEntities.isEmpty() == true) return "아이디를 다시 입력해주세요";
        return userEntities.get(0).getPassword();
    }
}
