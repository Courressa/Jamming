import React, {useState} from "react";

function Tracklist(props) {
  return (
    <div>
      <h2>{props.songObject.name}</h2>
      <h3>{props.songObject.artist}</h3>
      {props.children}
    </div>
  );
};

export {Tracklist};