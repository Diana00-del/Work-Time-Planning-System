package com.demo.chronosapi.requests.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UpdateUserRequest {
    @NotNull @NotEmpty @Size(max = 128) private String firstName;
    @NotNull @NotEmpty @Size(max = 128) private String lastName;
    @NotNull @NotEmpty @Size(max = 128) @Email private String email;
    @NotNull @NotEmpty @Size(max = 128) private String phone;
    @NotNull @NotEmpty @Size(max = 512) private String address;
    @NotNull @NotEmpty @Size(max = 128) private String city;
    @NotNull @NotEmpty @Size(max = 128) private String state;
    @NotNull @NotEmpty @Size(max = 32) private String zip;
    @NotNull @NotEmpty @Size(max = 128) private String country;
}
