package com.team19.demoweb.repository;

import com.team19.demoweb.entity.Store;
import com.team19.demoweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByUser(User user); // 유저를 활용하여 매장 검색
    Store findByNameAndUser(String name, User user);
}