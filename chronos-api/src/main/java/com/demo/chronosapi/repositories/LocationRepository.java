package com.demo.chronosapi.repositories;

import com.demo.chronosapi.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long>, JpaSpecificationExecutor<Location> {

    List<Location> findAllByDeletedFalse();
}
