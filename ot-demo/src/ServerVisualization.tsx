import React, { FunctionComponent } from "react";
import { replaceInvisibleCharacters, useSharedStyles } from "./sharedStyles";
import clsx from "clsx";
import StorageIcon from "@material-ui/icons/Storage";
import { createUseStyles } from "react-jss";
import { ServerVisualizationState } from "./types/visualizationState";

export const useServerStyles = createUseStyles({
  server: {
    width: "940px",
    height: "130px",
  },
  document: {
    whiteSpace: "pre",
    backgroundColor: "white",
  },
});

interface ServerVisualizationProps {
  state: ServerVisualizationState;
}

export const ServerVisualization: FunctionComponent<ServerVisualizationProps> = (props) => {
  const sharedClasses = useSharedStyles();
  const classes = useServerStyles();

  return (
    <div className={clsx(sharedClasses.site, classes.server)}>
      <h2>
        <StorageIcon />
        Central Server
      </h2>
      <p>
        Document:{" "}
        <span className={classes.document}>{replaceInvisibleCharacters(props.state.text)}</span>
      </p>
    </div>
  );
};