package com.team19.demoweb.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class StorePK implements Serializable {
    private User user;
    private String name;
}
