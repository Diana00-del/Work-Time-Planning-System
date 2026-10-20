package com.demo.chronosapi.repositories;

import com.demo.chronosapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    List<User> findAllByDeletedFalse();
    Optional<User> findByEmail(String email);
}
