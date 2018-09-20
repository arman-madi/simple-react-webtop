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

                    <Shortcut key='sh_mycomputer' name='My Computer' title='My Computer'
                        icon="./images/icon-96-mycomputer.png"
                        link='mycompute-dialog'
                    />

                    <Window key='window_2' title='Title' attributes={{style:{top:'300px', left:'300px'}}}><h1>Hello World</h1></Window>
                    <Window key='window_3' title='My Computer' attributes={{style:{top:'200px', left:'200px'}}}><h2>Directory Structure</h2></Window>
                    <Window key='window_4' title='System Preferences' attributes={{style:{top:'100px', left:'100px'}}}><h3>Control Panel</h3></Window>
                </Desktop>
                <Taskbar>
                    <Shortcut />
                </Taskbar>
            </div>
        );
    }
}

export default Webtop;