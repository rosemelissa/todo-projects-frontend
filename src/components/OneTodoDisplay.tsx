import ITodo from "../Interfaces/ITodo";

interface OneTodoDisplayProps {
    todo: ITodo;
}

function OneTodoDisplay({todo}: OneTodoDisplayProps): JSX.Element {
    //GET todo from database
    return(
        <div className="one-todo-display">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
        </div>
    );
}

export default OneTodoDisplay;