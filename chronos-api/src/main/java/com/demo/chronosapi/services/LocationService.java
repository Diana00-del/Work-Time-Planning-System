package com.demo.chronosapi.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.demo.chronosapi.entities.Location;
import com.demo.chronosapi.repositories.LocationRepository;
import com.demo.chronosapi.requests.location.CreateLocationRequest;
import com.demo.chronosapi.requests.location.UpdateLocationRequest;
import com.demo.chronosapi.responses.location.LocationResponse;
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
public class LocationService {

    private final LocationRepository locationRepository;
    private final CurrentUserContext currentUserContext;

    public List<LocationResponse> getLocations() {
        log.info("Getting all locations");
        return locationRepository.findAllByDeletedFalse()
            .stream()
            .map(LocationResponse::fromLocation)
            .toList();
    }

    public LocationResponse getLocation(final long id) {
        log.info("Getting location with id {}", id);
        return locationRepository.findById(id)
            .map(LocationResponse::fromLocation)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Location with id %d not found", id)
                )
            );
    }

    public LocationResponse createLocation(final CreateLocationRequest request) {
        log.info("Creating location: {}", request);

        final Location location = Location.create(
            currentUserContext.getCurrentUser(),
            request.getName(),
            request.getAddress(),
            request.getCity(),
            request.getState(),
            request.getZip(),
            request.getCountry(),
            request.getPhone(),
            request.getEmail()
        );

        return LocationResponse.fromLocation(locationRepository.save(location));
    }

    public LocationResponse updateLocation(final long id, final UpdateLocationRequest request) {
        log.info("Updating location with id {}: {}", id, request);

        final Location location = locationRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Location with id %d not found", id)
                )
            );

        location.update(
            request.getName(),
            request.getAddress(),
            request.getCity(),
            request.getState(),
            request.getZip(),
            request.getCountry(),
            request.getPhone(),
            request.getEmail()
        );

        return LocationResponse.fromLocation(locationRepository.save(location));
    }

    public void deleteLocation(final long id) {
        log.info("Deleting location with id {}", id);

        final Location location = locationRepository.findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Location with id %d not found", id)
                )
            );

        location.delete();
        locationRepository.save(location);
    }
}
