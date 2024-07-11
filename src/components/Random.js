import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from './Spinner.js'

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY

function Random(){
    
  
    
    const [ gif , setGif] = useState ("");
    const [loading, setLoading] = useState(false);

    
    async function fetchData(){
        setLoading(true);
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
    try{const {data} = await axios.get(url);
    const imageSource = data.data.images.downsized_large.url;
    setGif(imageSource);
    console.log(imageSource)
    }
    
    catch{setLoading(true)}
     setLoading(false);
    
    }
 
    useEffect(() => {
        fetchData();
    }, []) 


    function clickHandler() {
       fetchData();
    };
    
    return(
        <div className="w-1/2 bg-green-600 rounded-lg border border-black
        flex flex-col items-center gap-y-5 mt-[15px]">
         
         <h1 className="text-2xl uppercase underline font-bold mt-[10px]">A Random Gif</h1>


         {
            loading ? (<Spinner/>) : (<img src={gif} width="450" />)
         }

         <button onClick={clickHandler}
         className=" w-10/12 bg-slate-300 py-2 text-lg rounded-lg uppercase mb-[15px]"
         >
            Generate
         </button>
        </div>
    )
}

export default Random;