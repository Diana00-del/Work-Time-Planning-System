package com.demo.chronosapi.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.demo.chronosapi.requests.users.AssignRoleRequest;
import com.demo.chronosapi.requests.users.CreateUserRequest;
import com.demo.chronosapi.requests.users.RemoveRoleRequest;
import com.demo.chronosapi.requests.users.UpdateUserRequest;
import com.demo.chronosapi.responses.user.UserResponse;
import com.demo.chronosapi.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
public class UserController {

    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<List<UserResponse>> getUsers() {
        final List<UserResponse> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable("id") final long id) {
        final UserResponse user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/self")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> getSelf() {
        final UserResponse user = userService.getSelf();
        return ResponseEntity.ok(user);
    }

    @PostMapping("")
    public ResponseEntity<UserResponse> createUser(@RequestBody @Valid final CreateUserRequest request) {
        final UserResponse user = userService.createUser(request);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_USER')")
    public ResponseEntity<UserResponse> updateUser(@PathVariable("id") final long id, @RequestBody @Valid final UpdateUserRequest request) {
        final UserResponse user = userService.updateUser(id, request);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") final long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/assign-role")
    public ResponseEntity<UserResponse> assignRole(@PathVariable("id") final long id, @RequestBody @Valid final AssignRoleRequest request) {
        final UserResponse user = userService.assignRole(id, request);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/{id}/remove-role")
    public ResponseEntity<UserResponse> removeRole(@PathVariable("id") final long id, @RequestBody @Valid final RemoveRoleRequest request) {
        final UserResponse user = userService.removeRole(id, request);
        return ResponseEntity.ok(user);
    }
}
