package com.demo.chronosapi.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.demo.chronosapi.requests.location.CreateLocationRequest;
import com.demo.chronosapi.requests.location.UpdateLocationRequest;
import com.demo.chronosapi.responses.location.LocationResponse;
import com.demo.chronosapi.services.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/locations")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
public class LocationController {

    private final LocationService locationService;

    @GetMapping("")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_EMPLOYEE')")
    public ResponseEntity<List<LocationResponse>> getLocations() {
        final List<LocationResponse> locations = locationService.getLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationResponse> getLocation(@PathVariable("id") final long id) {
        final LocationResponse location = locationService.getLocation(id);
        return ResponseEntity.ok(location);
    }

    @PostMapping("")
    public ResponseEntity<LocationResponse> createLocation(@RequestBody @Valid final CreateLocationRequest request) {
        final LocationResponse location = locationService.createLocation(request);
        return ResponseEntity.ok(location);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationResponse> updateLocation(@PathVariable("id") final long id, @RequestBody @Valid final UpdateLocationRequest request) {
        final LocationResponse location = locationService.updateLocation(id, request);
        return ResponseEntity.ok(location);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable("id") final long id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}
