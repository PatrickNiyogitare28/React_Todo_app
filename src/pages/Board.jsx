import React,{Component} from 'react';
import '../styles/board.css';
import Footer from '../components/Footer';
class Board extends Component {
   
    state = {
        tasks: [
            {name:"Learn Angular",category:"wip", bgcolor: "yellow"},
            {name:"React", category:"wip", bgcolor:"pink"},
            {name:"Vue", category:"complete", bgcolor:"skyblue"},
            {name:"Vanilla", category:"inprogress", bgcolor:"skyblue"},
            {name:"Jquery", category:"inprogress", bgcolor:"skyblue"}
          ]
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
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
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
                </div>
            );
        });

        return (
            <div className="container-drag">
              <div className="container-header">
               <button className="addTask">Add Task</button>
                     
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
            <Footer></Footer>
             
            </div>
        );
    }
}
 
export default Board;