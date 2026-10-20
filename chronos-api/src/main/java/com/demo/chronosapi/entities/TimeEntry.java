package com.demo.chronosapi.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "time_entries")
public class TimeEntry {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private boolean deleted;

    @Column(nullable = false)
    private ZonedDateTime createdAt;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User createdBy;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User user;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Location location;

    @Column(nullable = false)
    private ZonedDateTime startTime;

    @Column(nullable = false)
    private ZonedDateTime endTime;

    @Column(nullable = true, length = 1024)
    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TimeEntryStatus status;

    @Column(nullable = true, length = 1024)
    private String rejectionReason;

    public static TimeEntry create(
        final User createdBy,
        final User user,
        final Location location,
        final ZonedDateTime startTime,
        final ZonedDateTime endTime,
        final String description
    ) {
        return TimeEntry.builder()
            .deleted(false)
            .createdAt(ZonedDateTime.now())
            .createdBy(createdBy)
            .user(user)
            .location(location)
            .startTime(startTime)
            .endTime(endTime)
            .description(description)
            .status(TimeEntryStatus.DRAFT)
            .rejectionReason(null)
            .build();
    }

    public static TimeEntry createPending(
        final User createdBy,
        final User user,
        final Location location,
        final ZonedDateTime startTime,
        final ZonedDateTime endTime,
        final String description
    ) {
        return TimeEntry.builder()
            .deleted(false)
            .createdAt(ZonedDateTime.now())
            .createdBy(createdBy)
            .user(user)
            .location(location)
            .startTime(startTime)
            .endTime(endTime)
            .description(description)
            .status(TimeEntryStatus.PENDING)
            .rejectionReason(null)
            .build();
    }

    public void update(
        final User user,
        final Location location,
        final ZonedDateTime startTime,
        final ZonedDateTime endTime,
        final String description
    ) {
        this.user = user;
        this.location = location;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
    }

    public void move(final ZonedDateTime startTime, final ZonedDateTime endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public void delete() {
        this.deleted = true;
    }

    public void submit() {
        this.status = TimeEntryStatus.PENDING;
    }

    public void approve() {
        this.status = TimeEntryStatus.APPROVED;
    }

    public void reject(final String rejectionReason) {
        this.status = TimeEntryStatus.REJECTED;
        this.rejectionReason = rejectionReason;
    }
}
