import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm',
    component: AddItemForm
}
const callBack = action("Button 'add' is pressed inside the form")
export const TestAddItemForm = () => {
    return(
        <AddItemForm addItem={callBack}name={'1'}/>
    )
}
export const TestAddItemFormDisabled = () => {
    return(
        <AddItemForm disabled={true} addItem={callBack}name={'1'}/>
    )
}