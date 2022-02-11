const express = require('express')
const nunjucks = require('nunjucks')


const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')
nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {

    const about = {
        avatar_url : "https://avatars.githubusercontent.com/u/65598460?v=4",
        name: "Marcio Andre Mendes",
        role: "Contador e Professor",
        description: '<a href="http://escritorioreal.com.br" target="_blank">Contador</a> com mais de 10 anos de experiência e Professor em escola <a href="https://www.cps.sp.gov.br/" target="_blank">Técnica</a>',
        links: [
            { name: 'Github', url: 'https://github.com/MarcioAndre3767/' },
            { name: 'Twitter', url: 'https://twitter.com/marcioandre3767/' },
            { name: 'Linkedin', url: 'https://www.linkedin.com/in/m%C3%A1rcio-andr%C3%A9-mendes-734a2498/' }
        ]
    }

    return res.render('about', { about: about })
})

server.get('/portfolio', function(req, res) {
    return res.render('portfolio', { items: videos })
})


server.get('/video', function(req, res) {
    const id = req.query.id

    const video = videos.find( function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send('Video not found!')
    }

    return res.render('video', { item: video })
})



server.listen(5000, function() {
    console.log('Server is running')
})