import React, {useEffect, useState} from 'react'
import {Grid, Box, Typography, MenuItem, FormControl, Select, ListItemText, Checkbox} from '@mui/material'
import {connect, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {styled} from '@mui/styles'
import {compose} from 'recompose'
import {CustomButton, CustomCardSkeleton, CustomSearchBar, MessageBox, Loader, AlertDialog} from '../../components'
import {ActionCreators} from '../../redux/actions'
import {getToken} from '../../utilities/authUtils'
import * as routesNames from '../../constants/routes'
import ProductDetailsDialog from './components/ProductDetailsDialog'
import {ProductCard} from './components'
import MyDiv from './productsListing.style'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const Menu = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}
const CustomMenuItem = styled(MenuItem)(({theme}) => ({
  '&.MuiMenuItem-root': {
    padding: '0',
    textTransform: 'capitalize',
  },
  '&.MuiMenuItem-root .MuiListItemText-root .MuiListItemText-primary': {
    color: '#000',
    fontWeight: '500',
    fontSize: '0.9rem',
  },
}))

const CustomMenuItems = styled(MenuItem)(({theme}) => ({
  '&.MuiMenuItem-root': {
    padding: '8px 15px',
    textTransform: 'capitalize',
    color: '#000',
    fontWeight: '500',
    fontSize: '0.9rem',
  },
}))

const ProductsListing = (props) => {
  const productState = useSelector((state) => state.productState)
  const userState = useSelector((state) => state.userState)
  const [categoriesNames, setCategoriesNames] = useState(productState?.filter?.categories.length > 0 ? productState?.filter?.categories : ['all'])
  const [sortingNames, setSortingNames] = useState(productState?.filter?.order || 'desc')
  const [searchData, setSearchData] = useState('')
  const [isFiltered, setFiltered] = useState(false)
  const [productData, setProductData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [pages, setPages] = useState(1)
  const [loadMore, setLoadMore] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useHistory()
  const [alertLabel, setAlertLabel] = useState(
    {
      title: '',
      subtitle: '',
      button: '',
      close: '',
    },
  )
  const filteredProductList = () => {
    let categoriesNamesData = categoriesNames.includes('all') ? [] : categoriesNames
    let data = {
      selectedCategory: categoriesNamesData.toString() || '',
      selectedSorting: 'id',
      order: sortingNames || '',
      per_page: '18',
      page: pages,
      shop_id: getToken('selectedStore'),
      title: searchData,
    }
    props.actions.getProductsAction(data, getToken('companyID'), categoriesNamesData)
  }
  useEffect(() => {
    if (isFiltered || (isFiltered && !productState?.products?.isLoaded) || typeof productState?.products?.isLoaded === 'undefined' || !productState?.products?.isLoaded) {
      filteredProductList()
    }
  }, [categoriesNames, sortingNames, pages, searchData])
  useEffect(() => {
    if (!productState?.categories?.data?.payload) {
      props.actions.getCategoriesAction(getToken('selectedStore'), getToken('companyID'))
    }
  }, [])

  useEffect(() => {
    if (productState?.products?.data?.payload && loadMore) {
      setProductData(productData?.concat(productState.products.data.payload.data))
      setLoadMore(false)
    } else if (productState?.products?.data?.payload && !loadMore) {
      setProductData(productState.products.data.payload.data)
    }
  }, [productState?.products])

  useEffect(() => {
    if (productState?.categories?.data?.payload) {
      setCategoriesData(productState.categories.data.payload)
    } else {
      setCategoriesData([])
    }
  }, [productState?.categories])

  useEffect(() => {
    return () => {
      props.actions.cleanUpStateProductList()
    }
  }, [])
  const handleCategoryChange = (event) => {
    if (categoriesNames?.includes('all')) {
      let index = event?.target?.value.indexOf('all')
      if (index !== -1) {
        event?.target?.value.splice(index, 1)
      }
      setCategoriesNames(event.target.value)
    } else
    if (event?.target?.value?.includes('all')) {
      setCategoriesNames(['all'])
    } else {
      let index = event?.target?.value.indexOf('all')
      if (index !== -1) {
        event?.target?.value.splice(index, 1)
      }
      setCategoriesNames(event.target.value)
      if ((event.target.value).length === 0) {
        setCategoriesNames(['all'])
      }
    }
    setFiltered(true)
    setProductData([])
    setPages(1)
  }

  const handleSortingChange = (event) => {
    setSortingNames(event.target.value)
    setFiltered(true)
    setProductData([])
    setPages(1)
  }
  const handleSearchChange = (event) => {
    setTimeout(() => {
      setSearchData(event.target.value)
      setFiltered(true)
      setProductData([])
      setPages(1)
    }, 1000)
  }
  const getCategoriesName = (selected) => {
    let arr = []
    categoriesData.map((item) => {
      if (selected.includes(item.id)) {
        arr.push(item.category_name)
      }
    })
    if (selected.includes('all')) {
      arr.push('All')
    }
    return arr.join(', ')
  }
  const handleLoadMore = () => {
    const newPages = pages + 1
    setPages(newPages)
    setFiltered(true)
    setLoadMore(true)
  }
  //product details dialog
  const postState = useSelector((state) => state.postState)
  const [openDetails, setOpenDetails] = useState(false)
  const [productDataDetails, setProductDetailsData] = useState([])
  useEffect(() => {
    if (productState.productDetails?.data?.payload && productDataDetails.length === 0) {
      setProductDetailsData(productState.productDetails.data.payload)
      if (productState.productDetails?.data?.payload?.images) {
        props.actions.onChangeSocialMediaAction(postState?.addPostData?.map(
          (shareholder, sidx) => {
            if (postState?.getPosition !== sidx) {return shareholder} else {
              return {...shareholder, image: [].concat(shareholder.image, productState.productDetails?.data?.payload?.images[0].image_url),
                title: productState.productDetails?.data?.payload?.product_name,
              }
            }
          }))
      }
    }
  }, [productState.productDetails])
  const handleProductDetails = (productID) => {
    if (userState?.connectedSocialMediaWithShops?.data?.payload?.length > 0) {
      setOpenDetails(true)
      props.actions.getProductDetailsAction(productID)
    } else {
      const confirmProduct = {
        title: '',
        subtitle: 'You have no active network do you want to add?',
        button: 'Confirm',
        close: 'Cancel',
      }
      setAlertLabel(confirmProduct)
      setOpen(true)
    }
  }
  const handleClose = () => {
    setOpenDetails(false)
    setProductDetailsData([])
    props.actions.cleanUpStateProductDetails()
  }
  const handleSubmit = () => {
    setOpen(false)
    router.push(routesNames.NETWORK)

  }
  const handleDeleteClose = () => {
    setAlertLabel('')
    setOpen(false)
  }
  return (
    <MyDiv>
      <AlertDialog
        openDialog={open}
        handleDeleteClose={handleDeleteClose}
        handleClose={handleDeleteClose}
        alertLabel={alertLabel}
        handleSubmit={handleSubmit}
      />
      <ProductDetailsDialog
        open={openDetails}
        onClose={handleClose}
        productData={productDataDetails}
        productDetailType="Add"
        scheduleData={props.scheduleData}
        productListDialogClose={props.productListDialogClose}
      />
      {productState?.products?.loading && loadMore &&
        <Loader />
      }
      <Box className={props.className && props.className !== 'undefined' ? '' : 'product_listing_box'}>
        <Grid container rowSpacing={1} className="product-box">
          <Grid item xs={12} md={6} sm={4}>
            <Typography gutterBottom variant="h5" component="div" className="product-heading text-font">
              {props.heading && props.heading !== 'undefined' ? '' : 'My Products'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sm={8}>
            <Grid container xs={12} sm={12} md={12} columnSpacing={{xs: 1, sm: 2, md: 3}} className="product_listing_cal">
              <Grid item xs={12} sm={4} md={4}>
                <Box>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    fontSize="0.9rem"
                    className="text-font"
                  >
                    Search Products
                  </Typography>
                  <CustomSearchBar
                    onChange={handleSearchChange}
                    value={searchData}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
                <Box>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    fontSize="0.9rem"
                    className="text-font"
                  >
                    Sort By Category
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="categories"
                      multiple
                      value={categoriesNames}
                      onChange={handleCategoryChange}
                      renderValue={(selected) => getCategoriesName(selected)}
                      MenuProps={Menu}
                    >
                      {/* <CustomMenuItem key="all" value="all">
                        <Checkbox checked={categoriesNames.indexOf('all') > -1} />
                        <ListItemText primary="All" />
                      </CustomMenuItem> */}
                      {categoriesData.map((name) => (
                        <CustomMenuItem key={name.id} value={name.id}>
                          <Checkbox checked={categoriesNames.indexOf(name.id) > -1} />
                          <ListItemText primary={name.category_name} />
                        </CustomMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
                <Box>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    fontSize="0.9rem"
                    className="text-font"
                  >
                    Sort By
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="sorting"
                      value={sortingNames}
                      onChange={handleSortingChange}
                    >
                      <CustomMenuItems key={1} value="desc">Latest</CustomMenuItems>
                      <CustomMenuItems key={2} value="asc">Oldest</CustomMenuItems>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {productState?.products?.loading && !loadMore &&
      <div>
        <CustomCardSkeleton />
      </div>
      }

      {productData && productData.length > 0 &&
      <div>
        <ProductCard
          productData={productData}
          handleProductDetails={handleProductDetails}
        />
        {(productState?.products?.data?.payload?.pagination?.current_page !== productState?.products?.data?.payload?.pagination?.total_pages) &&
        <Box mt={3} className="load_btn">
          <CustomButton fieldlabel="Load more" variant="contained" onClick={handleLoadMore} className="text-font action_button" />
        </Box>
        }
      </div>
      }

      {(productState.products?.data?.payload?.length === 0 || productState.products?.error?.payload) &&
      <Box>
        <MessageBox messageTitle="No product found!" disableBtn={false} />
      </Box>
      }
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(ProductsListing)
