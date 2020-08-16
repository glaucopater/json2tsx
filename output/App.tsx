import React from "react";
import { App as propTypes } from "./types.d";
import MyTestComponent from "./MyTestComponent";

const App = (props: propTypes) => {
  return (
    <div>
      <MyTestComponent {...props.MyTestComponent} />
    </div>
  );
};
export default App;
