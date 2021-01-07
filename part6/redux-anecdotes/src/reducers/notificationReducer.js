export const setNotification = (notification) => {
    return {
      type: 'SHOW',
      data: { notification }
    }
  }
  
  export const clearNotification = (notification) => {
    return {
      type: 'CLEAR'
    }
  }
  
  const reducer = (state = '', action) => {
    switch (action.type) {
      case 'SHOW':
        return action.data.notification
      case 'CLEAR':
        return ''
      default:
        return state
    }
  }
  
  export default reducer 