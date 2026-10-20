package com.demo.chronosapi.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.demo.chronosapi.entities.Location;
import com.demo.chronosapi.entities.Role;
import com.demo.chronosapi.entities.TimeEntry;
import com.demo.chronosapi.entities.User;
import com.demo.chronosapi.repositories.LocationRepository;
import com.demo.chronosapi.repositories.TimeEntryRepository;
import com.demo.chronosapi.repositories.UserRepository;
import com.demo.chronosapi.requests.timeentry.CreateTimeEntryRequest;
import com.demo.chronosapi.requests.timeentry.MoveTimeEntryRequest;
import com.demo.chronosapi.requests.timeentry.RejectTimeEntryRequest;
import com.demo.chronosapi.requests.timeentry.UpdateTimeEntryRequest;
import com.demo.chronosapi.responses.timeentry.TimeEntryResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.REPEATABLE_READ)
@RequiredArgsConstructor
public class TimeEntryService {
    private final LocationRepository locationRepository;

    private final TimeEntryRepository timeEntryRepository;
    private final UserRepository userRepository;
    private final CurrentUserContext currentUserContext;

    public List<TimeEntryResponse> getTimeEntries() {
        log.info("Getting all time entries");
        return timeEntryRepository.findAllByDeletedFalse()
            .stream()
            .map(TimeEntryResponse::fromTimeEntry)
            .toList();
    }

    public TimeEntryResponse getTimeEntry(final long id) {
        log.info("Getting time entry with id {}", id);
        return timeEntryRepository.findById(id)
            .map(TimeEntryResponse::fromTimeEntry)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Time entry with id %d not found", id)
                )
            );
    }

    public TimeEntryResponse createTimeEntry(final CreateTimeEntryRequest request) {
        log.info("Creating time entry: {}", request);

        final User currentUser = currentUserContext.getCurrentUser();
        final User user = userRepository.findById(request.getUserId())
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.format("User with id %d not found", request.getUserId())
                )
            );

        if (currentUser.getId() != user.getId() && !currentUser.hasAnyRole(Role.ADMIN, Role.MANAGER)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "You are not allowed to create time entries for other users"
            );
        }

        final Location location = locationRepository.findById(request.getLocationId())
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.format("Location with name %s not found", request.getLocationId())
                )
            );

        if (request.getStartTime().isAfter(request.getEndTime())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Start time cannot be after end time"
            );
        }

        final TimeEntry timeEntry = TimeEntry.create(
            currentUser,
            user,
            location,
            request.getStartTime(),
            request.getEndTime(),
            request.getDescription()
        );
        return TimeEntryResponse.fromTimeEntry(timeEntryRepository.save(timeEntry));
    }

    public TimeEntryResponse createSubmittedTimeEntry(final CreateTimeEntryRequest request) {
        log.info("Creating time entry: {}", request);

        final User currentUser = currentUserContext.getCurrentUser();
        final User user = userRepository.findById(request.getUserId())
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.format("User with id %d not found", request.getUserId())
                )
            );

        if (currentUser.getId() != user.getId() && !currentUser.hasAnyRole(Role.ADMIN, Role.MANAGER)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "You are not allowed to create time entries for other users"
            );
        }

        final Location location = locationRepository.findById(request.getLocationId())
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.format("Location with name %s not found", request.getLocationId())
                )
            );

        if (request.getStartTime().isAfter(request.getEndTime())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Start time cannot be after end time"
            );
        }

        final TimeEntry timeEntry = TimeEntry.createPending(
            currentUser,
            user,
            location,
            request.getStartTime(),
            request.getEndTime(),
            request.getDescription()
        );
        return TimeEntryResponse.fromTimeEntry(timeEntryRepository.save(timeEntry));
    }

    public TimeEntryResponse updateTimeEntry(final long id, final UpdateTimeEntryRequest request) {
        log.info("Updating time entry with id {}: {}", id, request);
        final TimeEntry timeEntry = timeEntryRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Time entry with id %d not found", id)
                )
            );

        final User user = userRepository.findById(request.getUserId())
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.format("User with id %d not found", request.getUserId())
                )
            );
        final User currentUser = currentUserContext.getCurrentUser();
        if (currentUser.getId() != timeEntry.getUser().getId() && !currentUser.hasAnyRole(Role.ADMIN, Role.MANAGER)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "You are not allowed to update time entries for other users"
            );
        }

        final Location location = locationRepository.findById(request.getLocationId())
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.format("Location with name %s not found", request.getLocationId())
                )
            );

        if (request.getStartTime().isAfter(request.getEndTime())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Start time cannot be after end time"
            );
        }

        timeEntry.update(
            user,
            location,
            request.getStartTime(),
            request.getEndTime(),
            request.getDescription()
        );
        return TimeEntryResponse.fromTimeEntry(timeEntryRepository.save(timeEntry));
    }

    public TimeEntryResponse moveTimeEntry(final long id, final MoveTimeEntryRequest request) {
        log.info("Moving time entry with id {}: {}", id, request);
        final TimeEntry timeEntry = timeEntryRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Time entry with id %d not found", id)
                )
            );

        final User currentUser = currentUserContext.getCurrentUser();
        if (currentUser.getId() != timeEntry.getUser().getId() && !currentUser.hasAnyRole(Role.ADMIN, Role.MANAGER)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "You are not allowed to update time entries for other users"
            );
        }

        if (request.getStartTime().isAfter(request.getEndTime())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Start time cannot be after end time"
            );
        }

        timeEntry.move(request.getStartTime(), request.getEndTime());
        return TimeEntryResponse.fromTimeEntry(timeEntryRepository.save(timeEntry));
    }

    public void deleteTimeEntry(final long id) {
        log.info("Deleting time entry with id {}", id);
        final TimeEntry timeEntry = timeEntryRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Time entry with id %d not found", id)
                )
            );
        final User currentUser = currentUserContext.getCurrentUser();
        if (currentUser.getId() != timeEntry.getUser().getId() && !currentUser.hasAnyRole(Role.ADMIN, Role.MANAGER)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "You are not allowed to delete time entries for other users"
            );
        }
        timeEntry.delete();
        timeEntryRepository.save(timeEntry);
    }

    public TimeEntryResponse submitTimeEntry(final long id) {
        log.info("Submitting time entry with id {}", id);
        final TimeEntry timeEntry = timeEntryRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Time entry with id %d not found", id)
                )
            );
        final User currentUser = currentUserContext.getCurrentUser();
        if (currentUser.getId() != timeEntry.getUser().getId() && !currentUser.hasAnyRole(Role.ADMIN, Role.MANAGER)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "You are not allowed to submit time entries for other users"
            );
        }
        timeEntry.submit();
        return TimeEntryResponse.fromTimeEntry(timeEntryRepository.save(timeEntry));
    }

    public TimeEntryResponse approveTimeEntry(final long id) {
        log.info("Approving time entry with id {}", id);
        final TimeEntry timeEntry = timeEntryRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Time entry with id %d not found", id)
                )
            );
        timeEntry.approve();
        return TimeEntryResponse.fromTimeEntry(timeEntryRepository.save(timeEntry));
    }

    public TimeEntryResponse rejectTimeEntry(final long id, final RejectTimeEntryRequest rejectionReason) {
        log.info("Rejecting time entry with id {}", id);
        final TimeEntry timeEntry = timeEntryRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Time entry with id %d not found", id)
                )
            );
        timeEntry.reject(rejectionReason.getRejectionReason());
        return TimeEntryResponse.fromTimeEntry(timeEntryRepository.save(timeEntry));
    }
}
