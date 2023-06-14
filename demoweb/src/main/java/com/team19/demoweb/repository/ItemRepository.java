package com.team19.demoweb.repository;

import com.team19.demoweb.entity.Item;
import com.team19.demoweb.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByStore(Store store); //해당 store의 전체 item을 List 형식으로 반환
    Item findByStoreAndName(Store store, String name); // store와 item의 이름을 기반으로 탐색
}