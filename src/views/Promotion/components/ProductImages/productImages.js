import React from 'react'
import {ImageList, ImageListItem, Checkbox, Divider, Typography, Box} from '@mui/material'
import {useSelector} from 'react-redux'
import {CustomButton, MessageBox} from '../../../../components'
import MyDiv from './productImages.style'

export default function ProductImages(props) {
  const label = {inputProps: {'aria-label': 'Checkbox demo'}}
  const productState = useSelector((state) => state.productState)

  return (
    <MyDiv>
      {(!productState?.products?.loading) && props?.productData.length > 0 &&
      <Box>
        {props?.productData && props.productData.map((data, index) => (
          <><Typography variant="h6"
            color="text.primary"
            className="text-font product-title"
          >
            {data.product_name}
          </Typography><ImageList className="products_imageLists" key={index}>
            {data && data.images && data.images.map((item, index1) => (
              <ImageListItem key={index1}>
                <img
                  src={`${item?.image_url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item?.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  className="post_images"
                />
                <Checkbox {...label} checked={props.getCheckedStatus(item)} onChange={props.handleCheck(item)}
                  className="image_checkList"
                />
              </ImageListItem>
            ))}
          </ImageList><Divider /></>
        ))}
        {(productState?.products?.data?.payload?.pagination?.current_page !== productState?.products?.data?.payload?.pagination?.total_pages) &&
        <Box mt={3} className="load_btn">
          <CustomButton fieldlabel="Load more" variant="contained" onClick={() => props.handleLoadMore()} className="text-font action_button" />
        </Box>
        }
      </Box>
      }

      {(!productState?.products?.loading) && props?.productData.length === 0 &&
      <>
        <MessageBox messageTitle="No Data Found !!" disableBtn={false} />
      </>
      }
    </MyDiv>
  )
}
