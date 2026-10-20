package com.demo.chronosapi.repositories;

import com.demo.chronosapi.entities.UserPasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserPasswordResetRepository extends JpaRepository<UserPasswordReset, Long>, JpaSpecificationExecutor<UserPasswordReset> {

    Optional<UserPasswordReset> findByToken(String email);
}
