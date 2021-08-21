import array_extract from './helpers/array_extract';
import cli from '@vbarbarosh/node-helpers/src/cli';
import express from 'express';
import express_params from '@vbarbarosh/express-helpers/src/express_params';
import express_routes from '@vbarbarosh/express-helpers/src/express_routes';
import express_run from '@vbarbarosh/express-helpers/src/express_run';
import http_post_json from '@vbarbarosh/node-helpers/src/http_post_json';
import http_post_urlencoded from '@vbarbarosh/node-helpers/src/http_post_urlencoded';
import is_docker from 'is-docker';
import now_ymd_his from './helpers/now_ymd_his';
import session from 'express-session';
import sheet_render from './helpers/sheet_render';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

cli(main);

async function main()
{
    if (!CLIENT_ID) {
        throw new Error('CLIENT_ID was not specified');
    }
    if (!CLIENT_SECRET) {
        throw new Error('CLIENT_SECRET was not specified');
    }
    if (!REDIRECT_URI) {
        throw new Error('REDIRECT_URI was not specified');
    }

    const app = express();

    app.use(session({secret: CLIENT_SECRET, resave: false, saveUninitialized: false}));
    app.use(express.urlencoded({extended: true, limit: '50mb'}));
    app.use(express.json({limit: '50mb'}));

    express_routes(app, [
        {req: 'GET /', fn: home},
        {req: 'POST /', fn: post},
        {req: 'ALL *', fn: http404},
    ]);

    if (is_docker()) {
        await express_run(app, 80, '0.0.0.0');
    }
    else {
        await express_run(app);
    }
}

async function home(req, res)
{
    if (req.query.code) {
        req.session.oauth2_tokens = await sharon_auth_step2(req.query.code);
        const items = req.session.items;
        delete req.session.items;
        const tmp = await sharon_create(req.session.oauth2_tokens, items);
        res.status(303).header('Location', tmp.spreadsheetUrl).send(tmp.spreadsheetUrl + '\n');
        return;
    }
    if (req.query.error) {
        res.send(`Error: ${req.query.error}\n`);
        return;
    }

    // just opening a homepage
    res.json(express_params(req));
}

async function post(req, res)
{
    const items = (req.body && req.body.items && JSON.parse(req.body.items)) || req.body;
    try {
        const tmp = await sharon_create(req.session.oauth2_tokens, items);
        res.status(303).header('Location', tmp.spreadsheetUrl).send(tmp.spreadsheetUrl + '\n');
    }
    catch (error) {
        const redirect_url = sharon_auth_step1();
        req.session.items = items;
        res.status(303).header('Location', redirect_url).send(redirect_url + '\n');
    }
}

function http404(req, res)
{
    res.status(404).send('Not Found\n');
}

/**
 * Request OAuth2 Code
 *
 * @return {string}
 * @link https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient
 */
function sharon_auth_step1()
{
    // https://developers.google.com/sheets/api/guides/authorizing#OAuth2Authorizing
    const scopes = ['https://www.googleapis.com/auth/drive.file'];
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURI(scopes.join(' '))}`;// &prompt=consent`;
}

/**
 * Exchange authorization code for refresh and access tokens
 *
 * @param code
 * @return {Promise<*>}
 * @link https://developers.google.com/identity/protocols/oauth2/web-server#exchange-authorization-code
 */
async function sharon_auth_step2(code)
{
    return await http_post_urlencoded('https://oauth2.googleapis.com/token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI
    });
}

/**
 * Create a spreadsheet
 *
 * @param oauth2_tokens
 * @param items
 * @return {Promise<*>}
 * @link https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create
 */
async function sharon_create(oauth2_tokens, items)
{
    const body = {
        properties: {
            title: `${now_ymd_his()} sharon`,
        },
        sheets: [
            {data: !items ? [] : [sheet_render([Object.keys(items[0]), ...array_extract(items, Object.keys(items[0]))])]},
        ],
    };
    const options = {
        headers: {
            Authorization: `Bearer ${oauth2_tokens.access_token}`,
        },
    };
    return await http_post_json('https://sheets.googleapis.com/v4/spreadsheets', body, options);
}
