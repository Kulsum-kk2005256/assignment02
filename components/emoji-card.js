import {
    IconButton,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState, useEffect } from 'react';

  export default function EmojiCard({ emoji, handleClick, status }) {
    const [isActive, setIsActive] = useState(false);

   
    const handleClickCard = () => {
        setIsActive(current => !current);
        handleClick(emoji,isActive);
      };

    return (
      <>
      {
        (status==="clicked") ? <Card sx={{ maxWidth: 100, maxHeight: 100} } style={{
          backgroundColor: 'gray',
          color: 'white',
        }}
        onClick={handleClickCard}>
      <CardContent>
          <Typography
          sx={{ fontSize: 45 } }
          style={{
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          color="text.secondary"
          gutterBottom
          >
          {emoji.em.emoji}
          </Typography>
      </CardContent>
  </Card> 
  : 
    <Card sx={{ maxWidth: 100, maxHeight: 100} } style={{
        backgroundColor: isActive ? 'gray' : '',
        color: isActive ? 'white' : '',
      }}
      onClick={handleClickCard}>
    <CardContent>
        <Typography
        sx={{ fontSize: 45 } }
        style={{
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
        color="text.secondary"
        gutterBottom
        >
        {emoji.em.emoji}
        </Typography>
    </CardContent>
</Card>
      }


      </>
    )
  
  

  }