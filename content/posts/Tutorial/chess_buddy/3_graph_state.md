+++
date = '2025-07-24T22:39:55+01:00'
draft = true
title = '3_graph_state'
+++

In our previous part, I discussed***. 
Now we can create the graph of our app. This is the most important part of the project*. 
Langgraph provides a low-level architecure through the graph API to build agents and workflows. This API consists of three components:

- State: This is a schema that defines all the necessary data that will need to be tracked throughout our workflow/agent. For example: if we are to define a schema for a research agent. It will act as a single source of truth for our application.

```
class Schema(MessagesState):
    board: Board
    tool_list: list[BaseTool]
    llm: Any
    played: bool = False
```

In the above, we defined two schemas. One to handle our input/output data, and the other to handle the data passed between the internal nodes.
- `board` represents a chess notation which is valid.
- `tool_list` represents extra data that is necessary for a good final response.
- `llm`:
- `played`

One more unseen part of the schema is `messages` which is included through the `MessagesState` class.

Though we can generally store all our data in one schema. Langgraph also enables us to seperate internal data that is passed between nodes from the overall input and output data. We won't be needing this in our case.
 
Then we move on to the graph which mainly constitutes two types of components:
- Nodes: These are simply functions that perform specific operations on the state and return an updated state.

- Edges: These are functions that directs the flow of sequences of nodes based on pre-defined conditions()
They act as routers between internal nodes.

Thanks to this low-level architecture, we can visualize our workflow/agent without having to write the main logic of our code yet.

```
# Node 1
def make_decision(state: Schema):
    # Calls LLM with tools
    # Returns Messages
    # Sets the play state, return_message and player_notation depending on answer
    pass

# Node 2
def run_tool(state: Schema):
    # Takes player notation, and plays it
    # Takes answer from it and checks if computer answer is in it to
    # Calls play log updater with player and computer answer
    # Sets the display state
    pass


# Edge 1
def route_decision(state: Schema):
    # Checks why if the play is invalid, by checking if there are still legal moves in the list to see if the notaion was wrong
    # Checks the board state
    # returns reason depending on
    pass

# Node 3
def final_response(state: Schema):
    # Check board state and sees if there is still valid moves
    # If no, it checks the board state and sers the extra info
    pass

```

As you can see above, our graph consists of 3 nodes and 1 edges. 

Now, we can move to building our graph. Building a graph involves adding nodes and edges in the sequence that is intended to achieve our application's objectives. In the below

```
builder = StateGraph(Schema)
builder.add_node("make_decision", make_decision)
builder.add_node("run_tool", run_tool)
builder.add_node("final_response", final_response)

builder.add_edge(START, "make_decision")
builder.add_conditional_edges(
    "make_decision",
    route_decision,
    {"run_tool": "run_tool", END: END},
)
builder.add_edge("run_tool", "final_response")
builder.add_edge("final_response", END)
chess_graph = builder.compile()
```

Langgraph also provides a method that allows us to convert our graph into an object which can be visualized by the `Image` class of the`Ipython` module(you can install it using pip).

```
img_obj=Image(graph.get_graph().draw_mermaid_png())
if hasattr(img_obj, 'data'):
    with open('graph_image.png', 'wb') as f:
        f.write(img_obj.data)

```

You should see an image similar to the below saved in the same directory as you file.

![Diagram of the system](/images/saved_image.png)

Before we create our graph, we must have a clear understanding of how we expect data to flow through the agent/workflow and what processes transform the data between the input and output.