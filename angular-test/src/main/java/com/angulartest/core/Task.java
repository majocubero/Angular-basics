package com.angulartest.core;

public class Task{

    private String id;
    private String taskName;
    private TaskType taskType;

    public Task(String id, String taskName, TaskType taskType){
        this.id = id;
        this.taskName = taskName;
        this.taskType = taskType;
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

    public TaskType getTaskType(){
        return taskType;
    }

    public void setTaskType(TaskType taskType){
        this.taskType = taskType;
    }

    @Override
    public String toString(){
        return id + "--" + taskName + "--" + taskType.toString() + "\n";
    }
}
