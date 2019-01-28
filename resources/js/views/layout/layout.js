import {NavBar} from './components/nav_bar.js'
import {SideBar} from './components/side_bar.js'

export default Vue.component('Layout', {
    template: `
        <div id="layout">
            <div>
                <side-bar></side-bar>       
            </div>
            <div>
                <div id="nav-bar">
                    <nav-bar></nav-bar>
                </div>
                <div id="container">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    `
})

