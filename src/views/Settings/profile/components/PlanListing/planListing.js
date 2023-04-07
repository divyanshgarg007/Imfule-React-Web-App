import React from 'react'
import {Box, Card, Typography, List, ListItem, ListItemText, Divider} from '@mui/material'
import {CustomButton} from '../../../../../components'
import MyDiv from './planListing.style'

export default function PlanListing(props) {
  return (
    <MyDiv>
      <Box mt={3}>
        <Card className="planCard">
          <Typography gutterBottom variant="h5" component="div" className="text-font planTitle">
            {props?.subscriptionList?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" className="text-font planPrice">
            {`$${props?.subscriptionList?.price}/ month`}
          </Typography>
          <Box mt={2}>
            {props?.subscriptionList?.page_list.map((data, index) => {
              return (<List sx={{width: '100%', padding: '0'}} key={index}>
                <ListItem className="planItems">
                  <ListItemText className="listInfo" >
                    <Typography variant="h5" className="attributeName">
                      {data?.attribute}
                    </Typography>
                    <Typography variant="body2" className="attributeName">
                      {data.value}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>)
            })
            }
            <Divider />
            <CustomButton fieldlabel="Purchase Plan" variant="contained" className="text-font action_button purchaseBtn" />
          </Box>
        </Card>
      </Box>
    </MyDiv>
  )
}
