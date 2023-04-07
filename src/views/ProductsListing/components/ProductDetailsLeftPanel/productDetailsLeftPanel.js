import React, {useState} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import {useSelector} from 'react-redux'
import {getToken} from '../../../../utilities/authUtils'
import {SocialMediaSelect, ProductGallery, RichTextEditor, PostTitleTextBox} from '..'
import {AddImage} from '../ProductGallery/components'
import MyDiv from './productDetailsLeftPanel.style'

export default function ProductDetailsLeftPanel(props) {
  const userState = useSelector((state) => state.userState)
  const {addPostData, getPosition} = useSelector((state) => state.postState)
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
            <Box mb={3}>
              <Typography
                variant="h6"
                color="text.primary"
                fontSize="0.9rem"
                className="text-font"
              >
                {props.productData.product_name}
              </Typography>
            </Box>
            <SocialMediaSelect
              socialMediaData={props.socialMediaData}
              productData={props.productData}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <PostTitleTextBox />
      </Box>
      <Box mt={3}>
        <Grid container className="product_grid" columnSpacing={{xs: 2, sm: 1, md: 1}}>
          <Grid item xs={12} md={12}>
            <Box>
              <RichTextEditor
                productData={props.productData}
                setDescriptionPost={props.setDescriptionPost}
                handleDescription={props.handleDescription}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <AddImage
          images={props?.productData?.images}
          selected={addPostData[getPosition]?.image}
          imfuleCloudData={props.imfuleCloudData}
        />
      </Box>
      <ProductGallery
        images={props?.productData?.images}
        selected={addPostData[getPosition]?.image}
        imfuleCloudData={props.imfuleCloudData}
      />
    </MyDiv>
  )
}
