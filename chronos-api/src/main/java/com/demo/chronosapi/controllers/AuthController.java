package com.demo.chronosapi.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.demo.chronosapi.requests.auth.ChangePasswordRequest;
import com.demo.chronosapi.requests.auth.InitiatePasswordResetRequest;
import com.demo.chronosapi.requests.auth.LoginRequest;
import com.demo.chronosapi.requests.auth.ResetPasswordRequest;
import com.demo.chronosapi.responses.auth.AuthResponse;
import com.demo.chronosapi.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid final LoginRequest request) {
        final AuthResponse authResponse = authService.login(request);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> logout() {
        authService.logout();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> changePassword(@RequestBody @Valid final ChangePasswordRequest request) {
        authService.changePassword(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/initiate-password-reset")
    @PreAuthorize("permitAll()")
    public ResponseEntity<String> initiatePasswordReset(@RequestBody @Valid final InitiatePasswordResetRequest request) {
        authService.initiatePasswordReset(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reset-password")
    @PreAuthorize("permitAll()")
    public ResponseEntity<String> resetPassword(@RequestBody @Valid final ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleResponseStatusException(final ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
    }
}
