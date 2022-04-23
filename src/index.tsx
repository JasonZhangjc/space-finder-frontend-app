import ReactDOM from 'react-dom';
import './index.css';
// The following line imports 'App' as a component
import {App} from './components/App';

// The following annotation can also ignore some files

/* istanbul ignore file */
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
