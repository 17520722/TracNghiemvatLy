import React from "react";
import "../css/loading.css"
import { LinearProgress } from "@material-ui/core";

export default function Loading () {
    return (
        <div className="loading-text">
          <div>
            <p>Chờ xíu nha</p>
            <LinearProgress className="green-color" />
          </div>
        </div>
    );
}