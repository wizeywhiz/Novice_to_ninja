alert("Thanks for Mentoring me on this Course");

function random(a,b=1) {
    // if only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
    [a,b] = [b,a];
    }
    return Math.floor((b-a+1) * Math.random()) + a;
    }

function shuffle(array) {
    for (let i = array.length; i; i--) {
    let j = random(i)-1;
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}
        
    



const Model = {
    question : [
        {state:"Abia", 
         capital: "Umuahia"
        },
        {state:"Adamawa", 
         capital: "Yola"
        },
        {state:"Akwa Ibom", 
         capital: "Uyo"
        },
        {state:"Anambra", 
         capital: "Awka"
        },
        {state:"Bauchi", 
         capital: "Bauchi"
        },
        {state:"Benue", 
         capital: "Markurdi"
        },
        {state:"Borno", 
         capital: "Maiduguri"
        },
        {state:"Cross River", 
         capital: "Calabar"
        }
    ]
};

const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    start: document.getElementById('start'),
    answer: document.getElementById('answer'),
    response: document.querySelector('#response'),
    
    render(target,content,attributes) {
    for(const key in attributes) {
    target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
    }, 

    setup(){
        this.show(this.question);        
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score,controller.score);
        this.render(this.result,'');
        this.render(this.info,'');
        // this.render(view.response.submit, "Submit answer", {'disabled':'false'});
        
        },

    buttons(array){
        return array.map(value =>`<button>${value}</button>`).join('');
        },
            

    show(viewComponent){
        viewComponent.style.display = 'block';
    }, 

    hide(viewComponent){
        viewComponent.style.display = 'none';
    },

    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
        }
        
            
        

};
    
    
const controller = {
    score: 0,
    questions:[],
    question: null,
    currentState:"",
    currentCapital:"", 
    start(quiz){
        
        console.log('start() invoked');
        this.score = 0;
        this.questions = [...quiz];
        view.setup();
        this.ask();
        },
        
    
    ask(){
        console.log('ask() invoked');
        if(this.questions.length > 2) {
            
            shuffle(this.questions);
            
            
        
        this.question = this.questions.pop();        
        this.currentState = this.question.state;
        this.currentCapital = this.question.capital;
        const options = [this.questions[0].capital, this.questions[1].capital, this.question.capital];
        shuffle(options);
        const question = `What is the capital of ${this.currentState}?`;
        view.render(view.question,question);
        view.render(view.response,view.buttons(options));  
        

        
    
    
        } else { this.gameOver();}
    },
    check(event){        
        console.log('check(event) invoked');        
        const response = event.target.textContent;
        console.log(response)
        const answer = this.currentCapital;
        if(response.trim().toUpperCase() === answer.toUpperCase()){
        view.render(view.result,'Correct!',{'class':'correct'});
        this.score++;
        view.render(view.score,this.score);
        } else {
        view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        }
               
        this.ask();
        },
    gameOver(){
        console.log('gameOver() invoked');
    view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view.teardown();

    }
}

// controller.start(Model.question);
// view.render(view.response.submit, "Submit answer", {'disabled':'true'});
view.start.addEventListener('click',()=>{controller.start(Model.question)});
view.response.addEventListener('click', (event) => controller.check(event), false);






        