package com.demo.chronosapi.requests.location;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class UpdateLocationRequest {
    @NotNull @NotEmpty @Size(min = 3, max = 255) private final String name;
    @NotNull @NotEmpty @Size(min = 3, max = 512) private final String address;
    @NotNull @NotEmpty @Size(min = 3, max = 128) private final String city;
    @NotNull @NotEmpty @Size(min = 3, max = 128) private final String state;
    @NotNull @NotEmpty @Size(min = 3, max = 128) private final String zip;
    @NotNull @NotEmpty @Size(min = 3, max = 128) private final String country;
    @NotNull @NotEmpty @Size(min = 3, max = 64) private final String phone;
    @NotNull @NotEmpty @Size(min = 3, max = 128) @Email private final String email;
}
