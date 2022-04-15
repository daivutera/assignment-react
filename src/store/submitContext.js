/* eslint-disable comma-dangle */
import React from 'react';

const SubmitContext = React.createContext({
  NewObject: {},
  NewObjectAdd: {},
});
SubmitContext.displayName = 'SubmitContext';

export default SubmitContext;
