# Build the application
FROM gradle:7.5.0-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build -x test --no-daemon

# Run the application
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

