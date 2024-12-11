import { HeroBanner } from './heroBanner.js';
 
export const App = () => { 
    return React.createElement(
        'div',
        null,
        React.createElement(HeroBanner),
    );
};

