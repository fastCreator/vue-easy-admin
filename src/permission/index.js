let hash = location.hash
let search = hash.split('?')[1]
if (search) {
  let tokenObj = search.split('&').find(it => it.split('=')[0] === 'token')
  let token = tokenObj.split('=')[1]
  if (token) {
    localStorage.token = token
    location.hash = location.hash.replace(`token=${token}`, '')
  }
}
