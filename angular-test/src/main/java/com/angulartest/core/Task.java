package com.angulartest.core;

public class Task{

    private String id;
    private String taskName;
    private TaskStatus taskStatus;

    public Task(String id, String taskName, TaskStatus taskStatus){
        this.id = id;
        this.taskName = taskName;
        this.taskStatus = taskStatus;
    }

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getTaskName(){
        return taskName;
    }

    public void setTaskName(String taskName){
        this.taskName = taskName;
    }

    public TaskStatus getTaskStatus(){
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus){
        this.taskStatus = taskStatus;
    }

    @Override
    public String toString(){
        return id + "--" + taskName + "--" + taskStatus.toString() + "\n";
    }
}
