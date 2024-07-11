import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from './Spinner.js'

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY

function Tag(){
    
  
    
    const [ gif , setGif] = useState ("");
    const [loading, setLoading] = useState(false);
    const [tag , setTag] = useState("");

    
    async function fetchData(){
        setLoading(true);
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag= ${tag}`;
    try{const {data} = await axios.get(url);
    const imageSource = data.data.images.downsized_large.url;
    setGif(imageSource);}
    catch{setLoading(true)}
     
     setLoading(false);
    }
 
    useEffect(() => {
        fetchData();
    }, []) 


    function clickHandler() {
       fetchData();
    };

    function changeHandler(event) {
        setTag(event.target.value)
    }
    
    return(
        <div className="w-1/2 bg-blue-500 rounded-lg border border-black
        flex flex-col items-center gap-y-5 mt-[15px]">
         
         <h1 className="text-2xl uppercase underline font-bold mt-[10px]">Random {tag} Gif</h1>


         {
            loading ? (<Spinner/>) : (<img src={gif} width="450" />)
         }
         
         <input value={tag} className=" w-10/12 bg-slate-300 py-2 text-lg rounded-lg mb-[5px] text-center" onChange={changeHandler}/>


         <button onClick={clickHandler}
         className=" w-10/12 bg-slate-300 py-2 text-lg rounded-lg uppercase mb-[15px]"
         >
            Generate
         </button>
        </div>
    )
}

export default Tag;