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

import com.angulartest.core.Task;
import com.angulartest.core.TaskStatus;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DescriptionController{

    private static final Path PATH = Paths.get("./src/main/resources/todo-list");

    /**
     * Endpoint that retrieves all the _todo tasks of the file.
     *
     * @return 200 ok, a JSON with a list of all the tasks.
     */
    @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Task>> getTasks(){
        return new ResponseEntity<>(this.obtainTasks(), HttpStatus.OK);
    }

    /**
     * Endpoint that adds a task to the file.
     *
     * @param task the task name to add.
     * @return 200 ok, a JSON with a list of all the tasks.
     */
    @PostMapping(path = "/add",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addTask(@RequestParam String task){
        List<Task> currentTasks = this.obtainTasks();
        int nextId;
        if (currentTasks.size() > 0){
            nextId = ((Integer.parseInt(currentTasks.get(currentTasks.size() - 1).getId())) + 1);
        }
        else {
            nextId = 0;
        }
        String id = String.valueOf(nextId);
        Task task1 = new Task(id, task.trim(), TaskStatus.PENDING);

        try{
            Files.write(PATH, task1.toString().getBytes(), StandardOpenOption.APPEND);
        }catch(IOException e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(this.obtainTasks(), HttpStatus.OK);
    }

    /**
     * Endpoint that deletes a task from the file.
     *
     * @param task the task id to delete.
     * @return 200 ok, a JSON with a list of all the tasks.
     */
    @DeleteMapping(path = "/delete",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Task>> deleteTask(@RequestParam String task){
        List<String> out;
        try{
            out = Files.lines(PATH)
                    .filter(line -> {
                        String[] tasksString = line.split("--");
                        return !tasksString[0].equalsIgnoreCase(task);
                    }).collect(Collectors.toList());
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
    private List<Task> obtainTasks(){
        List<Task> tasks = new ArrayList<>();

        try{
            Stream<String> stream = Files.lines(PATH);
            stream.map(line -> {
                String[] taskString = line.split("--");
                Task task = new Task(taskString[0], taskString[1], TaskStatus.valueOf(taskString[2].toUpperCase()));
                tasks.add(task);
                return task;
            }).forEach(System.out::println);
        }catch(IOException e){
            e.printStackTrace();
        }
        return tasks;
    }
}
