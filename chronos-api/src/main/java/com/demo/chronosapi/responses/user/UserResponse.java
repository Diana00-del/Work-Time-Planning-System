package com.demo.chronosapi.responses.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import com.demo.chronosapi.entities.Role;
import com.demo.chronosapi.entities.User;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@ToString
@RequiredArgsConstructor
public class UserResponse {

    private final long id;
    private final ZonedDateTime createdAt;
    private final boolean deleted;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String phone;
    private final String address;
    private final String city;
    private final String state;
    private final String zip;
    private final String country;
    private final List<Role> roles;

    public static UserResponse fromUser(final User user) {
        return new UserResponse(
            user.getId(),
            user.getCreatedAt(),
            user.isDeleted(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPhone(),
            user.getAddress(),
            user.getCity(),
            user.getState(),
            user.getZip(),
            user.getCountry(),
            List.copyOf(user.getRoles())
        );
    }
}
