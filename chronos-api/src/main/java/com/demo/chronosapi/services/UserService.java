package com.demo.chronosapi.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.demo.chronosapi.entities.Role;
import com.demo.chronosapi.entities.User;
import com.demo.chronosapi.repositories.UserRepository;
import com.demo.chronosapi.requests.users.AssignRoleRequest;
import com.demo.chronosapi.requests.users.CreateUserRequest;
import com.demo.chronosapi.requests.users.RemoveRoleRequest;
import com.demo.chronosapi.requests.users.UpdateUserRequest;
import com.demo.chronosapi.responses.user.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.REPEATABLE_READ)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CurrentUserContext currentUserContext;

    public List<UserResponse> getUsers() {
        log.info("Getting all users");
        return userRepository.findAllByDeletedFalse()
            .stream()
            .map(UserResponse::fromUser)
            .toList();
    }

    public UserResponse getUser(final long id) {
        log.info("Getting user with id {}", id);
        return userRepository.findById(id)
            .map(UserResponse::fromUser)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("User with id %d not found", id)
                )
            );
    }

    public UserResponse getSelf() {
        log.info("Getting self");
        return UserResponse.fromUser(currentUserContext.getCurrentUser());
    }

    public UserResponse createUser(final CreateUserRequest request) {
        log.info("Creating user: {}", request);
        final Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                String.format("User with email %s already exists", request.getEmail())
            );
        }

        final String password = BCrypt.gensalt();
        final User user = User.createUser(
            request.getFirstName(),
            request.getLastName(),
            request.getEmail(),
            request.getPhone(),
            request.getAddress(),
            request.getCity(),
            request.getState(),
            request.getZip(),
            request.getCountry(),
            password,
            request.getRoles(),
            currentUserContext.getCurrentUser()
        );

        return UserResponse.fromUser(userRepository.save(user));
    }

    public UserResponse updateUser(final long id, final UpdateUserRequest request) {
        log.info("Updating user with id {}: {}", id, request);

        final User user = userRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("User with id %d not found", id)
                )
            );

        final User currentUser = currentUserContext.getCurrentUser();
        if (currentUser.getId() != user.getId() && !currentUser.hasAnyRole(Role.ADMIN, Role.MANAGER)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                String.format("User %d does not have permission to update user with id %d", currentUser.getId(), id)
            );
        }

        user.update(
            request.getFirstName(),
            request.getLastName(),
            request.getEmail(),
            request.getPhone(),
            request.getAddress(),
            request.getCity(),
            request.getState(),
            request.getZip(),
            request.getCountry()
        );
        return UserResponse.fromUser(userRepository.save(user));
    }

    public void deleteUser(final long id) {
        log.info("Deleting user with id {}", id);

        final User user = userRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("User with id %d not found", id)
                )
            );

        user.delete();
        userRepository.save(user);
    }

    public UserResponse assignRole(final long id, final AssignRoleRequest request) {
        log.info("Assigning role {} to user with id {}", request.getRole(), id);

        final User user = userRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("User with id %d not found", id)
                )
            );

        user.assignRole(request.getRole());
        return UserResponse.fromUser(userRepository.save(user));
    }

    public UserResponse removeRole(final long id, final RemoveRoleRequest request) {
        log.info("Removing role {} from user with id {}", request.getRole(), id);

        final User user = userRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("User with id %d not found", id)
                )
            );

        user.removeRole(request.getRole());
        return UserResponse.fromUser(userRepository.save(user));
    }
}
