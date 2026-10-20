package com.demo.chronosapi.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.demo.chronosapi.requests.timeentry.CreateTimeEntryRequest;
import com.demo.chronosapi.requests.timeentry.MoveTimeEntryRequest;
import com.demo.chronosapi.requests.timeentry.RejectTimeEntryRequest;
import com.demo.chronosapi.requests.timeentry.UpdateTimeEntryRequest;
import com.demo.chronosapi.responses.timeentry.TimeEntryResponse;
import com.demo.chronosapi.services.TimeEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/time-entries")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_EMPLOYEE')")
public class TimeEntryController {

    private final TimeEntryService timeEntryService;

    @GetMapping("")
    public ResponseEntity<List<TimeEntryResponse>> getTimeEntries() {
        final List<TimeEntryResponse> timeEntries = timeEntryService.getTimeEntries();
        return ResponseEntity.ok(timeEntries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeEntryResponse> getTimeEntry(@PathVariable("id") final long id) {
        final TimeEntryResponse timeEntry = timeEntryService.getTimeEntry(id);
        return ResponseEntity.ok(timeEntry);
    }

    @PostMapping("")
    public ResponseEntity<TimeEntryResponse> createTimeEntry(@RequestBody @Valid final CreateTimeEntryRequest request) {
        final TimeEntryResponse timeEntry = timeEntryService.createTimeEntry(request);
        return ResponseEntity.ok(timeEntry);
    }

    @PostMapping("/submitted")
    public ResponseEntity<TimeEntryResponse> createSubmittedTimeEntry(@RequestBody @Valid final CreateTimeEntryRequest request) {
        final TimeEntryResponse timeEntry = timeEntryService.createSubmittedTimeEntry(request);
        return ResponseEntity.ok(timeEntry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeEntryResponse> updateTimeEntry(@PathVariable("id") final long id, @RequestBody @Valid final UpdateTimeEntryRequest request) {
        final TimeEntryResponse timeEntry = timeEntryService.updateTimeEntry(id, request);
        return ResponseEntity.ok(timeEntry);
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<TimeEntryResponse> moveTimeEntry(@PathVariable("id") final long id, @RequestBody @Valid MoveTimeEntryRequest request) {
        final TimeEntryResponse timeEntry = timeEntryService.moveTimeEntry(id, request);
        return ResponseEntity.ok(timeEntry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeEntry(@PathVariable("id") final long id) {
        timeEntryService.deleteTimeEntry(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/submit")
    public ResponseEntity<TimeEntryResponse> submitTimeEntry(@PathVariable("id") final long id) {
        final TimeEntryResponse timeEntry = timeEntryService.submitTimeEntry(id);
        return ResponseEntity.ok(timeEntry);
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<TimeEntryResponse> approveTimeEntry(@PathVariable("id") final long id) {
        final TimeEntryResponse timeEntry = timeEntryService.approveTimeEntry(id);
        return ResponseEntity.ok(timeEntry);
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<TimeEntryResponse> rejectTimeEntry(@PathVariable("id") final long id, @RequestBody @Valid final RejectTimeEntryRequest request) {
        final TimeEntryResponse timeEntry = timeEntryService.rejectTimeEntry(id, request);
        return ResponseEntity.ok(timeEntry);
    }
}
