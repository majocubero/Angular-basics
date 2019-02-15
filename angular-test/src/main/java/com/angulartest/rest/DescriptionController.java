package com.angulartest.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class DescriptionController{

    private static final Path PATH = Paths.get("./src/main/resources/todo-list");

    /**
     * Endpoint that retrieves all the _todo tasks of the file.
     *
     * @return 200 ok, a JSON with a list of all the tasks.
     */
    @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getTasks(){
        return new ResponseEntity<>(this.obtainTasks(), HttpStatus.OK);
    }

    /**
     * Endpoint that adds a task to the file.
     *
     * @param task the task to add.
     * @return 200 ok, a JSON with a list of all the tasks.
     */
    @PostMapping(path = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> addTask(@RequestParam String task){
        task += "\n";
        try {
            Files.write(PATH, task.getBytes(), StandardOpenOption.APPEND);
        }catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(this.obtainTasks(), HttpStatus.OK);
    }

    /**
     * Endpoint that deletes a task from the file.
     *
     * @param task the task to delete.
     * @return 200 ok, a JSON with a list of all the tasks.
     */
    @DeleteMapping("/delete")
    public ResponseEntity<List<String>> deleteTask(@RequestParam String task){
        List<String> out;
        try{
            out = Files.lines(PATH)
                    .filter(line -> !line.equalsIgnoreCase(task))
                    .collect(Collectors.toList());
            Files.write(PATH, out, StandardOpenOption.WRITE, StandardOpenOption.TRUNCATE_EXISTING);
        }catch(IOException e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(this.obtainTasks(), HttpStatus.OK);
    }

    /**
     * Method that retrieves all the tasks from the file.
     *
     * @return a list of all the tasks.
     */
    private List<String> obtainTasks(){
        List<String> tasks = new ArrayList<>();

        try{
            Stream<String> stream = Files.lines(PATH);
            stream.peek(tasks::add).forEach(System.out::println);
        }catch (IOException e){
            e.printStackTrace();
        }
        return tasks;
    }
}
