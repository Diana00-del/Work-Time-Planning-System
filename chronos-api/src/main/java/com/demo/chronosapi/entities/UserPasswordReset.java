package com.demo.chronosapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_password_resets")
public class UserPasswordReset {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private ZonedDateTime createdAt;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User user;

    @Column(nullable = false, length = 128)
    private String token;
    
    @Column(nullable = false)
    private ZonedDateTime expiresAt;

    public static UserPasswordReset create(final User user, final ZonedDateTime expiryDate) {
        return UserPasswordReset.builder()
            .createdAt(ZonedDateTime.now())
            .user(user)
            .token(UUID.randomUUID().toString())
            .expiresAt(expiryDate)
            .build();
    }
}
