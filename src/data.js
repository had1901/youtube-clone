export const api = 'AIzaSyDAE-yBxb5QckD3z7YzjJLc7o9MCjGs_cg'

export const handleValueConvert = (value) => {
  if(value >= 1000000) {
    return Math.floor(value/1000000) + ' Tr'
  }
  else if(value >= 1000){
    return Math.floor(value/1000) + ' N'
  }
  else {
    return value
  }
}