package com.demo.chronosapi.repositories;

import com.demo.chronosapi.entities.SessionToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface SessionTokenRepository extends JpaRepository<SessionToken, Long>, JpaSpecificationExecutor<SessionToken> {

    Optional<SessionToken> findByJwt(final String jwt);
    void deleteByJwt(final String jwt);
}
