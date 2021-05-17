import React, { useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { set_show_toast } from '../actions/Toast';

const Toast = () => {
     let toastState = useSelector(state => state.toast);
     const dispatch = useDispatch();
     
     return (
          <Snackbar open={toastState.isShowToast} autoHideDuration={3000} 
               onClose={() => {dispatch(set_show_toast(false))}}
               className="alert-center">
               <Alert onClose={() => {dispatch(set_show_toast(false))}} severity={toastState.typeToast}>
                    {toastState.text}
               </Alert>
          </Snackbar>
     )
}

export default Toast
