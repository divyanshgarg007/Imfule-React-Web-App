import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Box, Skeleton, TableContainer, Table, TableHead, TableBody, TableRow} from '@mui/material'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import {styled} from '@mui/material/styles'
import MyDiv from './customSchedulingSkeleton.style'

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#d9dfd2',
    color: '#000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#000',
  },
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fff',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#fff',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function ScheduledSkeletons(props) {
  const {loading = false} = props
  return (
    <MyDiv>
      <Box className="scheduled_box">
        <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 3, md: 3}}>
          <Grid item xs={12} sm={12} md={12}>
            {loading ? (
              <Skeleton animation="wave" height={30} width="10%" />
            ) : ''}
          </Grid>
        </Grid>
        <Box mt={2}>
          <TableContainer style={{borderRadius: '10px 10px 0 0'}}>
            <Table aria-label="collapsible table" style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left" sx={{width: '65%', borderBottom: 'none'}}>{loading ? (
                    <Skeleton animation="wave" height={10} width="10%" />
                  ) : ''}</StyledTableCell>
                  <StyledTableCell align="left" sx={{width: '15%', borderBottom: 'none'}}>{loading ? (
                    <Skeleton animation="wave" height={10} width="50%" />
                  ) : ''}</StyledTableCell>
                  <StyledTableCell align="center" sx={{width: '10%', borderBottom: 'none'}}>{loading ? (
                    <Skeleton animation="wave" height={10} sx={{margin: 'auto'}} width="80%" />
                  ) : ''}</StyledTableCell>
                  <StyledTableCell align="right" sx={{width: '10%', borderBottom: 'none'}} />
                  <StyledTableCell />
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {[...Array(props?.length || 12).keys()].map((index) => (
                  <StyledTableRow key={index}>
                    <StyledTableRow className="product-info-tab">
                      <StyledTableCell className="image_data" sx={{borderBottom: 'none'}}>{loading ? (
                        <Skeleton animation="wave" variant="rectangular" width={60} height={40} />
                      ) : ''}</StyledTableCell>
                      <StyledTableCell align="left" className="wrap_text_line" sx={{borderBottom: 'none'}}>{loading ? (
                        <Skeleton animation="wave" height={10} width="70%" />
                      ) : ''}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableCell align="left" sx={{width: '15%', borderBottom: 'none'}}>{loading ? (
                      <Skeleton animation="wave" height={10} width="50%" />
                    ) : ''}</StyledTableCell>
                    <StyledTableCell align="center" sx={{width: '10%', borderBottom: 'none'}}>{loading ? (
                      <Skeleton animation="wave" variant="circular" sx={{margin: 'auto'}} width={35} height={35} />
                    ) : ''}</StyledTableCell>
                    <StyledTableCell align="right" sx={{width: '10%', borderBottom: 'none'}}>{loading ? (
                      <Skeleton animation="wave" variant="circular" sx={{marginLeft: 'auto'}} width={35} height={35} />
                    ) : ''}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </MyDiv>
  )
}
ScheduledSkeletons.propTypes = {
  loading: PropTypes.bool,
}
export default function CustomSchedulingSkeleton() {
  return (
    <div>
      <ScheduledSkeletons loading />
    </div>
  )
}
