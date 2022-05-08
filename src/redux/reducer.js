const initialState = {
    columns: ['todo', 'progress', 'review', 'done'],
    cards: [
        {id: Math.random(), title: 'Dnipro', done: true, statusTitle: 'todo'},
        {id: Math.random(), title: 'Warszawa', done: true, statusTitle: 'progress'},
        {id: Math.random(), title: 'Liverpool', done: true, statusTitle: 'review'},
        {id: Math.random(), title: 'Vancouver', done: true, statusTitle: 'done'},
    ]
}
const cards = (state = initialState, action) => {
    switch (action.type) {
        // case 'SET_COLUMNS':
        //     return {...state, columns: action.payload}
        // case 'SET_CARDS':
        //     return {...state, cards: action.payload}
        case 'ADD_CARD':
            return {
                ...state,
                cards: [...state.cards, {id: Math.random(), title: action.payload, done: true, statusTitle: 'todo'}]
            }
        case 'DELETE_CARD':
            return {
                ...state, cards: state.cards.filter(el => el.id !== action.payload)
            }
        case 'MOVE_CARD':
            return {
                ...state, cards: state.cards.map(el => el.id === action.payload.cardId ?
                    {
                        ...el,
                        statusTitle: state.columns[state.columns.indexOf(el.statusTitle) + action.payload.valueCard]
                    } : el)
            }
        case 'OPEN_UPDATE':
            return {
                ...state, cards: state.cards.map(el => el.id === action.payload ? {
                    ...el,
                    done: !el.done} : el)
            }
        case 'SAVE_CARD':
            return {
                ...state, cards: state.cards.map(el => el.id === action.payload.cardId ?
                    {...el, done: !el.done, title: action.payload.inputUpdateTask } : el)
            }

        default:
            return state

    }
}
export default cards