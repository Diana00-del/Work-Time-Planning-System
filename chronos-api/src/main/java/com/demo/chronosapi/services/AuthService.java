package com.demo.chronosapi.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.demo.chronosapi.config.AuthConfig;
import com.demo.chronosapi.entities.User;
import com.demo.chronosapi.entities.UserPasswordReset;
import com.demo.chronosapi.repositories.UserPasswordResetRepository;
import com.demo.chronosapi.repositories.UserRepository;
import com.demo.chronosapi.requests.auth.ChangePasswordRequest;
import com.demo.chronosapi.requests.auth.InitiatePasswordResetRequest;
import com.demo.chronosapi.requests.auth.LoginRequest;
import com.demo.chronosapi.requests.auth.ResetPasswordRequest;
import com.demo.chronosapi.responses.auth.AuthResponse;
import com.demo.chronosapi.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;

@Slf4j
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.REPEATABLE_READ)
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserPasswordResetRepository userPasswordResetRepository;
    private final AuthConfig authConfig;
    private final MessageService messageService;

    public AuthResponse login(final LoginRequest request) {
        log.info("Logging in user: {}", request);

        final Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        if (!authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        final User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        final String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }

    public void logout() {
        final Object credentials = SecurityContextHolder.getContext().getAuthentication().getCredentials();
        if (credentials instanceof Jwt jwt) {
            final String token = jwt.getTokenValue();
            log.info("Logging out user with token: {}", token);
            jwtService.invalidateToken(token);
        }
    }

    public void initiatePasswordReset(final InitiatePasswordResetRequest request) {
        log.info("Initiating password reset for email: {}", request.getEmail());

        final User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        final ZonedDateTime expiryDate = ZonedDateTime.now().plus(
            authConfig.getPasswordResetTokenExpirationTime(),
            authConfig.getPasswordResetTokenExpirationTimeUnit()
        );
        final UserPasswordReset userPasswordReset = UserPasswordReset.create(user, expiryDate);

        messageService.sendResetPasswordMessage(user.getEmail(), userPasswordReset.getToken());
        userPasswordResetRepository.save(userPasswordReset);
    }

    public void resetPassword(final ResetPasswordRequest request) {
        log.info("Resetting password for token: {}", request.getToken());

        final UserPasswordReset userPasswordReset = userPasswordResetRepository.findByToken(request.getToken())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Token not found"));

        if (userPasswordReset.getExpiresAt().isBefore(ZonedDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token expired");
        }

        final User user = userPasswordReset.getUser();
        user.updatePassword(request.getNewPassword());
        userRepository.save(user);
    }

    public void changePassword(final ChangePasswordRequest request) {
        final String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Changing password for email: {}", email);

        final User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!BCrypt.checkpw(request.getOldPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid current password");
        }

        user.updatePassword(request.getNewPassword());
        userRepository.save(user);
    }
}
