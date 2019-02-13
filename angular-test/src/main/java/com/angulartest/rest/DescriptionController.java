package com.angulartest.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DescriptionController{

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getTasks(){
        List<String> tasks = new ArrayList<>();
        tasks.add("generate project");
        tasks.add("generate modules");
        tasks.add("generate components");
        tasks.add("generate routing");
        tasks.add("generate services");

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}
