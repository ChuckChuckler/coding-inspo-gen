import React, { useState } from 'react'
import axios from 'axios'

import './App.css'

let globalComplexity = "beginner";
let globalCommitment = "1 hour";

let unformattedPrevs = "";
let prevIdeas = "";

function App() {
  
  const [topicGlobal, changeTopic] = useState("");
  const [idea1Global, changeIdea1] = useState("");
  const [idea2Global, changeIdea2] = useState("");
  const [idea3Global, changeIdea3] = useState("");
  const [opacityGlobal, changeOpacity] = useState(0);
  const [buttonOpacityGlobal, changeButtonOpacity] = useState(0);

  function gen(){
    unformattedPrevs = unformattedPrevs.split("!SPLIT_PROMPT!");
    let formattedPrevs = [];
    for(let i = 0; i < unformattedPrevs.length; i++){
      let topicIdea = unformattedPrevs[i].split("!SPLIT_TOPIC!");
      formattedPrevs.push(topicIdea.toString().split("!SPLIT_EX!").join(", "));
    }

    let body = {
      complexity: globalComplexity,
      commitment: globalCommitment,
      used: formattedPrevs
    };

    prevIdeas = "";

    axios.post("/gen", body)
    .then((response)=>{
      let receivedData = response.data.msg;
      let topic = receivedData.split("!SPLIT_TOPIC!");
      let ideas = topic[1];
      changeTopic(topic[0])
      ideas = ideas.split("!SPLIT_EX!");
      changeIdea1(ideas[0]);
      changeIdea2(ideas[1]);
      changeIdea3(ideas[2]);
      changeOpacity(100);
      changeButtonOpacity(100);

      prevIdeas += `${ideas[0]}, ${ideas[1]}, ${ideas[2]}, `;
      
      unformattedPrevs += receivedData + "!SPLIT_PROMPT!";
      
    });
  }

  function refresh(){
    let body = {
      complexity: globalComplexity,
      commitment: globalCommitment,
      topic: topicGlobal,
      ideas: prevIdeas
    }

    axios.post("/refresh", body)
    .then((response)=>{
      let receivedData = response.data.msg;
      let ideas = receivedData.split("!SPLIT_EX!");
      changeIdea1(ideas[0]);
      changeIdea2(ideas[1]);
      changeIdea3(ideas[2]);

      prevIdeas += `${ideas[0]}, ${ideas[1]}, ${ideas[2]}, `;
    })
  }

  return (
    <>
      <h1 className="text-white text-5xl/30 text-center mt-0">Coding Inspo</h1>
      <h3 className="text-center text-2xl">Unsure of what to make for your next project? Click the generate button for some inspiration!</h3>
      <br></br>
      <hr className="w-[50%] m-auto border-solid border-white"></hr>
      <br></br>
      <div className='flex justify-around h-[65vh] relative'>
        <Settings/>
        <div className='bg-[#080808] w-[46%] border-2 border-[#b7a7d1] box-border p-5'>
          <Suggestions topic={topicGlobal} idea1={idea1Global} idea2={idea2Global} idea3={idea3Global} opacity={opacityGlobal}/>
          <div className='w-[46%] flex justify-between absolute bottom-5 box-border pr-15'>
            <button className='bg-[#ddcafa] text-center w-[30%] text-[#2d233d] hover:bg-[#837596]' onClick={gen}>generate</button>
            <button className={`bg-[#ddcafa] text-center w-[30%] text-[#2d233d] hover:bg-[#837596] opacity-${buttonOpacityGlobal}`} onClick={refresh}>refresh suggestions</button>
          </div>
        </div>
      </div>
    </>
  )
}

function Suggestions( {topic, idea1, idea2, idea3, opacity} ) {
  const [opacity2Global, changeOpacity2] = useState(0);
  const [helpGlobal, changeHelp] = useState([]);

  function help(txt){
    let body = {
      project:txt,
      complexity: globalComplexity,
      commitment: globalCommitment
    }
    axios.post("/help", body)
    .then((response)=>{
      changeHelp(response.data.projectHelp.split("!NEWLINE!"));
      changeOpacity2(100);
    });
  }

  return (
    <div className='h-[90%] overflow-auto'>
      <div className={`opacity-${opacity}`}>
        <h2 className='text-4xl underline'>Topic: {topic}</h2>
        <br/>
        <h3 className='text-3xl pb-3'>Suggestions:</h3>
        <ol className='list-decimal list-inside'>
          <li className='text-xl hover:underline' onClick={function(){help(idea1)}}>{idea1}</li>
          <li className='text-xl hover:underline' onClick={function(){help(idea2)}}>{idea2}</li>
          <li className='text-xl hover:underline' onClick={function(){help(idea3)}}>{idea3}</li>
        </ol>
      </div>
      <br/>
      <div className= {`opacity-${opacity2Global}`}>
        <h3 className='text-xl'>{topic}: Getting Started</h3>
        <br/>
        <p className='text-white'>
          {helpGlobal.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  )
}

function Settings(){
  const [complexity, setComplexity] = useState("beginner");
  const [commitment, setCommitment] = useState("1 hour");

  let changeComplexity = (e) =>{
    setComplexity(e.target.value);
    globalComplexity = e.target.value;
  }

  let changeCommitment = (e) =>{
    setCommitment(e.target.value);
    globalCommitment = e.target.value;
  }

  return(
    <div className='bg-[#080808] w-[46%] border-2 border-[#b7a7d1]'>
      <h2 className='text-4xl text-center underline mt-5'>Settings</h2>
      <br/>
      <div className='w-[80%] m-auto box-border p-5 border-3 border-[#8f7bb0] border-double'>
        <h3 className='text-2xl underline'>Complexity</h3>
        <input type='radio' name='complexity' value='beginner' checked={complexity=="beginner"} onChange={changeComplexity}/>
        <label>Beginner</label>
        <br/>
        <input type='radio' name='complexity' value='intermediate' checked={complexity=="intermediate"} onChange={changeComplexity}/>
        <label>Intermediate</label>
        <br/>
        <input type='radio' name='complexity' value='advanced' checked={complexity=="advanced"} onChange={changeComplexity}/>
        <label>Advanced</label>
        <br/>
        <h3 className='text-2xl underline'>Commitment</h3>
        <input type='radio' name='commitment' value='1 hour' checked={commitment=="1 hour"} onChange={changeCommitment}/>
        <label>~1 Hour</label>
        <br/>
        <input type='radio' name='commitment' value='1 day' checked={commitment=="1 day"} onChange={changeCommitment}/>
        <label>~1 Day</label>
        <br/>
        <input type='radio' name='commitment' value='1 week' checked={commitment=="1 week"} onChange={changeCommitment}/>
        <label>More than 1 Day</label>
        <br/>
        <br/>
        <br/>
      </div>
    </div>
  )
}

export default App
