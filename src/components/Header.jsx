import React,{Component} from 'react';

class Header extends Component {
   
    render() { 
        return (
            <div className="header">
                <ul>
                    {user ? (
                    <>
                    <li>list 1</li>
                    <li>list 2</li>
                    </>
                    ) : (
                    <>
                    <li>list 3</li>
                    <li>list 4</li>
                    <li>list 5</li>
                    </>
                    )}
                    
                   
                </ul>
            </div>
         );
    }
}
 
export default Header;