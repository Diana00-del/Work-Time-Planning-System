package com.demo.chronosapi.security;

import lombok.RequiredArgsConstructor;
import com.demo.chronosapi.config.AuthConfig;
import com.demo.chronosapi.entities.SessionToken;
import com.demo.chronosapi.entities.User;
import com.demo.chronosapi.repositories.SessionTokenRepository;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@RequiredArgsConstructor
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.REPEATABLE_READ)
public class JwtService {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final AuthConfig authConfig;
    private final SessionTokenRepository sessionTokenRepository;

    public String generateToken(final User user) {
        final Instant now = Instant.now();
        final Instant expiresAt = now.plus(authConfig.getTokenExpirationTime(), authConfig.getTokenExpirationTimeUnit());

        final JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("chronos-api")
            .issuedAt(now)
            .expiresAt(expiresAt)
            .subject(user.getEmail())
            .claim("firstName", user.getFirstName())
            .claim("lastName", user.getLastName())
            .claim("roles", user.getRoles())
            .build();

        final String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        final SessionToken sessionToken = SessionToken.create(token, user);

        sessionTokenRepository.save(sessionToken);
        return token;
    }

    public void invalidateToken(final String jwt) {
        sessionTokenRepository.deleteByJwt(jwt);
    }
}
