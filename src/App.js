import './App.css';
import {connect} from "react-redux";
import {useState} from "react";

function App(props) {

    const {cards, columns} = props
    const [inputNewTask, setInputNewTask] = useState([])
    const [inputUpdateTask, setInputUpdateTask] = useState([])

    const addNewCard = () => {
        setInputNewTask([])
    }

    return (
        <div className="App">
            <input placeholder='add new card' value={inputNewTask} onChange={e => setInputNewTask(e.target.value)}/>
            <button onClick={addNewCard}>add new task</button>
            {columns.map(column =>
                <div key={column}>
                    <h2> {column}</h2>
                    {cards.filter(card => column === card.statusTitle).map(card =>
                        <div key={card.id}>
                            <button disabled={card.statusTitle === 'todo'}
                                    onClick={() => props.moveUpAndDownCard(card.id, -1)}>up
                            </button>
                            <h5>{card.title}</h5>
                            <button disabled={card.statusTitle === 'done'}
                                    onClick={() => props.moveUpAndDownCard(card.id, 1)}>down
                            </button>
                            <button onClick={() => props.deleteCard(card.id)}>delete</button>
                            {card.done ?
                                <button onClick={() => props.openUpdate(card.id)}>update</button>
                                :
                                <div>
                                    <input value={inputUpdateTask} onChange={e => setInputUpdateTask(e.target.value)}/>
                                    <button onClick={() => props.saveCard(card.id, inputUpdateTask)}>save</button>
                                    <button onClick={() => props.openUpdate(card.id)}>cancel</button>
                                </div>
                            }
                            <button onClick={() => props.doneCard(card.id)}>done</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    cards: state.cards,
    columns: state.columns
})

const mapDispatchToProps = (dispatch) => ({
    addCard: (inputNewTask) => dispatch({type: 'ADD_CARD', payload: inputNewTask}),
    deleteCard: (cardId) => dispatch({type: 'DELETE_CARD', payload: cardId}),
    moveUpAndDownCard: (cardId, valueCard) => dispatch({type: 'MOVE_CARD', payload: {cardId, valueCard}}),
    doneCard: (cardId) => dispatch({type: 'DONE_CARD', payload: cardId}),
    openUpdate: (cardId) => dispatch({type: 'OPEN_UPDATE', payload: cardId}),
    saveCard: (cardId,inputUpdateTask) => dispatch ({type: 'SAVE_CARD', payload: { cardId, inputUpdateTask}})

})


export default connect(mapStateToProps, mapDispatchToProps)(App);
