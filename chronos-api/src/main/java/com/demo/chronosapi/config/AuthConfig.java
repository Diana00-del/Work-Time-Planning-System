package com.demo.chronosapi.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "auth")
public class AuthConfig {

    private long tokenExpirationTime;
    private ChronoUnit tokenExpirationTimeUnit;

    private long passwordResetTokenExpirationTime;
    private ChronoUnit passwordResetTokenExpirationTimeUnit;

    private RSAPublicKey rsaPublicKey;
    private RSAPrivateKey rsaPrivateKey;
}
