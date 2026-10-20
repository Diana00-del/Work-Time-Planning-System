package com.demo.chronosapi.requests.timeentry;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RejectTimeEntryRequest {
    @NotNull @NotEmpty @Size(min = 3, max = 1024)
    private String rejectionReason;
}
