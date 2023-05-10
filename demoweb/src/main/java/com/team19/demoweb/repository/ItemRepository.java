package com.team19.demoweb.repository;

import com.team19.demoweb.entity.Item;
import com.team19.demoweb.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByStore(Store store);
    Optional<Item> findByStoreAndName(Store store, String name);
    List<Item> findAllByStore(Store store);
}
