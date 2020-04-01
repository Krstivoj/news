const initialState = {
    articles: []
};

function rootReducer(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case 'LOAD_ARTICLES': {
            return Object.assign({}, state, {articles: initialState.articles.concat(action.payload)});
        }
        default: return state;
    }
}
export default rootReducer;