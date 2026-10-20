package com.demo.chronosapi.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MessageService {

    public void sendMessage(final String email, final String message) {
        // TODO: Implement sending message to email
        log.info("Sending message to {}: {}", email, message);
    }

    public void sendResetPasswordMessage(final String email, final String token) {
        // TODO: Implement sending reset password message to email
        log.info("Sending reset password message to {}: {}", email, token);
    }
}
