const InitialState = () => {
    return {
        type : 'DEFAULT_TASK',
        payload : {}
    }
}

export const appReducer = (state = InitialState, action) => {
    switch (action.type) {
        default :
            return state
    }
}