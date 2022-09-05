import React from "react";

import {action} from "@storybook/addon-actions";

import {EditableItem} from "./EditableItem";

export default {
    title: 'EditableItem',
    component: EditableItem
}
const changeTitleCallBack = action("Title changed")
export const TestAddItemForm = () => {
    return(
        <>
            <EditableItem title={"newTitle"} changeTitleTask={changeTitleCallBack}

            />

        </>

    )
}