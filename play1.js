// FaxPlus Dependencies
const axios = require('axios');

// Auth
const client_ID = 'APIK-kyff2Mva7Z';
const client_Secret = 'NravXdFnJK8dNaN';
const refreshToken = "470f6d72e48640189d34115180ccf1c0:0d66a51f119ac46878bdad9df8fbca518";

const basePath = 'https://restapi.fax.plus/v3'



// Refresh the access token using refresh token
async function getNewToken() {
    const params = new URLSearchParams({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
    }).toString();
    const tokenPath = 'https://accounts.fax.plus/token?';
    const myPath = new URL(tokenPath + params).toString()
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(client_ID + ":" + client_Secret).toString('base64')}`
    }

    try {
        const res = await axios.post(myPath, {}, { headers });
        const token = res.data.access_token;
        console.log('access_token: ', token)
        return token;
    } catch (err) {
        console.log(err)
    }
}

// Get list of accounts from FaxPlus
function getAccountList() {
    const getToken = getNewToken()
    getToken.then(async function getAccounts(token) {
        const headers = {
            "x-fax-clientid": client_ID,
            "Authorization": "Bearer " + token
        }
        const path = basePath + '/accounts'

        try {
            console.log(path, token, headers)
            const res = await axios.get(path, { headers });
            const accountMembers = res.data.members
            console.log(accountMembers)
            return accountMembers;
        } catch (err) {
            console.log(err)
            console.log('')
        }
    })
}
getAccountList()