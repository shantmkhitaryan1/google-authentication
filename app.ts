import express, {Application} from 'express';

const app: Application = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const homePageRouter = require('./routes/index');
app.use('/', homePageRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});