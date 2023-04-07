import React, {useState} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import {useSelector} from 'react-redux'
import {getToken} from '../../../../utilities/authUtils'
import {PromotionSocialMediaSelect, PromotionGallery, PromotionRichTextEditor, PromotionPostTitleTextBox} from '..'
import MyDiv from './promotionDetailsLeftPanel.style'

export default function PromotionDetailsLeftPanel(props) {
  const userState = useSelector((state) => state.userState)
  const {addPromotionData, getPromotionPosition} = useSelector((state) => state.promotionState)
  const storeName = useState(userState?.getStore?.data?.payload.filter((store) => store.id === getToken('selectedStore'))[0]?.shop_name)
  return (
    <MyDiv>
      <Box>
        <Grid container className="product_grid" columnSpacing={{xs: 2, sm: 2, md: 2}}>
          <Grid item xs={12} md={12}>
            <Box mb={3} sx={{position: 'relative'}}>
              <Typography
                variant="h6"
                color="text.primary"
                className="text-font store_name"
              >
                {storeName}
              </Typography>
            </Box>
            <PromotionSocialMediaSelect
              image={props.image}
              socialMediaData={props?.socialMediaData}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mb={3}>
        <PromotionPostTitleTextBox />
      </Box>
      <Box mt={3}>
        <Grid container className="product_grid" columnSpacing={{xs: 2, sm: 1, md: 1}}>
          <Grid item xs={12} md={12}>
            <Box>
              <PromotionRichTextEditor
                productData={props?.productData}
                setDescriptionPost={props?.setDescriptionPost}
                handleDescription={props?.handleDescription}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <PromotionGallery
        selected={addPromotionData[getPromotionPosition]?.image}
        image={props.image}
      />
    </MyDiv>
  )
}
