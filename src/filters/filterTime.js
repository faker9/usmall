export default (data=>{
    var date = new Date(data)
    var year = date.getFullYear()
    var month =( date.getMonth()+1+'').padStart(2,'0')
    var day = ( date.getDate()+'').padStart(2,'0')
    var hour = ( date.getHours()+'').padStart(2,'0')
    var min = ( date.getMinutes()+'').padStart(2,'0')
    var sec = ( date.getSeconds()+'').padStart(2,'0')
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
})