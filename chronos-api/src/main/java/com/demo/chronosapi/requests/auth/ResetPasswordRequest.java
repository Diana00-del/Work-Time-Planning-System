package com.demo.chronosapi.requests.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class ResetPasswordRequest {
    @NotNull private final String token;
    @NotNull @Size(min = 8, max = 64) private final String newPassword;
}
