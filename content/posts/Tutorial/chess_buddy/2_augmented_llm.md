+++
date = '2025-07-23T22:34:25+01:00'
draft = true
title = '2_augmented_llm'
+++
ht into creating our agent, it is important to address th
Though we could go rige augmented llm. 
We can augment our llm by providing it with tools, and data sources it will need to perform the tasks we ask of it. Thankfully, langchain already provides abstractions for us to this. In this section, we will create the tools that we need for chess buddy and test them.

Create a folder named `class_tools` and for each file place.

```
# DrawTool.py
from .chess_tool import ChessTool
from typing import Type
import random
from pydantic import BaseModel
from .my_setup import my_board

    
class DrawTool(ChessTool):
    name:str = "DrawTool"
    description:str = """
    Chooses whether to accept or reject a draw offer. If accepted, the board is reset.
    
    Returns:
        str: A message confirming acceptance or rejection of draw offer.
        
    Example call:
        DrawTool()    
    """
    args_schema:Type[BaseModel] | None = None
    
    def _run(self)->str:
        choice = random.randint(0,100)
        if choice > 50:
            self.board.reset()
            return "Draw accepted and board reset"
        else:
            return "Draw rejected"


if __name__=="__main__":
    examples = [
        "Would you love to make this a truce?",
        "Let's keep playing, I want to win",
        "Let's make it a draw, shall we?",
        "Let's stop playing, I resign",
        "I want a draw.",
],
    
    for example in examples:
        result = DrawTool(board=my_board).invoke(example)
        with open("test_log.txt", "a", encoding="utf-8") as f:
            base_message = f"\nExample: {example} \n"
            f.write(base_message)
            f.write(str(result))
```

```
# ResignTool
class ResignTool(ChessTool):
    name:str = "ResignTool"
    description:str = """
    This function resets the chess board if a user explicitly decides to resign.
    
    Returns:
        str: A string confirming that the game has been restarted
        
    Example call:
        ResignTool()
    """
    args_schema:Type[BaseModel] | None = None
        
    def _run(self)->str:
        self.board.reset()
        return "User has resigned and the game has been restarted"
    

if __name__=="__main__":
    examples = ["I forfeit this match, and I am angry with you.",
               "I give up boss.",
               "Hmm,I wonder what I need to play next",
               "Let's keep playing, I'm loving this.",
               "I resign.",
]
    
    for example in examples:
        result = ResignTool(board=my_board).invoke(example)
        with open("test_log.txt", "a", encoding="utf-8") as f:
            base_message = f"\nExample: {example} \n"
            f.write(base_message)
            f.write(str(result))
```
        