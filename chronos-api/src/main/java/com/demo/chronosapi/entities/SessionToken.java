package com.demo.chronosapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "session_tokens")
public class SessionToken {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User user;

    @Column(nullable = false, length = 4096)
    private String jwt;

    public static SessionToken create(final String jwt, final User user) {
        return SessionToken.builder().user(user).jwt(jwt).build();
    }
}
