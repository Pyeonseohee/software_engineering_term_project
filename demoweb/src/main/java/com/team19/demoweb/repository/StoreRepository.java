package com.team19.demoweb.repository;

import com.team19.demoweb.entity.Store;
import com.team19.demoweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByStore(String store);//유저에서 스토어네임가져온다
}
