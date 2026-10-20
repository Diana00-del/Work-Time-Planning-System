package com.demo.chronosapi.requests.timeentry;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class MoveTimeEntryRequest {
    private final ZonedDateTime startTime;
    private final ZonedDateTime endTime;
}
