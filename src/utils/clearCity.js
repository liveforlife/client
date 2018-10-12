export function clearCity (list) {
  list.forEach(i => {
    const leav1Childs = i.childs
    if (leav1Childs) {
      leav1Childs.forEach(j => {
        const leav2Childs = j.childs
        if (leav2Childs) {
          leav2Childs.forEach(k => {
            delete k.childs
          })
        }
      })
    } else {
     if(list[i]){
      delete list[i].childs
     }
    }
  })
  return list
}
