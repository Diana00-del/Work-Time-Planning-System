package com.demo.chronosapi.requests.timeentry;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class CreateTimeEntryRequest {

    @NotNull private final long userId;
    @NotNull private final long locationId;
    @NotNull private final ZonedDateTime startTime;
    @NotNull private final ZonedDateTime endTime;
    @Size(max = 1024) private final String description;
}
