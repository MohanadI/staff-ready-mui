import { Routes, Route } from "react-router-dom";
import { routes } from "./configs/Constants";

export default function DocumentControlRoutes(){
    return (
        <Routes>
            {routes.map((item)=> {
                return (
                    <Route key={item.title} path={item.path} element={item.element} />
                )
            })}
        </Routes>
    )
};