package com.demo.chronosapi.repositories;

import com.demo.chronosapi.entities.TimeEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TimeEntryRepository extends JpaRepository<TimeEntry, Long>, JpaSpecificationExecutor<TimeEntry> {

    List<TimeEntry> findAllByDeletedFalse();
}
