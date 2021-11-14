import React, { Fragment } from 'react';
import { useSelector} from 'react-redux';
import InfoLoader from './InfoLoader';
import Loader from './Loader';

export default function Loading() {
  const {isLoading} = useSelector(state => state.LoadingReducer);

  return (
      <Fragment>
          {isLoading ?
          <div style={{position:'absolute',top:150,left:50,width:'65%',height:'100%',zIndex:49}}>
            <div style={{backgroundColor:'#fff', height:'100px'}}>
              <Loader />
            </div>
            <div className="mt-24 bg-white w-full">
              <InfoLoader />
              <InfoLoader />
              <InfoLoader />
              <InfoLoader />
              <InfoLoader />
            </div>
          </div> : ''
          }
      </Fragment>
  )
}