var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//swaggerの基本定義
var options = {
  swaggerDefinition: {
    info: {
      title: 'Hello World',
      version: '1.0.0.'
    },
    schemes: ['http']
  },
  apis: ['./index.js'], //自分自身を指定。外部化した場合は、そのファイルを指定。配列で複数指定も可能。
};

var swaggerSpec = swaggerJSDoc(options);

//swagger-ui向けにjsonを返すAPI
app.get('/api-docs.json', function(req, res){
  res.setHeader('Content-Type','application/json');
  res.send(swaggerSpec);
});

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
app.post('/login', function(req, res) {
  res.status(200).json(req.body);
});

app.listen(3000, function(){
  console.log("Listen on port 3000.");
});
