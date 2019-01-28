import {NavBar} from './components/nav_bar.js'
import {SideBar} from './components/side-bar.js'

export default Vue.component('Layout', {
    template: `
        <div id="layout">
            <div>
                <side-bar></side-bar>       
            </div>
            <div>
                <nav-bar></nav-bar>
            </div>
        <router-view/>
        </div>
    `
})

