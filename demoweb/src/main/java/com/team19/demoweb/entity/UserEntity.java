package com.team19.demoweb.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@Table(name = "user") // database에 해당 이름의 테이블 생성
public class UserEntity { // table 역할
    @Id
    private String id;

    @Column
    private String password;
    public UserEntity (String id, String password){
        this.id = id;
        this.password = password;
    }
}
