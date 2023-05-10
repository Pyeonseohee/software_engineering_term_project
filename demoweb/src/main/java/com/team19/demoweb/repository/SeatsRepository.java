package com.team19.demoweb.repository;

import com.team19.demoweb.entity.Seats;
import com.team19.demoweb.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeatsRepository extends JpaRepository<Seats, Long> {
    Optional<Seats> findByStore(Store store);
    Optional<Seats> findByStoreAndId(Store store, Long id);
    List<Seats> findAllByStore(Store store);
}
