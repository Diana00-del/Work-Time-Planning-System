package com.demo.chronosapi.requests.users;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import com.demo.chronosapi.entities.Role;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RemoveRoleRequest {
    @NotNull private Role role;
}
