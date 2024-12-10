
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store'; // Import the store
import App from './App';
import './index.css'; // Import your styles

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}> {/* Wrap the app with Redux Provider */}
    <App />
  </Provider>
);
