package com.demo.chronosapi.requests.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class ChangePasswordRequest {
    @NotNull @Size(min = 8, max = 64) private final String oldPassword;
    @NotNull @Size(min = 8, max = 64) private final String newPassword;
}
