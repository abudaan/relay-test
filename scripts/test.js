#!/usr/bin/env babel-node --optional es7.asyncFunctions

let a = () => ({
  func: () => console.log('aap'),
  punk: 'haar'
})

function waiting(){
  setTimeout(function(){
    return {
      msg: 'ok'
    }
  }, 1000)
}


(async() => {
  let r = await(waiting())
  if(r.msg === 'ok'){
    console.log(r.msg)
  }else{
    console.error('bummer')
  }
}())