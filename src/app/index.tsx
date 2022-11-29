import {slice} from "./app-reducer"
import {asyncActions} from "./app-reducer"
import * as appSelectors from "./selectors"

//reducer
const appReducer = slice.reducer
//actions
const appActions = {
    ...slice.actions,
    ...asyncActions

}
//export
export {
    appSelectors,
    appActions,
    appReducer
}