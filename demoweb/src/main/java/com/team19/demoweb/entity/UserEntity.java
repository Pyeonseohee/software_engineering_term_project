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
    @Column(name="user_id")
    private String email;
    @Column(name="password")
    private String pw;
    @Column
    private String name;
    @Column(name = "store_id")
    private String store;
    
    @Builder
    public UserEntity(String email, String pw, String name, String store) {
        this.email = email;
        this.pw = pw;
        this.name = name;
        this.store = store;
    }
}
