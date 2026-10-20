package com.demo.chronosapi.responses.timeentry;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import com.demo.chronosapi.entities.TimeEntry;
import com.demo.chronosapi.entities.TimeEntryStatus;
import com.demo.chronosapi.responses.location.LocationResponse;
import com.demo.chronosapi.responses.user.UserResponse;

import java.time.ZonedDateTime;

@Getter
@ToString
@RequiredArgsConstructor
public class TimeEntryResponse {

    private final long id;
    private final ZonedDateTime createdAt;
    private final UserResponse createdBy;
    private final UserResponse user;
    private final LocationResponse location;
    private final ZonedDateTime startTime;
    private final ZonedDateTime endTime;
    private final String description;
    private final TimeEntryStatus status;
    private final String rejectionReason;

    public static TimeEntryResponse fromTimeEntry(final TimeEntry timeEntry) {
        return new TimeEntryResponse(
            timeEntry.getId(),
            timeEntry.getCreatedAt(),
            UserResponse.fromUser(timeEntry.getCreatedBy()),
            UserResponse.fromUser(timeEntry.getUser()),
            LocationResponse.fromLocation(timeEntry.getLocation()),
            timeEntry.getStartTime(),
            timeEntry.getEndTime(),
            timeEntry.getDescription(),
            timeEntry.getStatus(),
            timeEntry.getRejectionReason()
        );
    }
}
