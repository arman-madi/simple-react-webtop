import React, { Component } from 'react';
import './Webtop.css';
import Desktop from './Desktop';
import Shortcut from './Shortcut';
import Window from './Window';
import Taskbar from './Taskbar';

class Webtop extends Component {
    render() {
        return (
            <div className="webtop">
                <Desktop>
                    <Shortcut key='shortcut_1'/>
                    <Window key='window_2' title='hello'><h1>Hello World</h1></Window>
                </Desktop>
                <Taskbar>
                        <Shortcut />
                </Taskbar>
            </div>
        );
    }
}

export default Webtop;