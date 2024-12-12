import { HeroBanner } from './heroBanner.js';
import {Teaser} from "./teaser.js";

 
export const App = () => { 
    return React.createElement(
        'div',
        null,
        // React.createElement(HeroBanner),
        React.createElement(Teaser)
    );
};

