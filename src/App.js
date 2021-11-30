import './App.css';
import React,{useState} from "react";

function App() {

  const [initial,setInitial]=useState(true);

  const [search,setSearch]=useState("");
  const [definition,setDefinition]=useState("");
  const [word,setWord]=useState("unknown");
  const [phon,setPhon]=useState("unknown");
  const [pos,setPos]=useState("p.o.s");
  const [origin,setOrigin]=useState("unknown");
  const [syn1,setSyn1]=useState("");
  const [syn2,setSyn2]=useState("");
  const [syn3,setSyn3]=useState("");
  const [syn4,setSyn4]=useState("");

  const [ant1,setant1]=useState("");
  const [ant2,setant2]=useState("");
  const [ant3,setant3]=useState("");
  const [ant4,setant4]=useState("");


  const [example,setExample]=useState("");


  const [originClass,setOriginClass]=useState("result_container1")
  const [synClass,setSynClass]=useState("result_container2");
  const [antClass,setAntClass]=useState("result_container3");
  const [exampleClass,setExampleClass]=useState("result_container4");
  const [optionClass,setOptionClass]=useState("options_container");
  const [loading,setLoading]=useState(false);




  const originHandle=()=>{
    setOriginClass("result_container1 open");
    setSynClass("result_container2");
    setExampleClass("result_container4");
    setAntClass("result_container3");
  }

  const synHandle=()=>{
    setOriginClass("result_container1");
    setExampleClass("result_container4");
    setAntClass("result_container3");
    setSynClass("result_container2 open");
  }

  const meaningHandle=()=>{
    setSynClass("result_container2");
    setExampleClass("result_container4");
    setAntClass("result_container3");
    setOriginClass("result_container1");
  }



  const antHandle=()=>{
    setAntClass("result_container3 open")
    setSynClass("result_container2");
    setOriginClass("result_container1");
    setExampleClass("result_container4");
  }

  const exampleHandle=()=>{
    setExampleClass("result_container4 open");
    setSynClass("result_container2");
    setOriginClass("result_container1");
    setAntClass("result_container3");
  }



  const handleText=(e)=>{
    setSearch(e.target.value);
    setInitial(true);
    setOptionClass("options_container")
  }



  const handleSearch=async()=>{



      try{
        setInitial(false);
        setLoading(true);
        const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;
        const res=await fetch(url);
        const responseJson=await res.json();
        setDefinition(responseJson[0].meanings[0].definitions[0].definition);
        setWord(responseJson[0].word);
        setPhon(responseJson[0].phonetic);
        setOrigin(responseJson[0].origin);
        setSyn1(responseJson[0].meanings[0].definitions[0].synonyms[0]);
        setSyn2(responseJson[0].meanings[0].definitions[0].synonyms[1]);
        setSyn3(responseJson[0].meanings[0].definitions[0].synonyms[2]);
        setSyn4(responseJson[0].meanings[0].definitions[0].synonyms[3]);


        setant1(responseJson[0].meanings[0].definitions[0].antonyms[0]);
        setant2(responseJson[0].meanings[0].definitions[0].antonyms[1]);
        setant3(responseJson[0].meanings[0].definitions[0].antonyms[2]);
        setant4(responseJson[0].meanings[0].definitions[0].antonyms[3]);

        setExample(responseJson[0].meanings[0].definitions[0].example);

        setPos(responseJson[0].meanings[0].partOfSpeech);

        setLoading(false); 
        setOptionClass("options_container options");



      }catch(error){
        console.log(error);
      }
  }

  return (
    <div className="App">
    <div className="heading">Dixnary</div>
    <div className="container">
    <div className="input_search">
      <input type="text" placeholder="Type the word here..." onChange={handleText} />
      <button id="search" onClick={handleSearch}>Search</button>
    </div>

{initial?<h3 className="welcome">Welcome to Our Dictionary</h3>:loading?<h2 className="load">loading...</h2>:(
  <>
  <div className="outer_container">
<div className="result_container">
      <span>{pos} : {word} / {phon} /</span> <div className="def_main">{definition}</div>
</div>

<div className={originClass}>
      <span>origin : </span> <div className="def_main">{origin}</div>
</div>


<div className={synClass}>
      <span>synonyms : </span> <div className="def_main">{syn1} , {syn2} , {syn3} , {syn4} etc.</div>
</div>


<div className={antClass}>
      <span>antonyms : </span> <div className="def_main">{ant1} , {ant2} , {ant3} , {ant4} etc.</div>
</div>



<div className={exampleClass}>
      <span>example : </span> <div className="def_main">{example}</div>
</div>




</div>

  </>
)}

<div className={optionClass}>
  <ul>
  <li onClick={meaningHandle}>meaning</li>
  <li onClick={originHandle}>origin</li>
   <li onClick={synHandle}>synonyms</li>
    <li onClick={antHandle}>antonyms</li>
    <li onClick={exampleHandle}>examples</li>
  </ul>
</div>

  
    </div>
    </div>
  );
}

export default App;
