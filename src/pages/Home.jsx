import React, {Component, lazy, Suspense} from 'react';
import {Link} from 'react-router-dom'
import ReactTooltip from 'react-tooltip';
import '../styles/home.css';
import imageURL from '../assets/images/home-img.svg';
// import Footer from '../components/Footer';
const Footer = lazy(() => import('../components/Footer'));
class Home extends Component {
  
    triggerTypeWritter(){
        var TxtRotate = function(el, toRotate, period) {
          this.toRotate = toRotate;
          this.el = el;
          this.loopNum = 0;
          this.period = parseInt(period, 5) || 1000;
          this.txt = '';
          this.tick();
          this.isDeleting = false;
        };
        
        TxtRotate.prototype.tick = function() {
          var i = this.loopNum % this.toRotate.length;
          var fullTxt = this.toRotate[i];
        
          if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }
        
          this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
        
          var that = this;
          var delta = 300 - Math.random() * 100;
        
          if (this.isDeleting) { delta /= 2; }
        
          if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
          } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
          }
        
          setTimeout(function() {
            that.tick();
          }, delta);
        };
        
        window.onload = function() {
          var elements = document.getElementsByClassName('txt-rotate');
          for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
          }
          // INJECT CSS
          var css = document.createElement("style");
          css.type = "text/css";
          css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
          document.body.appendChild(css);
        };
      }

    render() { 
        this.triggerTypeWritter();
        return (  
        
            <div className="containerFluid">
            <div className="container">
                <div className="leftWrapper">
                    <h1>TO-DO Application  
                        <small>
                            <span
                            class="txt-rotate"
                            data-period="1000"
                            data-rotate='["Schedule your tasks.","Happy working.","Target Success."]'>
                            </span>
                        </small>
                        </h1>
                  
                 
                   <Link to='/login'> <button data-tip="You need to login to access you board!"> Get Started</button></Link> 
                   <ReactTooltip place="left" type="info" effect="solid"/>
                </div>
                <div className="rightWrapper">
                   <img src={imageURL} alt="image"/>
                </div>
           
            </div>
            <Suspense fallback={<div>loading ....</div>}>
            <Footer></Footer>
            </Suspense>
            </div>
        );
    }
}
 
export default Home;