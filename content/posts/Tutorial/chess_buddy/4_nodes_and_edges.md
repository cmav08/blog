+++
draft = true
title = 'nodes and edges'
+++

Before we begin writing our node and edges logic, let us define some chess utilties that we will be needing. Define a file named `utils` and place the below functions inside.

```
def execute_play(notation: str, board:Board):
    uci = board.push_san(notation).uci()
    return f"Human Player Move \n SAN: {notation} \n UCI:{uci}"


def execute_computer_play(board: Board) :
    if board.legal_moves:
        move = random.choice(list(board.legal_moves))
        san_notation = board.san(move)
        board.push(move)
        uci_notation = move.uci()
        return f"Computer Play Move \n SAN: {san_notation} \n UCI:{uci_notation}"
    return None


def check_board_state(board: Board):
    if board.is_checkmate():
        board.reset()
        return "Checkmate: Game Over"
    elif board.is_stalemate():
        board.reset()
        return "Stalemate: Game Over"
    elif board.is_insufficient_material():
        board.reset()
        return "Draw: Insufficient Material"
    elif board.is_fifty_moves():
        board.reset()
        return "Draw: Fifty-move rule"
    elif board.is_repetition():
        board.reset()
        return "Draw: Threefold repetition"
    elif board.is_seventyfive_moves():
        return "Draw: Seventy-five move rule"


def check_valid_play(notation:str, board:Board):
    """
    Checks the validity of a chess SAN or UCI notation
    
    Args: A chess notation
    
    """
    try:
        move = board.parse_san(notation)
        if move in board.legal_moves:
            return True, None
        else:
            return False, "Move not found in legal moves"
    except InvalidMoveError:
        return False, "Move is an invalid move"
    except IllegalMoveError:
        return False, "Move is an illegal move"
    except AmbiguousMoveError:
        return False, "Move is an ambiguous move"
        
```