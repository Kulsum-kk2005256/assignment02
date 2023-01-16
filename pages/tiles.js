// import useSWR from "swr";
import { Grid ,
    IconButton,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    TextField,
    Typography,
    Button
  } from "@mui/material";
import { useState, useEffect } from 'react';
import Alert from "@mui/material/Alert";
import EmojiCard from "../components/emoji-card";

export default function Tiles(){
    const [level, setLevel] = useState(1); 
    const [list, setList] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);
    var emoji = require('node-emoji');


    // useEffect(() => {
    // //    const num = level*2;
    // let tempList= [];
    //    for (let i = 0; i < level; i++) {
    //     let em=emoji.random();
    //     if(tempList.findIndex((e)=> e.em.key===em.key)){
    //       tempList.push({'em':em, 'status':'unclicked'});
    //       tempList.push({'em':em, 'status':'unclicked'});
    //     }

    //    }
    //    setList(tempList);

       

    // },[level]
    // )

    useEffect(() => {
        let currFromStorage = localStorage.getItem('tiles'); 
        if(currFromStorage!=null && currFromStorage!=[]){
           setList(JSON.parse(currFromStorage)) ;
        }else{
          let tempList= [];
          for (let i = 0; i < level; i++) {
           let em=emoji.random();
           if(tempList.findIndex((e)=> e.em.key===em.key)){
             tempList.push({'em':em, 'status':'unclicked'});
             tempList.push({'em':em, 'status':'unclicked'});
           }
   
          }
          setList(tempList);
        }
        let level = localStorage.getItem('level'); 
        if(level!=null){
           setLevel(JSON.parse(level)) ;
        }
    
      },[]);

    const handleClick = (emoji,isActive) => {
        setIsActive(current => !current);
        let tempList= [];
        let count=0;
        list.map((item)=>{
          if(!isActive){

            if(item.em.key==emoji.em.key && item.status=="unclicked" && count==0){
            tempList.push({'em':item.em, 'status':'clicked'});
            count++;
          } else{
            tempList.push(item);
          }
          }else{
              tempList.push({'em':item.em, 'status':'unclicked'});
              count++;
          }
          
         
        })
        setList(tempList);
      };


      useEffect(() => {
       
        const index=list.findIndex((item)=> item.status==="unclicked")
        if(index==-1){
          setButtonActive(current => !current);
          console.log(list);
          console.log(buttonActive)

        }
    
      },[isActive]);


      useEffect(() => {
        if(list.length>0){

           localStorage.setItem('tiles', JSON.stringify(list));
        }
       
    
      },[list]);

      // useEffect(() => {
      //   if(level.length>0){

      //      localStorage.setItem('level', JSON.stringify(level));
      //   }
       
    
      // },[level]);
      

      const handleButton = () => { 
        localStorage.setItem('level', JSON.stringify(level+1));
        setButtonActive(current => !current);
        setLevel((previous) => previous + 1);
        setList([]);
       }


    return(
        <>
        
     <Grid container spacing={0}>
        {list
        //   .sort((a, b) => (a > b ? 1 : -1))
          .map((emojiObj) => (
          
            <Grid key={emojiObj.em.key} item xs={6} sm={3}>
   {(emojiObj.status=="clicked")?
                    <EmojiCard emoji={emojiObj} handleClick={handleClick} status={emojiObj.status}/>
                    :
                    <EmojiCard emoji={emojiObj} handleClick={handleClick} />}

            </Grid>
          ))}
          {buttonActive ? <Button type='button' onClick={handleButton} >Go to Level {level+1}</Button>: null}
      </Grid>

      
        </>
    )
}