package com.demo.chronosapi;

import com.demo.chronosapi.config.AuthConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({ AuthConfig.class })
public class ChronosApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChronosApiApplication.class, args);
    }
}
