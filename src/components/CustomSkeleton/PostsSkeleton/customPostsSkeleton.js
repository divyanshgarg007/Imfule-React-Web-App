import React from 'react'
import {Box, Card, Typography, Divider, List, ListItem, ListItemText, ListItemAvatar, Skeleton} from '@mui/material'
import MyDiv from './customPostsSkeleton.style'

function PostSkeletons(props) {
  const {loading = false} = props
  return (
    <MyDiv>
      <Card className="skeleton_card adjust_card_skeleton">
        <Box className="card_skeleton">
          <Typography gutterBottom variant="h5" component="div" className="card_title_skeleton">
            {loading ? (
              <Skeleton animation="wave" height={10} width="30%" sx={{marginBottom: '7px'}} />
            ) : ''}
          </Typography>
          <Typography variant="body2" className="card_subtitle_skeleton">
            {loading ? (
              <Skeleton animation="wave" height={10} width="50%" />
            ) : ''}
          </Typography>
          <Divider />
        </Box>
        <Box className="card_list_skeleton">
          <List sx={{width: '100%', padding: '0'}}>
            {[...Array(props?.length || 5).keys()].map((index) => (
              <ListItem key={index} alignItems="center" >
                <ListItemAvatar>
                  {loading ? (
                    <Skeleton animation="wave" variant="rectangular" width={40} height={40} sx={{borderRadius: '5px'}} />
                  ) : ''}
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="h5">
                    {loading ? (
                      <Skeleton animation="wave" height={10} width="86%" sx={{marginBottom: '7px'}} />
                    ) : ''}
                  </Typography>
                  <Typography variant="body2">
                    {loading ? (
                      <Skeleton animation="wave" height={10} width="25%" />
                    ) : ''}
                  </Typography>
                </ListItemText>
                {loading ? (
                  <Skeleton animation="wave" variant="circular" width={35} height={35} />
                ) : ''}
              </ListItem>
            ))}
          </List>
        </Box>
      </Card>
    </MyDiv>
  )
}

export default function CustomPostsSkeleton() {
  return (
    <div>
      <PostSkeletons loading />
    </div>
  )
}
