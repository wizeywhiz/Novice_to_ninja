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
        }
    ]
};

const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    response: document.querySelector('#response'),
    form: document.forms[0],
    render(target,content,attributes) {
    for(const key in attributes) {
    target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
    }, 

    setup(){
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        // this.hide(this.start);
        this.render(this.score,controller.score);
        this.render(this.result,'');
        this.render(this.info,'');
        this.resetForm();
        },

    resetForm(){
        this.response.answer.value = '';
        this.response.answer.focus();
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
        if(this.questions.length > 0) {
            shuffle(this.questions);

        this.question = this.questions.pop();        
        this.currentState = this.question.state;
        this.currentCapital = this.question.capital;
    const question = `What is the capital of ${this.currentState}?`;
    view.render(view.question,question);
    view.response.addEventListener('submit',(e)=>{this.check(e)});
        }
    },
    check(event){
        console.log('check(event) invoked');
        event.preventDefault();
        const response = view.response.answer.value;
        const answer = this.currentCapital;
        if(response === answer){
        view.render(view.result,'Correct!',{'class':'correct'});
        this.score++;
        view.render(view.score,this.score);
        } else {
        view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        }
        view.resetForm();
        this.ask();
        },
    gameOver(){
        console.log('gameOver() invoked');
    view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view.teardown();

    }
}

controller.start(Model.question);






        