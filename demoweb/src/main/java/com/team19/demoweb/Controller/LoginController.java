// src/main/java/com.demogroup.demoweb/Controller/HelloWorldController.java

package com.team19.demoweb.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
@CrossOrigin(origins = "*")
@RestController
public class LoginController {

    @PostMapping("/api/login")
    public void test(@RequestBody Map<String, Object> param) {
        System.out.println(param);
    }
}