package com.demo.chronosapi.requests.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InitiatePasswordResetRequest {
    @NotNull @Email @Size(max = 255) private String email;
}
