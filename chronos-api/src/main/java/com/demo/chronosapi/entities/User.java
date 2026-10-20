package com.demo.chronosapi.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

@Getter
@Builder(access = AccessLevel.PACKAGE)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private boolean deleted;

    @Column(nullable = false)
    private ZonedDateTime createdAt;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User createdBy;

    @Column(nullable = false, length = 128)
    private String firstName;

    @Column(nullable = false, length = 128)
    private String lastName;

    @Column(nullable = false, length = 128, unique = true)
    private String email;

    @Column(nullable = false, length = 32)
    private String phone;

    @Column(nullable = false, length = 512)
    private String address;

    @Column(nullable = false, length = 128)
    private String city;

    @Column(nullable = false, length = 128)
    private String state;

    @Column(nullable = false, length = 32)
    private String zip;

    @Column(nullable = false, length = 128)
    private String country;

    @Column(nullable = false, length = 128)
    private String password;

    @Column(name = "role")
    @ElementCollection(targetClass = Role.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    private List<Role> roles;

    @OneToMany(mappedBy = "user")
    private List<UserPasswordReset> passwordResets;

    public void update(
        final String firstName,
        final String lastName,
        final String email,
        final String phone,
        final String address,
        final String city,
        final String state,
        final String zip,
        final String country
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
    }

    public void updatePassword(final String password) {
        final String salt = BCrypt.gensalt();
        this.password = BCrypt.hashpw(password, salt);
    }

    public void delete() {
        this.deleted = true;
    }

    public void assignRole(final Role role) {
        if (this.roles.contains(role)) {
            return;
        }
        this.roles.add(role);
    }

    public void removeRole(final Role role) {
        this.roles.remove(role);
    }

    public boolean hasRole(final Role role) {
        return this.roles.contains(role);
    }

    public boolean hasAnyRole(final Role... roles) {
        return Arrays.stream(roles).anyMatch(this::hasRole);
    }

    public static User createUser(
        final String firstName,
        final String lastName,
        final String email,
        final String phone,
        final String address,
        final String city,
        final String state,
        final String zip,
        final String country,
        final String password,
        final List<Role> roles,
        final User createdBy
    ) {
        final String salt = BCrypt.gensalt();
        return User.builder()
            .deleted(false)
            .createdAt(ZonedDateTime.now())
            .createdBy(createdBy)
            .firstName(firstName)
            .lastName(lastName)
            .email(email)
            .phone(phone)
            .address(address)
            .city(city)
            .state(state)
            .zip(zip)
            .country(country)
            .password(BCrypt.hashpw(password, salt))
            .roles(roles)
            .build();
    }
}
