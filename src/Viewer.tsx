import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewerCore from './ViewerCore';
import ViewerProps from './ViewerProps';

export default React.forwardRef((props: ViewerProps, ref) => {
  const defaultContainer = React.useRef(document.createElement('div'));
  const [ container, setContainer ] = React.useState(props.container);
  const [ init, setInit ] = React.useState(false);

  React.useEffect(() => {
    document.body.appendChild(defaultContainer.current);
  }, []);

  React.useEffect(() => {
    if (props.visible && !init) {
      setInit(true);
    }
  }, [props.visible, init]);

  React.useEffect(() => {
    if (props.container) {
      setContainer(props.container);
    } else {
      setContainer(defaultContainer.current);
    }
  }, [props.container]);

  if (!init) {
    return null;
  }
  return ReactDOM.createPortal((
    <ViewerCore
      {...props}
    />
  ), container);
});
