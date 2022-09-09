import React from 'react'
import {Route, Routes, useRoutes} from "react-router-dom";
import {TodolistList} from "../../features/TodolistList/todolistList";
import {Login} from "../../features/Login/Login";


export const RoutesBlock = (props: { demo?: boolean }) => {
    const routing = useRoutes([
        {path: '/', element: <TodolistList demo={props.demo}/>},
        {path: '/login', element: <Login/> }
]);
    return <>{routing}</>;
    // return (
    //     <>
    //         <Routes>
    //             <Route path={'/'} element={<TodolistList demo={props.demo}/>}/>
    //             <Route path={'/login'} element={<Login/>}/>
    //         </Routes>
    //     </>
    // )
}
