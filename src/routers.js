import LeaveNote from './components/LeaveNote.vue'
import Approval from './components/children/Approval.vue'
import Login from './components/children/Login.vue'

const routers = [
    {
        path:'/',
        component:LeaveNote,
        children:[
            {
                path:'/',
                component:Approval
            }
        ]
    },
    {
        path:'/LeaveNote',
        name:'LeaveNote',
        component:LeaveNote,
        children:[
            {
                path:'/',
                name:'Approval',
                component:Approval
            },
            {
                path:'Login',
                name:'Login',
                component:Login
            }
        ]
    }
   
]
export default routers