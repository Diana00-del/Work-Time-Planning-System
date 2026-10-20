package com.demo.chronosapi.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "locations")
public class Location {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private boolean deleted;

    @Column(nullable = false)
    private ZonedDateTime createdAt;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User createdBy;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 512)
    private String address;

    @Column(nullable = false, length = 128)
    private String city;

    @Column(nullable = false, length = 128)
    private String state;

    @Column(nullable = false, length = 128)
    private String zip;

    @Column(nullable = false, length = 128)
    private String country;

    @Column(nullable = false, length = 64)
    private String phone;

    @Column(nullable = false, length = 128)
    private String email;

    public void update(
        final String name,
        final String address,
        final String city,
        final String state,
        final String zip,
        final String country,
        final String phone,
        final String email
    ) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.phone = phone;
        this.email = email;
    }

    public void delete() {
        this.deleted = true;
    }

    public static Location create(
        final User createdBy,
        final String name,
        final String address,
        final String city,
        final String state,
        final String zip,
        final String country,
        final String phone,
        final String email
    ) {
        return Location.builder()
            .deleted(false)
            .createdAt(ZonedDateTime.now())
            .createdBy(createdBy)
            .name(name)
            .address(address)
            .city(city)
            .state(state)
            .zip(zip)
            .country(country)
            .phone(phone)
            .email(email)
            .build();
    }
}

