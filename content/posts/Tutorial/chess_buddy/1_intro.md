+++
date = "2025-07-23T21:59:22+01:00"
draft = true
title = "Intro"
tags = [ "AI", "AI Agent",]

+++

Langgraph has grown to one of the most important frameworks in the artificial Intelligence space. It's parent, langchain was initially created for developers to create applications which require augmentation of LLMs with various data sources.

Langgraph, however, has quickly become popular framework ifor it's low-level abstractions and it's versatility in creating applications involving workflows to AI agents.

In this tutorial series, I will be creating a chess chatbot similar to "Chess Master" on Google's gemini. I believe it is a great project that will allow us to address all various aspects of the framework, while still being a fun and interesting use case.

## Objectives

By the end of this tutorial, you should

- Understand Langgraph as a framework including it's various components i.e. state, nodes and edges
- Understand how to track and manipulate data across one's state using nodes.
- Understand the various structures for creating one's state.
Alright Let's begin

---

# Chess Buddy 

## Requirements

- `python>=3.8`
- `langchain`
- `langgraph`
- `python-chess`
- `streamlit`
- You will also need an LLM of your choice, in this tutorial, I am using the `gemini-2.5` but you can also use any langchain compatible model.

## Project Preview
In this project, we will learn the fundamentals of langgraph by building a chess-assistant system. The features are going to be;

- A feature for displaying the chess board after every sucessful move pair
- A feature for displaying the play logs after every successful move pair
- A chatbot interface that accepts natural language prompts and respond accordingly.
- A feature that allows you to play, resign, request a draw or request an explanation in natural langyage

## Understanding Langgraph

Langgraph is a framework that provides a low-level abstraction interface for creating agentic applications. It's provides a graph-like structure which consists of three main components

- State: This is responsible for tracking data across your graph.
- Nodes: These are functions that modify or update data across the state.
- Edges: These determine how nodes in your graph are connected.

Take for example, a customer service chatbot. With Langgraph, you can create a structure-like the below;

- State: You would track the 
- 
- 

Additionally, there are other features provided by the framework to make building frameworks easier and more efficient. This includes;

1. Memory: This allows you to persist the values of data in your state. (We will not be needing this)
2. Human in the Loop(HITL)