package com.team19.demoweb.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "user") // database에 해당 이름의 테이블 생성
public class UserEntity { // table 역할
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="user_id")
    private String userid;
    @Column
    private String password;
    @Column
    private String name;
    @Column(name = "store_id")
    private String store;
    
    @Builder
    public UserEntity(String userid, String password, String name, String store) {
        this.userid = userid;
        this.password = password;
        this.name = name;
        this.store = store;
    }
}
