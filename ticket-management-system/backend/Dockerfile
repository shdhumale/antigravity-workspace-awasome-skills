FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace/app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Build all the dependencies in preparation to go offline. 
# This is a separate step so the dependencies will be cached unless the pom.xml file has changed.
RUN ./mvnw dependency:go-offline

# Copy the project source
COPY src src

# Package the application
RUN ./mvnw package -DskipTests

# Stage 2: Minimal docker image with command to run the app
FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp
COPY --from=build /workspace/app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
