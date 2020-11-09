import React,{Component} from 'react';
import '../styles/board.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import {getCurrentUser} from '../services/auth.service';
import app from '../helper/firebase/Config';
import closeIcon from '../assets/icons/close-icon.svg';
import deleteIcon from '../assets/icons/delete-64.png';
import Toaster from '../components/Toaster';

const auth = app.auth();
const db = app.firestore();
class Board extends Component {
   constructor(props){
       super(props);
    //    this.getCurrentUser = this.getCurrentUser.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    //    this.getCurrentUser();
    //   alert(auth.currentUser.uid);
      
    }

    state = {
        tasks: [
            // {name:"Learn Angular",category:"wip", bgcolor: "yellow"},
            // {name:"React", category:"wip", bgcolor:"pink"},
            // {name:"Vue", category:"complete", bgcolor:"skyblue"},
            // {name:"Vanilla", category:"inprogress", bgcolor:"skyblue"},
            // {name:"Jquery", category:"inprogress", bgcolor:"skyblue"}
          ],

          isLoggedIn: false
    }

    componentDidMount(){
    
        this.getTasks(); 
    }

    onTriggerAddTask(){
        document.getElementById('addTaskWrapper').style.display = 'block';
    }

    onCloseAddTask(){
        document.getElementById('addTaskWrapper').style.display = 'none';
    }
    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
      
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
               db.collection('tasks').doc(task._id).update({
                   category: task.category
               })
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

//    async getCurrentUser(){
//         return  await auth.currentUser.uid;
//     }

    handleSubmit(e){
        e.preventDefault();
        let task = document.getElementById('task').value;
        this.addTask(task);
    }

    async addTask(task){
      Toaster('success','Creating a new task');
      db.collection('tasks').add({
          name: task,
          category: 'wip',
          user: await auth.currentUser.uid
        }).then(()=> {
            // alert("Task added");
            this.componentDidMount();
        })
        .catch(e => {
            alert("erro");
            console.log("Error: "+e);
        })
    }

   async getTasks(){
       let Tasks = []
    //    console.log(`${await auth.currentUser.uid}`)
       await  db.collection('tasks').where("user", "==", `${await localStorage.getItem('userId')}`).get().then(tasks => {
       this.state.tasks = [];
       tasks.forEach(task => {
              Tasks.push(  {
                _id: task.id,
            name: task.data().name,
            category: task.data().category,
            user: task.data().users
        })
            })
        })
        .catch(e => {
            console.log("error occured "+e)
        })
        console.log(Tasks)
        this.setState({
            ...this.state,
            tasks:[...this.state.tasks,...Tasks]
        });
    }

    deleteTask(id){
     Toaster('success','Deleting Task');

       db.collection('tasks').doc(id).delete().then(() => {
           this.getTasks();
       })
       .catch(e => {
           Toaster("error","An error occured");
       })
    }
    render() {
        var tasks = {
            wip: [],
            complete: [],
            inprogress: []
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable shadow"
                    
                    
                >
                    {t.name}
                    <img src={deleteIcon} onClick={()=>this.deleteTask(t._id)} className="deleteIcon" alt="delete icon"/>
                </div>
            );
        });

        return (
            <div className="container-drag">
             <Header email={localStorage.getItem('userEmail')}/>
              <div className="container-header">
               <button className="addTask" onClick={this.onTriggerAddTask}>Add Task</button>
               <div className="newTask-form shadow" id="addTaskWrapper">
                 
                   <form onSubmit={this.handleSubmit}>
                       <span><img src={closeIcon} alt="close icon" onClick={this.onCloseAddTask}/></span>
                       <input type="text" placeholder="Task name" id="task"/>
                       <button>Save</button>
                   </form>
               </div>
                     
             </div>  
             <div className="subContainer">
               <div className="wip card-item-container"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header shadow">TODO</span>
                    {tasks.wip}
                </div>

                <div className="droppable card-item-container" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "inprogress")}>
                     <span className="task-header shadow">INPROGRESS</span>
                     {tasks.inprogress}
                </div>

                <div className="droppable card-item-container" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header shadow">DONE</span>
                     {tasks.complete}
                </div>

             </div>
            <Footer page={"Home"} />
             
            </div>
        );
    }
}
 
export default Board;