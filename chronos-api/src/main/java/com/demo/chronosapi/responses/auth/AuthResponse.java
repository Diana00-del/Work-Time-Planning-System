package com.demo.chronosapi.responses.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import com.demo.chronosapi.entities.Role;

import java.util.List;

@Getter
@RequiredArgsConstructor
@ToString
public class AuthResponse {
    public final String authToken;
}
