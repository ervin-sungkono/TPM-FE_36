document.addEventListener('DOMContentLoaded', () => {
    if(!sessionStorage.getItem('token')) {
       if(window.location.pathname !== '/login.html') window.location.replace('/login.html')
    }
    else if(window.location.pathname === '/login.html') window.location.replace('/index.html')
})