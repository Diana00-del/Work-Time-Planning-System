package com.demo.chronosapi.requests.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class LoginRequest {

    @NotNull @Email @Size(max = 255) private final String email;
    @NotNull @Size(min = 8, max = 64) private final String password;
}
