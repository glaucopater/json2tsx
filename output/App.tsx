import React from "react";
import { App as propTypes } from "./types.d";
import Titles from "./Titles";
import Aliases from "./Aliases";
import Allegiances from "./Allegiances";
import Books from "./Books";
import PovBooks from "./PovBooks";
import TvSeries from "./TvSeries";
import PlayedBy from "./PlayedBy";

const App = (props: propTypes) => {
  return (
    <div>
      <div>url:{props.url}</div>
      <div>name:{props.name}</div>
      <div>gender:{props.gender}</div>
      <div>culture:{props.culture}</div>
      <div>born:{props.born}</div>
      <div>died:{props.died}</div>
      <Titles {...props.titles} />
      <Aliases {...props.aliases} />
      <div>father:{props.father}</div>
      <div>mother:{props.mother}</div>
      <div>spouse:{props.spouse}</div>
      <Allegiances {...props.allegiances} />
      <Books {...props.books} />
      <PovBooks {...props.povBooks} />
      <TvSeries {...props.tvSeries} />
      <PlayedBy {...props.playedBy} />
    </div>
  );
};
export default App;
