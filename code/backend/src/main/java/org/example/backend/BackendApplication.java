package org.example.backend;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Objects;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) throws IOException {
        String path = Objects.requireNonNull(BackendApplication.class.getClassLoader().getResource("serviceAccountKey.json")).getPath();
        FileInputStream serviceAccount = new FileInputStream(path);
        FirebaseOptions options = FirebaseOptions.builder()
                //.setCredentials(GoogleCredentials.getApplicationDefault())
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setProjectId("timegenie-5bc98")
                .build();

        FirebaseApp.initializeApp(options);

        SpringApplication.run(BackendApplication.class, args);
    }

}
