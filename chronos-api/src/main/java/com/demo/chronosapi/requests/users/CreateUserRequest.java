package com.demo.chronosapi.requests.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import com.demo.chronosapi.entities.Role;

import java.util.List;

@Getter
@RequiredArgsConstructor
@ToString
public class CreateUserRequest {
    @NotNull @NotEmpty @Size(max = 128) private final String firstName;
    @NotNull @NotEmpty @Size(max = 128) private final String lastName;
    @NotNull @NotEmpty @Size(max = 128) @Email private final String email;
    @NotNull @NotEmpty @Size(max = 128) private final String phone;
    @NotNull @NotEmpty @Size(max = 512) private final String address;
    @NotNull @NotEmpty @Size(max = 128) private final String city;
    @NotNull @NotEmpty @Size(max = 128) private final String state;
    @NotNull @NotEmpty @Size(max = 32) private final String zip;
    @NotNull @NotEmpty @Size(max = 128) private final String country;
    private final List<Role> roles;
}
