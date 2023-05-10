package com.team19.demoweb.repository;

import com.team19.demoweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUserId(String userId);
    Optional<User> findByEmail(String email);
    Optional<User> deleteByEmail(String email);
    //Optional<User> findByStore(String store);
}
