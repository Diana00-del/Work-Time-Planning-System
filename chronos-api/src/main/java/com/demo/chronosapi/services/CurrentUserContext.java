package com.demo.chronosapi.services;

import lombok.RequiredArgsConstructor;
import com.demo.chronosapi.entities.User;
import com.demo.chronosapi.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@Component
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.REPEATABLE_READ)
public class CurrentUserContext {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        final Jwt currentUser = (Jwt) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        final String currentUserEmail = currentUser.getSubject();
        return userRepository.findByEmail(currentUserEmail)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("User with email %s, retrieved from security context, not found", currentUserEmail)
                )
            );
    }
}
