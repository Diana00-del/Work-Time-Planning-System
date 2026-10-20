package com.demo.chronosapi.responses.location;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import com.demo.chronosapi.entities.Location;
import com.demo.chronosapi.entities.User;
import com.demo.chronosapi.responses.user.UserResponse;

import java.time.ZonedDateTime;

@Getter
@ToString
@RequiredArgsConstructor
public class LocationResponse {

    private final long id;
    private final boolean deleted;
    private final ZonedDateTime createdAt;
    private final UserResponse createdBy;
    private final String name;
    private final String address;
    private final String city;
    private final String state;
    private final String zip;
    private final String country;
    private final String phone;
    private final String email;

    public static LocationResponse fromLocation(final Location location) {
        return new LocationResponse(
            location.getId(),
            location.isDeleted(),
            location.getCreatedAt(),
            UserResponse.fromUser(location.getCreatedBy()),
            location.getName(),
            location.getAddress(),
            location.getCity(),
            location.getState(),
            location.getZip(),
            location.getCountry(),
            location.getPhone(),
            location.getEmail()
        );
    }
}
