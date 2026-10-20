package com.demo.chronosapi.requests.timeentry;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class UpdateTimeEntryRequest {

    private final long userId;
    private final long locationId;
    private final ZonedDateTime startTime;
    private final ZonedDateTime endTime;
    private final String description;
}
