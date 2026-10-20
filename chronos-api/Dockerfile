ARG SPRING_PROFILES_ACTIVE

FROM gradle:jdk17-alpine as builder
USER root
WORKDIR /builder
ADD . /builder
RUN gradle build --stacktrace

FROM openjdk:17-alpine
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}
WORKDIR /app
EXPOSE 8080
COPY --from=builder /builder/build/libs/chronos-api-*.jar ./app.jar
ENTRYPOINT java -jar app.jar